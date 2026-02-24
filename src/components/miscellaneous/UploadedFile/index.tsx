import Feather from "feather-icons-react";

export interface IFile {
  name: string;
  uri: string;
  size: number;
  type: string;
}

interface UploadedFileProps {
  file: IFile;
  onCancel: () => void;
}

export function UploadedFile({ file, onCancel }: UploadedFileProps) {
  const { name, uri, size, type } = file;
  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex flex-row">
        <span className="text-green-500 text-[12px]">Arquivo anexado</span>
        <button
          className="border-none outline-none flex items-center justify-center"
          onClick={onCancel}
        >
          <Feather
            icon="trash"
            className="w-3 h-3 md:w-4 md:h-4 ml-3 text-red-400"
          />
        </button>
      </div>
      <div className="flex flex-row mb-3">
        <span className="text-[12px] text-gray-700 dark:text-gray-300">
          {name}
        </span>
        <span className="text-[12px] text-gray-700 dark:text-gray-300 ml-3">
          {size}MB
        </span>
      </div>
      {type && type.includes("image") ? (
        <img src={uri} alt={name} width={160} />
      ) : (
        <video
          src={uri}
          width="100%"
          style={{ aspectRatio: 16 / 9 }}
          controls
        />
      )}
    </div>
  );
}
