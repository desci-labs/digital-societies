import { FieldValues } from "react-hook-form";
import { BaseProps, FileObject } from "./types";
import {
  FileRejection,
  DropEvent,
  useDropzone,
  DropzoneOptions,
} from "react-dropzone";
import { ImageIcon } from "assets/svg";

type Props<T extends FieldValues> = BaseProps<T> & {
  maxSize?: number;
  maxFiles?: number;
  onDrop: <K extends File>(
    acceptedFiles: K[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  value: FileObject;
};

export default function Dropzone<T extends FieldValues>(props: Props<T>) {
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: props.onDrop,
    disabled: props.disabled,
    maxFiles: props.maxFiles ?? 1,
    maxSize: props.maxSize,
  } as DropzoneOptions);

  const className = `
    py-1.5 px-4 w-full flex flex-col items-center rounded-xl border
    ${isDragActive ? "border-neutrals-gray-5" : ""} 
    ${props.value ? "border-neutrals-gray-5" : "border-regent-gray"}
    ${props.hasError ? "border-red-400" : ""}
    `;

  return (
    <div {...getRootProps({ className })}>
      <input id={props.name} {...getInputProps()} />
      <DropzoneInner value={props.value} />
    </div>
  );
}

function DropzoneInner({ value }: { value: FileObject; className?: string }) {
  return (
    <label className="block flex flex-col gap-2 items-start" htmlFor="image">
      <div className="text-neutrals-gray-5">
        {value?.file && (
          <span className="block text-center my-1 font-bold capitalize text-neutrals-gray-7">
            {value.name}
          </span>
        )}
        <div className="w-full flex justify-center">
          <ImageIcon />
        </div>
        <span className="block text-center my-2">
          Choose an image or drag it here.
        </span>
      </div>
    </label>
  );
}
