import { useModalContext } from "components/Modal/Modal";
import Button from "components/UI/Button/Index";
import { getTransactionUrl } from "helper/web3";
import { useRouter } from "next/router";
import { RotatingLines } from "react-loader-spinner";
import { BroadcastStage } from "services/transaction/types";
import { useNetwork } from "wagmi";
import TransactionLink from "./TransactionLink";

export default function Processing({
  message,
  previewLink,
  txHash,
}: BroadcastStage) {
  const { hideModal } = useModalContext();
  const { chain } = useNetwork();
  const router = useRouter();

  const preview = (path: string) => {
    hideModal();
    router.replace(path);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row justify-center items-center mb-2">
          <RotatingLines strokeColor="#61DCF7" width="100" strokeWidth="2" />
        </div>

        {chain?.id && (
          <TransactionLink
            name={chain.name}
            url={getTransactionUrl(txHash, chain)}
          />
        )}
        {message && (
          <p className="font-semibold text-regent-gray capitalize text-lg my-2">
            {message}
          </p>
        )}
        {previewLink && (
          <Button
            className="tracking-wide text-lg text-white rounded-lg w-full mt-5 bg-tint-primary-dark"
            onClick={() => preview(previewLink.href)}
          >
            {previewLink.caption ?? "Preview"}
          </Button>
        )}
      </div>
    </div>
  );
}
