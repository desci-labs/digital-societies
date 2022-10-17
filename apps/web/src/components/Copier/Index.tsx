import { useState } from "react";
import { HiOutlineClipboard, HiOutlineCheck } from "react-icons/hi";

function useCopier() {
  const [copied, setCopied] = useState(false);

  function handleCopy(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(
        () => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false)
          }, 1500)
        }
      );
  }

  return { handleCopy, copied }
}

export default function Copier(props: { text: string; }) {
  const { handleCopy, copied } = useCopier();
  return <>{copied ? <HiOutlineCheck /> : <HiOutlineClipboard className="cursor-pointer" onClick={() => handleCopy(props.text)} />}</>
}