import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { MetadataValues } from "components/Transactors/types";
import { utils } from "ethers";
import { pinMetadataToIpfs } from "helper/web3";
import { useFactoryContract } from "hooks/useContract";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOrg } from "services/orgs/orgSlice";
import { PendingOrg } from "services/orgs/types";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";

export default function useLaunch() {
  const { showModal } = useModalContext();
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const { form_loading } = useGetTxState();
  const factoryContract = useFactoryContract();

  useEffect(() => () => { dispatch(setFormError(null)) });

  async function launch(metadata: MetadataValues) {
    if (!factoryContract) return;
    try {
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Pinning Metadata to IPFS..." });
      showModal(TransactionPrompt, {});

      const { ipfsURL, CIDString } = await pinMetadataToIpfs(metadata);

      updateTx({ step: Step.submit, message: "Confirm transaction..." });
      const tx = await factoryContract.deployToken(metadata.name, metadata.acronym, ipfsURL)
      updateTx({ step: Step.broadcast, txHash: tx.hash, message: `Deploying ${metadata.name}` });

      const receipt = await tx.wait();
      const address = utils.getAddress("0x" + receipt.logs[3].topics?.[1].slice(26));
      const block = await factoryContract.provider.getBlock(receipt.blockNumber);

      const preview: PendingOrg = {
        cid: CIDString,
        metadata,
        address,
        admin: metadata.issuer,
        delegates: [metadata.issuer],
        dateCreated: block.timestamp * 1000,
        pending: true,
        verified: false
      };

      dispatch(setOrg(preview));
      updateTx({ step: Step.success, message: "", txHash: tx.hash, previewLink: { href: `/orgs/${address}`, caption: "Preview" } });
      dispatch(setFormLoading(false));
    } catch (e: any) {
      console.log("Error ", e);
      updateTx({ step: Step.error, message: "Unable to complete deployment" });
      dispatch(setFormLoading(false));
      dispatch(setFormError({ title: `Error deploying ${metadata.name}`, details: "" }));
    }
  }
  return { launch, isLoading: form_loading };
}
