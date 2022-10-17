import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useTokenContract } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { removeTokens, setTokens } from "services/attestations/attestationSlice";
import { AttestationToken, AttestationToTokenMap } from "services/attestations/types";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useAccount } from "wagmi";
import { IssuerValues } from "../types";

export default function useIssueAttestation(address: string) {
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const { showModal } = useModalContext();
  const { form_loading } = useGetTxState();
  const { address: account } = useAccount();
  const getContract = useTokenContract();
  const tokenContract = getContract(address);


  async function getPayload(addresses: string[], credential: number) {
    let tokenId = await tokenContract?.totalSupply();
    const tokenIds: AttestationToken[] = addresses.map((owner, idx) => ({
      org: address,
      tokenId: tokenId.toNumber() + 1 + idx,
      attestation: credential,
      dateIssued: Date.now(),
      issuer: account!,
      owner: owner,
      active: true,
    }))

    const payload: AttestationToTokenMap = { [address]: tokenIds }
    
    return payload;
  }

  async function issueAttestation(metadata: IssuerValues) {
    const addresses = metadata.addresses.split(",");
    let payload = undefined;
    try {
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Confirm transaction..." })

      const tx = await tokenContract.batchMint(addresses, metadata.attestation);
      showModal(TransactionPrompt, {});
      updateTx({ step: Step.broadcast, txHash: tx.hash, message: "Issuing token..." })

      // preset issued tokens
      payload = await getPayload(metadata.addresses.split(",").map((v) => v.trim()), metadata.attestation);
      dispatch(setTokens(payload));
      await tx.wait();
      dispatch(setFormLoading(false))
      updateTx({ step: Step.success, txHash: tx.hash, message: "token issued" })
    } catch (e: any) {
      console.log("Error ", e?.data?.message, e?.message);
      if (payload !== undefined) {
        dispatch(removeTokens({ address, tokenIds: payload[address].map(t => t.tokenId)}))
      }
      updateTx({ step: Step.error, message: "An error occured while issuing credentials" });
      dispatch(setFormLoading(false));
      dispatch(setFormError(e?.data?.message ?? e?.message));
    }
  }
  return { issueAttestation, isLoading: form_loading };
}
