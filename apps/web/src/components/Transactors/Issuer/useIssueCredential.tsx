import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSBTContractFactory } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { removeTokens, setTokens } from "services/credentials/credentialSlice";
import { CredentialToTokenMap } from "services/credentials/types";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useAccount, useSigner } from "wagmi";
import { IssuerValues } from "../types";

export default function useIssueCredential(address: string) {
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const { showModal } = useModalContext();
  const { form_loading } = useGetTxState();
  const { address: account } = useAccount();
  const getContract = useSBTContractFactory();
  const { data: signer } = useSigner();
  const tokenContract = getContract(address).connect(signer!);


  async function getPayload(addresses: string[], credential: number) {
    let tokenId = await tokenContract?.totalSupply();
    const tokenIds = addresses.map((owner, idx) => ({
      org: address,
      tokenId: tokenId.toNumber() + 1 + idx,
      credential: credential,
      dateIssued: Date.now(),
      issuer: account!,
      owner: owner,
    }))
    const payload: CredentialToTokenMap = { [address]: tokenIds }
    
    return payload;
  }

  async function issueCredential(metadata: IssuerValues) {
    const addresses = metadata.addresses.split(",");
    let payload = undefined;
    try {
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Confirm transaction..." })

      const tx = await tokenContract.batchMint(addresses, metadata.credential);
      showModal(TransactionPrompt, {});
      updateTx({ step: Step.broadcast, txHash: tx.hash, message: "Issuing token..." })

      // preset issued tokens
      payload = await getPayload(metadata.addresses.split(",").map((v) => v.trim()), metadata.credential);
      dispatch(setTokens(payload));
      await tx.wait();
      dispatch(setFormLoading(false))
      updateTx({ step: Step.success, txHash: tx.hash, message: "token issued" })
    } catch (e: any) {
      console.log("Error ", e?.data?.message, e?.message);
      if (payload !== undefined) {
        dispatch(removeTokens({ address, tokenIds: payload[address].map(t => t.tokenId)}))
      }
      // dispatch(removeTokens({ address }))
      updateTx({ step: Step.error, message: "An error occured while issuing credentials" });
      dispatch(setFormLoading(false));
      dispatch(setFormError(e?.data?.message ?? e?.message));
    }
  }
  return { issueCredential, isLoading: form_loading, isSuccess: false };
}
