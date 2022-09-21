import { useModalContext } from "components/Modal/Modal";
import { getTransactionUrl } from "helper/web3";
import { useRouter } from "next/router";
import { IoMdClose } from "react-icons/io";
import { SuccessStage } from "services/transaction/types";
import { useNetwork } from "wagmi";
import TransactionLink from "./TransactionLink";

export default function Success({
  message,
  txHash,
  previewLink,
}: SuccessStage) {
  const { chain } = useNetwork();
  const { hideModal } = useModalContext();
  const feedback = message;
  const router = useRouter();

  const preview = (path: string) => {
    hideModal();
    router.push(path)
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-3xl mb-3">🎉</p>
        <p className="font-semibold capitalize text-lg">
          Transaction Successfull
        </p>
        {feedback && (
          <p className="font-semibold text-regent-gray capitalize text-lg">
            {feedback}
          </p>
        )}
        {txHash && chain?.id && (
          <TransactionLink
            name={chain.name}
            url={getTransactionUrl(txHash, chain)}
          />
        )}
        <div className="flex justify-center items-center gap-x-2">
          <button
            className="tracking-wide text-lg text-white rounded-lg w-32 py-1.5 px-4 enabled:bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 outline-none hover:bg-400p hover:animate-gradient"
            onClick={hideModal}
          >
            Close
          </button>
          {previewLink ? (
            <button
              className="tracking-wide text-lg text-white rounded-lg w-32 py-1.5 px-4 outline-none bg-regent-gray"
              onClick={() => preview(previewLink.href)}
            >
              {previewLink.href && "Preview"}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
