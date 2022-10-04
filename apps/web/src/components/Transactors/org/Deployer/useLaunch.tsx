import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { MetadataValues } from "components/Transactors/types";
import { SBFactory } from "constants/types/SBFactory";
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
      const wrappedContract = (await wrapFactoryContract(factoryContract, chain?.id!)) as SBFactory;
      
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Pinning Metadata to IPFS..." });
      showModal(TransactionPrompt, {});

      const { CIDBytes, CIDString } = await pinMetadataToIpfs(metadata);

      updateTx({ step: Step.submit, message: "Submitting transaction..." });
      const tx = await wrappedContract.deployToken(metadata.name, metadata.symbol, CIDBytes)
      updateTx({ step: Step.broadcast, txHash: tx.hash, message: `Deploying ${metadata.name}` });

      const receipt = await tx.wait();
      const address = utils.getAddress(receipt.logs[3].address);
      const block = await wrappedContract.provider.getBlock(receipt.blockNumber);

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
      updateTx({ step: Step.success, message: "", txHash: tx.hash, previewLink: { href: `/orgs/${address}`, caption: "Preview" } });
      dispatch(setFormLoading(false));
    } catch (e: any) {
      console.log("Error ", e?.data?.message, e?.message);
      updateTx({ step: Step.error, message: "Deployment not completed!!" });
      dispatch(setFormLoading(false));
      dispatch(setFormError({ title: `Error deploying ${metadata.name}`, details: "" }));
    }
  }
  return { launch, isLoading: form_loading };
}
