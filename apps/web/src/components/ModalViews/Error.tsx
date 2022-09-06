import { useSetModal } from "components/Modal/Modal";
import { IoMdClose } from "react-icons/io";

export default function Error({ message }: { message: string }) {
  const { hideModal } = useSetModal();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full">
      <div className="bg-white p-4">
        <div className="cancel flex justify-end">
          <button
            onClick={hideModal}
            className="bg-wild-sand w-[30px] h-[30px] hover:bg-regent-gray hover:bg-opacity-50 rounded-full flex items-center justify-center w-full"
          >
            <IoMdClose />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl mb-5">❌</p>
          <p className="font-semibold text-regent-gray capitalize text-lg">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
