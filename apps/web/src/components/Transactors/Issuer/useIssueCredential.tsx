import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSBTContractFactory } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { setToken } from "services/credentials/credentialSlice";
import { CredentialToken } from "services/credentials/types";
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
  const tokenContract = getContract(address);


  async function setTokens(addresses: string[], credential: number) {
    try {
      for (let owner of addresses) {
        const tokenId = await tokenContract?.totalSupply();
        const token: CredentialToken = {
          org: address,
          tokenId: tokenId.toNumber() + 1,
          credential: credential,
          dateIssued: Date.now(),
          issuer: account!,
          owner: owner,
        };
        dispatch(setToken({ token, address }));
      }
    } catch (e) {}
  }

  async function issueCredential(metadata: IssuerValues) {
    try {
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Confirm transaction..." })
     
      const arg1 = metadata.addresses.split(",").map((v) => v.trim());
      const tx = await tokenContract.connect(signer!).batchMint(arg1, metadata.credential);
      showModal(TransactionPrompt, {});
      updateTx({ step: Step.broadcast, txHash: tx.hash, message: "Issuing token..." })

      // preset issued tokens
      setTokens(metadata.addresses.split(",").map((v) => v.trim()), metadata.credential);
      await tx.wait();
      dispatch(setFormLoading(false))
      updateTx({ step: Step.success, txHash: tx.hash, message: "token issued"})
    } catch (e: any) {
      console.log("Error ", e?.data?.message, e?.message);
      updateTx({ step: Step.error, message: "An error occured while issuing credentials" });
      dispatch(setFormLoading(false));
      dispatch(setFormError(e?.data?.message ?? e?.message));
    }
  }
  return { issueCredential, isLoading: form_loading, isSuccess: false };
}
