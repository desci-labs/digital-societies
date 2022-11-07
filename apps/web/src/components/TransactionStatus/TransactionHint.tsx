import { useModalContext } from "components/Modal/Modal";
import { Step } from "services/transaction/types";
import { useGetter } from "store/accessors";
import TransactionPrompt from "./TransactionPrompt";
import Icon, { IconTypes } from "components/Icons/Icons";

export default function TransactionHint() {
  const step = useGetter((state) => state.transaction.stage.step);

  switch (step) {
    case Step.error:
      return (
        <StatusButton Icon="ExclamationCircle" iconClass="text-states-error" />
      );
    case Step.broadcast:
    case Step.submit:
      return (
        <StatusButton Icon="VscLoading" iconClass="text-primary animate-spin" />
      );
    case Step.success:
      return <StatusButton Icon="CheckCircle" iconClass="text-primary-hover" />;
    default:
      return null;
  }
}

function StatusButton(props: { Icon: IconTypes; iconClass?: string }) {
  const { showModal } = useModalContext();
  function showPrompt() {
    showModal(TransactionPrompt, {});
  }
  return (
    <button
      onClick={showPrompt}
      className="grid place-items-center rounded-md p-0 focus:outline-none"
    >
      <Icon
        type={props.Icon}
        size={30}
        className={`${props.iconClass || ""} `}
      />
    </button>
  );
}
