import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { MetadataValues } from "components/Transactors/types";
import { utils } from "ethers";
import { pinMetadataToIpfs } from "helper/web3";
import { useFactoryContract } from "hooks/useContract";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CustomDataError } from "services/api/types";
import { setOrg } from "services/orgs/reducer";
import { PendingOrg } from "services/orgs/types";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/reducer";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useAccount } from "wagmi";

export default function useLaunch() {
  const { showModal } = useModalContext();
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const { form_loading } = useGetTxState();
  const factoryContract = useFactoryContract();
  const { address: issuer } = useAccount();
  const router = useRouter();

  useEffect(() => () => {
    dispatch(setFormError(null));
  });

  const lunchCallback = (address: string) => {
    router.replace(`/dashboard/${address}`);
  };

  async function launch(metadata: MetadataValues) {
    try {
      if (!factoryContract) return;
      if (!issuer) return;

      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Pinning Metadata to IPFS..." });
      showModal(TransactionPrompt, {});

      const { ipfsURL } = await pinMetadataToIpfs(metadata);

      updateTx({ step: Step.submit, message: "Confirm transaction..." });
      const tx = await factoryContract.deployToken(
        metadata.name,
        metadata.symbol,
        ipfsURL
      );
      updateTx({
        step: Step.broadcast,
        txHash: tx.hash,
        message: `Deploying ${metadata.name}`,
      });

      const receipt = await tx.wait();
      const address = utils.getAddress(
        "0x" + receipt.logs[3].topics?.[1].slice(26)
      );
      const block = await factoryContract.provider.getBlock(
        receipt.blockNumber
      );

      const preview: PendingOrg = {
        metadataUri: ipfsURL,
        metadata,
        address,
        admin: issuer,
        delegates: [],
        dateCreated: block.timestamp * 1000,
        pending: true,
        verified: false,
        delegateRoleId: "",
      };

      dispatch(setOrg(preview));
      updateTx({
        step: Step.success,
        message: "",
        txHash: tx.hash,
        previewLink: { href: `/orgs/${address}`, caption: "Preview" },
      });
      dispatch(setFormLoading(false));
      lunchCallback(address);
    } catch (err: unknown) {
      const e = err as CustomDataError;
      console.log("Error ", e);
      updateTx({ step: Step.error, message: "Unable to complete deployment" });
      dispatch(setFormLoading(false));
      dispatch(
        setFormError({ title: `Error deploying ${metadata.name}`, details: "" })
      );
    }
  }
  return { launch, isLoading: form_loading };
}
