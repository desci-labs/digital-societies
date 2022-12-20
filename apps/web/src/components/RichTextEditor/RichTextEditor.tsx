import { MetadataValues } from "components/Transactors/types";
import { forwardRef } from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import Editor from "./Editor";
import { BaseProps } from "./types";

function RichTextEditor<T extends FieldValues>(props: BaseProps<T>) {
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
              setValue("description", text.replaceAll("\n", ""));
            }}
          />
        );
      }}
    />
  );
}

export default forwardRef<JSX.Element, BaseProps<FieldValues>>(RichTextEditor);
