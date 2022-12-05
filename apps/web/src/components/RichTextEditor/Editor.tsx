/* eslint-disable @typescript-eslint/no-explicit-any */
import Toolbar from "./Toolbar";
import { EditorProps } from "./types";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function Editor(props: EditorProps) {
  const handleChange = (
    value: string,
    _delta: any,
    _source: any,
    editor: any
  ) => {
    const text = editor.getText();
    props?.onRawTextChanged?.(text);
    props.onChange(value);
  };
  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };
  const formats = [
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
  ];

  if (!document) return null;

  return (
    <>
      <Toolbar />
      <ReactQuill
        className="w-full"
        theme="snow"
        value={props.value}
        placeholder="Write a detailed description about your society"
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </>
  );
}
