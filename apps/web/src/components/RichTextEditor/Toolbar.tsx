import formats, { Format, MultiFormats } from "./ToolbarOptions";

const renderOptions = (formatData: MultiFormats) => {
  const { className, options } = formatData;
  return (
    <select className={className}>
      <option selected></option>
      {options.map((value, i) => {
        return <option value={value} key={i}></option>;
      })}
    </select>
  );
};
const renderSingle = (formatData: Format) => {
  const { className, value } = formatData;
  return <button className={className} value={value}></button>;
};

const Toolbar = () => (
  <div id="toolbar">
    {formats.map((classes, idx) => {
      return (
        <span className="ql-formats" key={idx}>
          {classes.map((formatData) => {
            return formatData?.options
              ? renderOptions(formatData as MultiFormats)
              : renderSingle(formatData);
          })}
        </span>
      );
    })}
  </div>
);
export default Toolbar;
