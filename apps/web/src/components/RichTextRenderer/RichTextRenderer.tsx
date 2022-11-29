import ReactQuill from "react-quill";

export default function RichTextRenderer(props: { text: string }) {
  return (
    <ReactQuill
      value={props.text}
      className="border-0"
      readOnly
      onChange={() => {}}
      modules={{ toolbar: false }}
    />
  );
}
