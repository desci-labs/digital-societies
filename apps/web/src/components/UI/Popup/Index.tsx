import { PropsWithChildren } from "react";
import { useModalContext } from "components/Modal/Modal";
import { IoMdClose } from "react-icons/io";

export type PopupProps = PropsWithChildren<{ message: string; inModal?: boolean }>;
export default function Popup(props: PopupProps) {
  const { hideModal } = useModalContext();
  return (
    <div className="fixed-center z-10 p-4  place-items-center  w-full max-w-xs min-h-115  rounded-xl overflow-hidden">
      {props.inModal && <button
        onClick={hideModal}
        className="bg-wild-sand w-8 h-8 hover:bg-regent-gray hover:bg-opacity-50 rounded-full flex items-center justify-center w-full"
      >
        <IoMdClose />
      </button>}
      <p className="text-angel-grey text-center my-18">{props.message}</p>
      {props.children}
    </div>
  );
}