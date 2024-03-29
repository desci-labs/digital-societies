import Icon from "components/Icons/Icons";
import { useModalContext } from "components/Modal/Modal";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useGetTxStage } from "services/transaction/hooks";
import { resetTxFormState } from "services/transaction/reducer";
import { Step } from "services/transaction/types";
import ErrorPop from "./Error";
import Processing from "./Processing";
import Submit from "./Submit";
import Success from "./Success";

export default function TransactionPrompt() {
  const { hideModal } = useModalContext();
  const dispatch = useDispatch();
  const stage = useGetTxStage();

  const view = useMemo(() => {
    switch (stage.step) {
      case Step.success:
        return <Success {...stage} />;
      case Step.broadcast:
        return <Processing {...stage} />;
      case Step.submit:
        return <Submit {...stage} />;
      case Step.error:
        return <ErrorPop {...stage} />;
      default:
        throw new Error("Invalid prompt");
    }
  }, [stage]);

  function closePrompt() {
    if ([Step.success, Step.error].includes(stage.step)) {
      dispatch(resetTxFormState());
    }
    hideModal();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="min-w-120 p-5 relative bg-white app-bg text-neutrals-gray-7 rounded-md overflow-scroll fixed-center z-20 min-h-120 max-h-200 scroll-hidden will-change-transform animate-scaleIn"
    >
      <div className="flex justify-end absolute right-0 top-0">
        <button
          onClick={closePrompt}
          className="bg-transparent hover:bg-regent-gray hover:bg-opacity-50 rounded-full absolute right-2 top-2 flex items-center justify-center w-8 h-8"
        >
          <Icon type="Close" size={15} className="app-text" />
        </button>
      </div>
      {view}
    </div>
  );
}
