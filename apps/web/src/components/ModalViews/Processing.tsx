import { useSetModal } from "components/Modal/Modal";
import { useGetTx } from "context/useTx";
import { getTransactionUrl } from "helper/web3";
import { IoMdClose } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";
import { useNetwork } from "wagmi";
import TransactionLink from "./TransactionLink";

export default function Processing({ message }: { message: string }) {
  const { hideModal } = useSetModal();
  const { chain } = useNetwork();
  const { txInfo, message: text } = useGetTx();

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
          <div className="flex flex-row justify-center items-center mb-5">
            <RotatingLines strokeColor="#7B61FF" width="100" strokeWidth="2" />
          </div>
          <p className="font-semibold text-regent-gray capitalize text-lg">
            {message || text || "Processing your transaction..."}
          </p>
          {txInfo && txInfo.hash && chain?.id && (
            <TransactionLink
              name={chain.name}
              url={getTransactionUrl(txInfo.hash, chain)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
