/* eslint-disable @typescript-eslint/no-explicit-any */
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  // Layout
  Alignment,
  BlockQuote,
  // Inline
  Bold,
  // Básico
  ClassicEditor,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  // Fontes
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  Indent,
  IndentBlock,
  Italic,
  // Links / mídia / código
  Link,
  // Listas (API antiga)
  List,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  // Extras
  SpecialCharacters,
  SpecialCharactersEssentials,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import clsx from "clsx";
import React, { useMemo } from "react";

export interface RichTextEditorProps {
  /** HTML inicial do editor. */
  initialData?: string;
  /** Placeholder exibido quando vazio. */
  placeholder?: string;
  /** Callback com o HTML sempre que houver mudança. */
  onChange?: (html: string) => void;
  /** Callback disparado quando o editor perde foco. */
  onBlur?: () => void;

  /** Classe do container externo. */
  className?: string;

  /** Habilitar/desabilitar ferramentas (todas default: true) */
  // Básico
  undoRedo?: boolean;
  findAndReplace?: boolean;
  selectAll?: boolean;
  removeFormat?: boolean;
  heading?: boolean;

  // Inline
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  highlight?: boolean;

  // Fontes
  fontFamily?: boolean;
  fontSize?: boolean;
  fontColor?: boolean;
  fontBackgroundColor?: boolean;

  // Layout
  alignment?: boolean;
  indent?: boolean;
  blockQuote?: boolean;
  horizontalLine?: boolean;

  // Listas
  bulletedList?: boolean;
  numberedList?: boolean;

  // Links / média
  link?: boolean;
  mediaEmbed?: boolean;

  // Código
  codeBlock?: boolean;

  // Caracteres especiais
  specialCharacters?: boolean;
}

type HeadingOption =
  | {
      model: "paragraph";
      title: string;
      class: string;
    }
  | {
      model: "heading1";
      view: "h1";
      title: string;
      class: string;
    }
  | {
      model: "heading2";
      view: "h2";
      title: string;
      class: string;
    }
  | {
      model: "heading3";
      view: "h3";
      title: string;
      class: string;
    };

const headingOptions: HeadingOption[] = [
  {
    model: "paragraph",
    title: "Paragrafo",
    class: "ck-heading_paragraph",
  },
  {
    model: "heading1",
    view: "h1",
    title: "H1",
    class: "ck-heading_heading1",
  },
  {
    model: "heading2",
    view: "h2",
    title: "H2",
    class: "ck-heading_heading2",
  },
  {
    model: "heading3",
    view: "h3",
    title: "H3",
    class: "ck-heading_heading3",
  },
];

const BLOCK_TAG_NAMES = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
]);

const hasMeaningfulContent = (node: ChildNode) => {
  if (node.nodeType === Node.TEXT_NODE) {
    return Boolean(node.textContent?.trim());
  }

  return node.nodeType === Node.ELEMENT_NODE;
};

const cloneBlockWithContent = (
  sourceElement: Element,
  targetDocument: Document,
  nodes: ChildNode[],
) => {
  const nextElement = targetDocument.createElement(sourceElement.tagName.toLowerCase());

  Array.from(sourceElement.attributes).forEach((attribute) => {
    nextElement.setAttribute(attribute.name, attribute.value);
  });

  nodes.forEach((node) => {
    nextElement.appendChild(node.cloneNode(true));
  });

  return nextElement;
};

const normalizeBlockBreaksHtml = (html: string) => {
  if (!html || typeof window === "undefined") {
    return html;
  }

  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const container = parsedDocument.body.firstElementChild;

  if (!container) {
    return html;
  }

  const blockElements = Array.from(
    container.querySelectorAll(Array.from(BLOCK_TAG_NAMES).join(",")),
  );

  blockElements.forEach((blockElement) => {
    const segments: ChildNode[][] = [[]];

    Array.from(blockElement.childNodes).forEach((node) => {
      if (node.nodeName === "BR") {
        segments.push([]);
        return;
      }

      segments[segments.length - 1].push(node);
    });

    const normalizedSegments = segments.filter((segment) =>
      segment.some((node) => hasMeaningfulContent(node)),
    );

    if (normalizedSegments.length <= 1) {
      return;
    }

    const replacementElements = normalizedSegments.map((segment) =>
      cloneBlockWithContent(blockElement, parsedDocument, segment),
    );

    blockElement.replaceWith(...replacementElements);
  });

  return container.innerHTML;
};

