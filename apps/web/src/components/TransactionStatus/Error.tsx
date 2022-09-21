import { useModalContext } from "components/Modal/Modal";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";

export default function ErrorPop({ message }: { message: string }) {
  const { hideModal } = useModalContext();
  const dispatch = useDispatch();

  const close = () => {
    dispatch(setStage({ step: Step.form }));
    hideModal();
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl mb-5"><AiOutlineInfoCircle size={35} className="text-crimson" /></p>
        <p className="font-semibold text-md">
          {message}
        </p>
      </div>
      <button
        className="tracking-wide text-lg text-white rounded-lg w-full mt-5 py-1.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 outline-none"
        onClick={close}
      >
        ok
      </button>
    </div>
  );
}
