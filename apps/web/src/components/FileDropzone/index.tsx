import { Controller, FieldValues, useFormContext } from "react-hook-form";
import Dropzone from "./Dropzone";
import { BaseProps } from "./types";

export default function FileDropzone<T extends FieldValues>(
  props: BaseProps<T>
) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field: { onChange, value } }) => (
        <Dropzone
          {...props}
          value={value}
          onDrop={(acceptedFiles) => {
            onChange({ file: acceptedFiles[0], name: acceptedFiles[0]?.name });
          }}
        />
      )}
    />
  );
}
