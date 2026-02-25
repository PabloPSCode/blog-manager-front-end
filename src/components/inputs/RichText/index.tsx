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
import React from "react";

export interface RichTextEditorProps {
  /** HTML inicial do editor. */
  initialData?: string;
  /** Placeholder exibido quando vazio. */
  placeholder?: string;
  /** Callback com o HTML sempre que houver mudança. */
  onChange?: (html: string) => void;

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

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  // Conteúdo
  initialData = "<p>Olá do CKEditor 5 no React! ✍️</p>",
  placeholder = "Escreva seu conteúdo…",
  onChange,

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
      <style>{`
        .ck-content ul { list-style: disc !important; padding-left: 1.5rem; }
        .ck-content ol { list-style: decimal !important; padding-left: 1.5rem; }
        .ck-content li { margin: 0.25rem 0; }
        .ck.ck-editor__editable_inline { min-height: 240px; }
      `}</style>

      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey: "GPL",
          plugins,
          toolbar,
          placeholder,
          initialData,
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange?.(data);
        }}
      />
    </div>
  );
};

export default RichTextEditor;
