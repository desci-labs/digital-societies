import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { MetadataValues } from "components/Transactors/types";
import { DesocManager } from "constants/types/DesocManager";
import { utils } from "ethers";
import { pinMetadataToIpfs } from "helper/web3";
import { useFactoryContract, useWrapContract } from "hooks/useContract";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOrg } from "services/orgs/orgSlice";
import { PendingOrg } from "services/orgs/types";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useNetwork } from "wagmi";

export default function useLaunch() {
  const { showModal } = useModalContext();
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const { form_loading } = useGetTxState();
  const factoryContract = useFactoryContract();
  const { chain } = useNetwork();
  const wrapFactoryContract = useWrapContract();

  useEffect(() => () => { dispatch(setFormError(null)) });

  async function launch(metadata: MetadataValues) {
    try {
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Initializing transaction..." });
      showModal(TransactionPrompt, {});

      const wrappedContract = (await wrapFactoryContract(factoryContract!, chain?.id!)) as DesocManager;
      updateTx({ step: Step.submit, message: "Pinning Metadata to IPFS..." });

      const { CIDBytes, CIDString } = await pinMetadataToIpfs(metadata);

      updateTx({ step: Step.submit, message: "Submitting transaction..." });
      console.log('wrapped ', wrappedContract);
      const tx = await wrappedContract.deployToken(metadata.name, metadata.symbol, CIDBytes)
      
      const txReceipt = (await tx.wait()).logs[2];
      updateTx({ step: Step.broadcast, txHash: txReceipt.transactionHash, message: `Deploying ${metadata.name}` });
      const address = utils.getAddress(txReceipt.address);
      const block = await wrappedContract.provider.getBlock(txReceipt.blockNumber);

      const preview: PendingOrg = {
        cid: CIDString,
        metadata,
        address,
        admin: metadata.issuer,
        revocations: [],
        delegates: [metadata.issuer],
        dateCreated: block.timestamp * 1000,
        pending: true,
      };
      dispatch(setOrg(preview));
      updateTx({ step: Step.success, message: "", txHash: txReceipt.transactionHash, previewLink: { href: `/orgs/${address}`, caption: "Preview" } });
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