const isInsideCodeBlock = (editor: any) => {
  let parent = editor.model.document.selection.getFirstPosition()?.parent;

  while (parent) {
    if (parent.is?.("element", "codeBlock")) {
      return true;
    }

    if (parent.is?.("rootElement")) {
      return false;
    }

    parent = parent.parent;
  }

  return false;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  // Conteúdo
  initialData = "<p>Olá do CKEditor 5 no React! ✍️</p>",
  placeholder = "Escreva seu conteúdo…",
  onChange,
  onBlur,

  // Classe
  className,

  // Toggles (default: true)
  undoRedo = true,
  findAndReplace = true,
  selectAll = true,
  removeFormat = true,
  heading = true,

  bold = true,
  italic = true,
  underline = true,
  strikethrough = true,
  code = true,
  subscript = true,
  superscript = true,
  highlight = true,

  fontFamily = true,
  fontSize = true,
  fontColor = true,
  fontBackgroundColor = true,

  alignment = true,
  indent = true,
  blockQuote = true,
  horizontalLine = true,

  bulletedList = true,
  numberedList = true,

  link = true,
  mediaEmbed = true,

  codeBlock = true,
  specialCharacters = true,
} : RichTextEditorProps) => {
  const normalizedInitialData = useMemo(
    () => normalizeBlockBreaksHtml(initialData),
    [initialData],
  );

  /** Plugins*/
  const plugins: any[] = [
    // Essentials
    Essentials,
    Paragraph,
    PasteFromOffice,
    heading && Heading,
    undoRedo && Undo,
    findAndReplace && FindAndReplace,
    selectAll && SelectAll,
    removeFormat && RemoveFormat,

    // Inline
    bold && Bold,
    italic && Italic,
    underline && Underline,
    strikethrough && Strikethrough,
    code && Code,
    subscript && Subscript,
    superscript && Superscript,
    highlight && Highlight,

    // Fontes
    fontFamily && FontFamily,
    fontSize && FontSize,
    fontColor && FontColor,
    fontBackgroundColor && FontBackgroundColor,

    // Layout
    alignment && Alignment,
    indent && Indent,
    indent && IndentBlock,
    blockQuote && BlockQuote,
    horizontalLine && HorizontalLine,

    // Listas (sem ListProperties → sem dropdown de estilos)
    (bulletedList || numberedList) && List,

    // Links / mídia / código
    link && Link,
    mediaEmbed && MediaEmbed,
    codeBlock && CodeBlock,

    // Extras
    specialCharacters && SpecialCharacters,
    specialCharacters && SpecialCharactersEssentials,
  ].filter(Boolean);

  /** Toolbar — apenas os botões ativados. */
  const toolbar: string[] = [];
  if (undoRedo) toolbar.push("undo", "redo");
  toolbar.push("|");
  if (findAndReplace) toolbar.push("findAndReplace");
  if (selectAll) toolbar.push("selectAll");
  if (removeFormat) toolbar.push("removeFormat");

  toolbar.push("|");
  if (heading) toolbar.push("heading");

  toolbar.push("|");
  if (bold) toolbar.push("bold");
  if (italic) toolbar.push("italic");
  if (underline) toolbar.push("underline");
  if (strikethrough) toolbar.push("strikethrough");
  if (code) toolbar.push("code");
  if (subscript) toolbar.push("subscript");
  if (superscript) toolbar.push("superscript");
  if (highlight) toolbar.push("highlight");

  toolbar.push("|");
  if (fontSize) toolbar.push("fontSize");
  if (fontFamily) toolbar.push("fontFamily");
  if (fontColor) toolbar.push("fontColor");
  if (fontBackgroundColor) toolbar.push("fontBackgroundColor");
  if (alignment) toolbar.push("alignment");

  toolbar.push("|");
  if (link) toolbar.push("link");
  if (blockQuote) toolbar.push("blockQuote");
  if (codeBlock) toolbar.push("codeBlock");
  if (horizontalLine) toolbar.push("horizontalLine");

  toolbar.push("|");
  // Botões simples (sem dropdown de variações)
  if (bulletedList) toolbar.push("bulletedList");
  if (numberedList) toolbar.push("numberedList");
  if (indent) toolbar.push("outdent", "indent");

  toolbar.push("|");
  if (mediaEmbed) toolbar.push("mediaEmbed");
  if (specialCharacters) toolbar.push("specialCharacters");

  return (
    <div
      className={clsx(
        "w-sm sm:w-xl md:w-[800px]",
        "rounded-md border border-border-card bg-bg-card p-3 sm:p-4 shadow-sm",
        "text-foreground",
        className
      )}
    >
      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey: "GPL",
          plugins,
          toolbar,
          heading: heading ? { options: headingOptions } : undefined,
          placeholder,
          initialData: normalizedInitialData,
        }}
        onReady={(editor) => {
          editor.keystrokes.set(
            "Shift+Enter",
            (_data: unknown, cancel: () => void) => {
              if (isInsideCodeBlock(editor)) {
                editor.execute("shiftEnter");
              } else {
                editor.execute("enter");
              }

              editor.editing.view.scrollToTheSelection();
              cancel();
            },
            { priority: "high" },
          );
        }}
        onChange={(_, editor) => {
          onChange?.(editor.getData());
        }}
        onBlur={() => {
          onBlur?.();
        }}
      />
    </div>
  );
};

export default RichTextEditor;
