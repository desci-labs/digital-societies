import Icon from "components/Icons/Icons";
import { useModalContext } from "components/Modal/Modal";
import Button from "components/UI/Button/Index";

export default function Success({ message: text }: { message?: string }) {
  const { hideModal } = useModalContext();

  return (
    <div className="bg-white dark:bg-transparent rounded-xl overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full">
      <div className="p-4">
        <div className="flex justify-end">
          <button
            onClick={hideModal}
            className="w-8 h-8 hover:bg-regent-gray hover:bg-opacity-50 rounded-full flex items-center justify-center w-full"
          >
            <Icon type="Close" />
          </button>
        </div>
        <div className="w-full">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="heading-3 capitalize">{text}</p>
            <Button
              className="tracking-wide text-lg text-white rounded-lg w-full mt-5 bg-tint-primary-dark"
              onClick={hideModal}
            >
              close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
