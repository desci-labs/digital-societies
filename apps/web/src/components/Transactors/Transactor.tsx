import Icon from "components/Icons/Icons";
import { useModalContext } from "components/Modal/Modal";
import { useDispatch } from "react-redux";
import { useGetTxStage } from "services/transaction/hooks";
import { setStage } from "services/transaction/reducer";
import { Step } from "services/transaction/types";
import { TxProps } from "./types";

export default function Transactor<C extends JSX.IntrinsicAttributes>(
  props: TxProps<C>
) {
  const { hideModal } = useModalContext();
  const stage = useGetTxStage();
  const dispatch = useDispatch();
  const formProps: C = { ...props.contentProps };

  function closePrompt() {
    if ([Step.success, Step.error].includes(stage.step)) {
      dispatch(setStage({ step: Step.form }));
    }
    hideModal();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`w-full max-w-max  md:min-w-160 px-10 relative ${
        props.inModal
          ? "bg-white app-bg rounded-md overflow-scroll pt-2 m-5 fixed-center z-20 relative max-h-80 scroll-hidden will-change-transform animate-scaleIn"
          : "relative"
      }`}
    >
      {props.inModal && (
        <div className="flex justify-end absolute right-3 top-3">
          <button
            onClick={closePrompt}
            className="bg-transparent hover:bg-regent-gray hover:bg-opacity-50 rounded-full absolute right-2 top-2 flex items-center justify-center w-8 h-8"
          >
            <Icon type="Close" size={15} className="text" />
          </button>
        </div>
      )}
      <props.Content {...formProps} />
    </div>
  );
}
