import { useModalContext } from "components/Modal/Modal";
import Button from "components/UI/Button/Index";
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
      <Button
        className="tracking-wide text-lg text-white rounded-lg w-full mt-5 bg-primary"
        onClick={close}
      >
        okay
      </Button>
    </div>
  );
}
