import { MetadataValues } from "components/Transactors/types";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import Editor from "./Editor";
import { BaseProps } from "./types";

export default function RichTextEditor<T extends FieldValues>(
  props: BaseProps<T>
) {
  const { control } = useFormContext<T>();
  const { setValue } = useFormContext<MetadataValues>();
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field: { onChange, value } }) => {
        return (
          <Editor
            {...props}
            value={value}
            onChange={onChange}
            onRawTextChanged={(text) => {
              // remove line break from empty text string
              const val = text === "\n" ? "" : text;
              setValue("description", val);
            }}
          />
        );
      }}
    />
  );
}
