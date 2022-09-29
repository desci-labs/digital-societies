import { useModalContext } from "components/Modal/Modal";
import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function Transactor<C>(props: TxProps<C>) {
  const { hideModal } = useModalContext();

  const formProps: any = { ...props.contentProps };
  return (
    <div
      className={`w-full max-w-500 px-10 relative ${props.inModal
        ? "bg-white app-bg rounded-md overflow-scroll pt-2 m-5 fixed-center z-20 relative max-h-80 scroll-hidden"
        : "relative"
        }`}
    >
      {props.inModal && (
        <div className="flex justify-end absolute right-3 top-3">
          <button
            onClick={hideModal}
            className="bg-transparent hover:bg-regent-gray hover:bg-opacity-50 rounded-full absolute right-2 top-2 flex items-center justify-center w-8 h-8"
          >
            <AiOutlineClose size={15} className="text" />
          </button>
        </div>
      )}
      <props.Content {...formProps} />
    </div>
  );
}

export type TxProps<T> = {
  inModal?: boolean;
  Content: FC<T>;
  contentProps: T;
}