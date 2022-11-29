import ReactQuill, { UnprivilegedEditor } from "react-quill";
import Toolbar from "./Toolbar";
import { EditorProps } from "./types";
import "react-quill/dist/quill.snow.css";

export default function Editor(props: EditorProps) {
  const handleChange = (
    value: string,
    _delta: any,
    _source: any,
    _editor: UnprivilegedEditor
  ) => {
    console.log("value: ", value);
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

  return (
    <>
      <Toolbar />
      <ReactQuill
        className="w-full"
        theme="snow"
        value={props.value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </>
  );
}
