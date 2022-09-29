import { useModalContext } from "components/Modal/Modal"
import { useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai"
import { useDispatch } from "react-redux";
import { useGetTxStage } from "services/transaction/hooks";
import { setStage } from "services/transaction/transactionSlice";
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
        return <Success {...stage} />
      case Step.broadcast:
        return <Processing {...stage} />
      case Step.submit:
        return <Submit {...stage} />
      case Step.error:
        return <ErrorPop {...stage} />
      default:
        throw new Error("Invalid prompt");
    }
  }, [stage]);

  function closePrompt() {
    if (stage.step === Step.success ||
      stage.step === Step.error) {
      dispatch(setStage({ step: Step.form }))
    }
    hideModal();
  }

  return (
    <div
      className="min-w-120 p-5 relative bg-white dark:bg-neutrals-gray-1 text-neutrals-gray-7 rounded-md overflow-scroll fixed-center z-20 min-h-120 max-h-200 scroll-hidden"
    >
      <div className="flex justify-end absolute right-0 top-0">
        <button
          onClick={closePrompt}
          className="bg-transparent hover:bg-regent-gray hover:bg-opacity-50 rounded-full absolute right-2 top-2 flex items-center justify-center w-8 h-8"
        >
          <AiOutlineClose size={15} className="text" />
        </button>
      </div>
      {view}
    </div>
  )
}