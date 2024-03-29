import { useModalContext } from "components/Modal/Modal";
import Button from "components/UI/Button/Index";
import { getTransactionUrl } from "helper/web3";
import { useRouter } from "next/router";
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
    router.replace(path);
    hideModal();
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-3xl mb-3">🎉</p>
        <p className="heading-3 capitalize">
          {feedback ? feedback : "Transaction Successful"}
        </p>
        {txHash && chain?.id && (
          <TransactionLink
            name={chain.name}
            url={getTransactionUrl(txHash, chain)}
          />
        )}
        {previewLink && (
          <Button
            className="tracking-wide text-lg text-white rounded-lg w-full mt-5 bg-tint-primary-dark"
            onClick={() => preview(previewLink.href)}
          >
            {previewLink && "Preview"}
          </Button>
        )}
      </div>
    </div>
  );
}
