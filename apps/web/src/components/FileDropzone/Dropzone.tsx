import { FieldValues } from "react-hook-form";
import { BaseProps, FileObject } from "./types";
import { FileRejection, DropEvent, useDropzone } from "react-dropzone";

type Props<T extends FieldValues> = BaseProps<T> & {
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
  } as any);

  const className = `py-1.5 px-4 w-full flex flex-col items-center rounded-xl border-2  ${
    isDragActive ? "border-cornflower-blue" : ""
    } ${props.value ? "border-cornflower-blue" : "border-regent-gray"}
      ${props.hasError ? "border-red-400" : "border-turquoise"}
    `;

  return (
    <div {...getRootProps({ className })}>
      <input id={props.name} {...getInputProps()} />
      <DropzoneInner value={props.value} />
    </div>
  );
}

function DropzoneInner({
  value,
}: {
  value: FileObject;
  className?: string;
}) {
  return (
    <label
      className="block flex flex-col gap-2 items-start"
      htmlFor="image"
    >
      {!value?.file ? (
        <div>
          <span className="block text-center my-2">Drag and drop file</span>
          <span className="block text-center my-2">OR</span>
          <span className="block text-center my-2 border-2 cursor-pointer w-72 rounded-lg hover:border-cornflower-blue">
            Choose file
          </span>
        </div>
      ) : (
        <span className="block text-center my-3">{value.name}</span>
      )}
    </label>
  );
}
