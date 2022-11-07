import Icon from "components/Icons/Icons";
import { useState } from "react";

function useCopier() {
  const [copied, setCopied] = useState(false);

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    });
  }

  return { handleCopy, copied };
}

export default function Copier(props: { text: string; classes?: string }) {
  const { handleCopy, copied } = useCopier();
  return (
    <>
      {copied ? (
        <Icon type="Check" className={props.classes ?? ""} />
      ) : (
        <Icon
          type="Clipboard"
          className={`cursor-pointer ${props.classes ?? ""}`}
          onClick={() => handleCopy(props.text)}
        />
      )}
    </>
  );
}
