import { useModalContext } from "components/Modal/Modal";
import { IconType } from "react-icons";
import { VscLoading } from "react-icons/vsc";
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from "react-icons/ai";
import { Step } from "services/transaction/types";
import { useGetter } from "store/accessors";
import TransactionPrompt from "./TransactionPrompt";

export default function TransactionHint() {
  const step = useGetter((state) => state.transaction.stage.step);

  switch (step) {
    case Step.error:
      return (
        <StatusButton Icon={AiOutlineExclamationCircle} iconClass="text-error" />
      );
    case Step.broadcast:
    case Step.submit:
      return (
        <StatusButton Icon={VscLoading} iconClass="text-primary animate-spin" />
      );
    case Step.success:
      return (
        <StatusButton Icon={AiOutlineCheckCircle} iconClass="text-primary-hover" />
      );
    default:
      return null;
  }
}

function StatusButton(props: { Icon: IconType; iconClass?: string }) {
  const { showModal } = useModalContext();
  function showPrompt() {
    showModal(TransactionPrompt, {});
  }
  return (
    <button
      onClick={showPrompt}
      className="grid place-items-center rounded-md px-4"
    >
      <props.Icon size={30} className={`${props.iconClass || ""} `} />
    </button>
  );
}
