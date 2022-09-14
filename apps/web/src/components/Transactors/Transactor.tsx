import { useModalContext } from "components/Modal/Modal";
import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function Transactor<C>(props: TxProps<C>) {
  const { hideModal } = useModalContext();

  function close() {
    hideModal();
  }
  const formProps: any = { ...props.contentProps };
  return (
    <div
      className={`w-160 max-w-104 h-full max-h-180 ${props.inModal
          ? "bg-white rounded-md overflow-scroll pt-4 fixed-center z-20 relative"
          : "relative"
        }`}
    >
      {props.inModal && (
        <button
          onClick={close}
          className="absolute right-2 top-2 text-angel-grey hover:text-black"
        >
          <AiOutlineClose size={25} />
        </button>
      )}
      <props.Content {...formProps}  />
    </div>
  );
}

export type TxProps<T> = {
  inModal?: boolean;
  Content: FC<T>;
  contentProps: T;
}