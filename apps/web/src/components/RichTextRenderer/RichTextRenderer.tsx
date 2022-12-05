import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
export default function RichTextRenderer(props: { text: string }) {
  return (
    <ReactQuill
      value={props.text}
      className="border-0 renderer"
      readOnly
      onChange={() => {}}
      modules={{ toolbar: false }}
    />
  );
}
