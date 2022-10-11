import { PropsWithChildren } from "react";
import { useModalContext } from "components/Modal/Modal";
import { IoMdClose } from "react-icons/io";

export type PopupProps = PropsWithChildren<{ message: string; inModal?: boolean }>;
export default function Popup(props: PopupProps) {
  const { hideModal } = useModalContext();
  return (
    <div className="bg-white app-bg relative z-10 p-4 place-items-center w-full max-w-xs min-h-115 rounded-xl overflow-hidden">
      {props.inModal && <button
        onClick={hideModal}
        className="bg-transparent hover:bg-regent-gray hover:bg-opacity-50 rounded-full absolute right-2 top-2 flex items-center justify-center w-8 h-8"
      >
        <IoMdClose />
      </button>}
      <p className="text-angel-grey text-center mt-5">{props.message}</p>
      {props.children}
    </div>
  );
}