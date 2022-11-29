import { Controller, FieldValues, useFormContext } from "react-hook-form";
import Editor from "./Editor";
import { BaseProps } from "./types";

export default function RichTextEditor<T extends FieldValues>(
  props: BaseProps<T>
) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field: { onChange, value } }) => {
        return <Editor {...props} value={value} onChange={onChange} />;
      }}
    />
  );
}
