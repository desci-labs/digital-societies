import formats, { Format, MultiFormats } from "./ToolbarOptions";

const RenderOptions = (props: { formatData: MultiFormats }) => {
  const { className, options } = props.formatData;
  return (
    <select className={className}>
      {/* <option selected></option> */}
      {options.map((value, i) => {
        return <option value={value} key={i}></option>;
      })}
    </select>
  );
};
const RenderSingle = (props: { formatData: Format }) => {
  const { className, value } = props.formatData;
  return <button className={className} value={value}></button>;
};

const Toolbar = () => (
  <div id="toolbar">
    {formats.map((classes, idx) => {
      return (
        <span className="ql-formats" key={idx}>
          {classes.map((formatData, key) => {
            return formatData?.options ? (
              <RenderOptions
                key={key}
                formatData={formatData as MultiFormats}
              />
            ) : (
              <RenderSingle key={key} formatData={formatData} />
            );
          })}
        </span>
      );
    })}
  </div>
);
export default Toolbar;
