import { useState } from "react";
import { HiOutlineClipboard, HiOutlineCheck } from "react-icons/hi";

function useCopier() {
  const [copied, setCopied] = useState(false);

  function copy(text: string) {
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

  return { copy, copied }
}

export default function Copier(props: { text: string; }) {
  const {copy, copied} = useCopier();
  return <>{copied ? <HiOutlineCheck /> : <HiOutlineClipboard className="cursor-pointer" onClick={() => copy(props.text)} />}</>
}