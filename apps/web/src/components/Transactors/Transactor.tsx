import { useModalContext } from "components/Modal/Modal";
import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function Transactor<C>(props: TxProps<C>) {
  const { hideModal } = useModalContext();

  const formProps: any = { ...props.contentProps };
  return (
    <div
      className={`min-w-45 max-w-104 p-10 relative ${props.inModal
        ? "bg-neutrals-gray-1 rounded-md overflow-scroll pt-4 fixed-center z-20 relative min-h-120 max-h-200 scroll-hidden"
        : "relative"
        }`}
    >
      {props.inModal && (
        <div className="flex justify-end absolute right-3 top-3">
          <button
            onClick={hideModal}
            className="bg-transparent hover:bg-regent-gray hover:bg-opacity-50 rounded-full absolute right-2 top-2 flex items-center justify-center w-8 h-8"
          >
            <AiOutlineClose size={15} className="text-white" />
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