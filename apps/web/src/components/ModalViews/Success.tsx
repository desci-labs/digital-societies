import { useSetModal } from "components/Modal/Modal";
import { useGetTx } from "context/useTx";
import { getTransactionUrl } from "helper/web3";
import { IoMdClose } from "react-icons/io";
import { useNetwork } from "wagmi";
import TransactionLink from "./TransactionLink";

export default function Success({ message: text } : {message?: string }) {
  const { chain } = useNetwork();
  const { hideModal } = useSetModal();
  const { txInfo, message } = useGetTx();
  const feedback = text || message;

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
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-3xl mb-5">🎉</p>
          <p className="font-semibold capitalize text-lg">
            Transaction Successfull
          </p>
          {feedback && (
            <p className="font-semibold text-regent-gray capitalize text-lg">
              {feedback}
            </p>
          )}
          {txInfo && txInfo.hash && chain?.id && (
            <TransactionLink
              name={chain.name}
              url={getTransactionUrl(txInfo.hash, chain)}
            />
          )}
          <button
            className="tracking-wide text-lg text-white rounded-lg w-32 py-1.5 px-4 enabled:bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 outline-none hover:bg-400p hover:animate-gradient"
            onClick={hideModal}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
