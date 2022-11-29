export type Format = {
  className: string;
  value?: string;
  options?: string[];
};

export type MultiFormats = Format & { options: string[] };

export type Formats = (Format | MultiFormats)[][];

// const colors = ["red", "green", "blue", "orange", "violet"];
const formats: Formats = [
  [
    {
      className: "ql-size",
      options: ["small", "large", "huge"],
    },
  ],
  [
    { className: "ql-bold" },
    { className: "ql-italic" },
    { className: "ql-underline" },
    { className: "ql-strike" },
  ],
  [
    {
      className: "ql-header",
      value: "1",
    },
    {
      className: "ql-header",
      value: "2",
    },
    {
      className: "ql-blockquote",
    },
    {
      className: "ql-code-block",
    },
  ],
  [
    {
      className: "ql-list",
      value: "ordered",
    },
    {
      className: "ql-list",
      value: "bullet",
    },
    {
      className: "ql-indent",
      value: "-1",
    },
    {
      className: "ql-indent",
      value: "+1",
    },
  ],
  [
    {
      className: "ql-direction",
      value: "rtl",
    },
    {
      className: "ql-align",
      options: ["center", "justify"],
    },
  ],
  [{ className: "ql-link" }],
];

export default formats;
