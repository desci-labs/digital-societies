import { useModalContext } from "components/Modal/Modal";
import { useGetTx } from "context/useTx";
import { getTransactionUrl } from "helper/web3";
import { useRouter } from "next/router";
import { IoMdClose } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";
import { useNetwork } from "wagmi";
import TransactionLink from "./TransactionLink";

export default function Processing({ message, previewLink }: { message: string, previewLink?: string; }) {
  const { hideModal } = useModalContext();
  const { chain } = useNetwork();
  const { txInfo, message: text } = useGetTx();
  const router = useRouter();

  const preview = (path: string) => {
    hideModal();
    router.push(path)
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full">
      <div className="bg-white p-4">
        <div className="cancel flex justify-end">
          <button
            onClick={hideModal}
            className="bg-wild-sand w-8 h-8 hover:bg-regent-gray hover:bg-opacity-50 rounded-full flex items-center justify-center w-full"
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
          {previewLink ? (
            <button
              className="tracking-wide text-lg text-white rounded-lg w-full mt-5 py-1.5 px-4 enabled:bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 outline-none hover:bg-400p hover:animate-gradient"
              onClick={() => preview(previewLink)}
            >
              Preview
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
