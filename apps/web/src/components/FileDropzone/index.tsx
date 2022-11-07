import { TWENTY_FIVE_MB } from "components/Transactors/schema";
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
      render={({ field: { onChange, value } }) => {
        return (
          <Dropzone
            {...props}
            value={value}
            maxFiles={1}
            maxSize={TWENTY_FIVE_MB}
            onDrop={(acceptedFiles) => {
              onChange({
                file: acceptedFiles[0],
                name: acceptedFiles[0]?.name,
              });
            }}
          />
        );
      }}
    />
  );
}
