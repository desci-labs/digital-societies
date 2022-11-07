import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useTokenContract } from "hooks/useContract";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  useGetSelectedTokens,
  useResetTokenRecipients,
} from "services/admin/hooks";
import {
  removeTokens,
  setTokens,
} from "services/attestations/attestationSlice";
import {
  AttestationToken,
  AttestationToTokenMap,
} from "services/attestations/types";
import { useGetTxState } from "services/transaction/hooks";
import {
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useAccount } from "wagmi";
import { IssuerValues } from "../../types";

export default function useUpdateTokenRecipients(address: string) {
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const { showModal } = useModalContext();
  const { form_loading } = useGetTxState();
  const { address: account } = useAccount();
  const { getValues, reset } = useFormContext<IssuerValues>();
  const getContract = useTokenContract();
  const tokenContract = getContract(getValues("org"));
  const tokenRecipients = useGetSelectedTokens();
  const resetState = useResetTokenRecipients();
  const attestation = getValues("attestation");

  async function getPayload(addresses: string[], credential: number) {
    const tokenId = await tokenContract?.totalSupply();
    const tokenIds: AttestationToken[] = addresses.map((owner, idx) => ({
      org: address,
      tokenId: tokenId.toNumber() + 1 + idx,
      attestation: credential,
      dateIssued: Date.now(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      issuer: account!,
      owner: owner,
      active: true,
    }));

    const payload: AttestationToTokenMap = { [address]: tokenIds };

    return payload;
  }

  async function issueAttestation() {
    if (!account) return;
    const addresses = tokenRecipients
      .filter((t) => t.is_added && !t.tokenId)
      .map((recipients) => recipients.address);
    console.log("tokens", addresses);
    let payload = undefined;

    try {
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Confirm transaction..." });

      const tx = await tokenContract.batchMint(addresses, attestation);
      showModal(TransactionPrompt, {});
      updateTx({
        step: Step.broadcast,
        txHash: tx.hash,
        message: "Issuing token...",
      });

      // preset issued tokens
      payload = await getPayload(addresses, attestation);
      dispatch(setTokens(payload));
      await tx.wait();
      dispatch(setFormLoading(false));
      updateTx({
        step: Step.success,
        txHash: tx.hash,
        message: "token issued",
      });
      reset();
      resetState();
    } catch (err: unknown) {
      const e = err as Error & { data: { message: string } };
      console.log("Error ", e?.data?.message, e?.message);
      if (payload !== undefined) {
        dispatch(
          removeTokens({
            address,
            tokenIds: payload[address].map((t) => t.tokenId),
          })
        );
      }
      updateTx({
        step: Step.error,
        message: "An error occured while issuing credentials",
      });
      dispatch(setFormLoading(false));
      dispatch(setFormError(e?.data?.message ?? e?.message));
    }
  }
  return { issueAttestation, tokenRecipients, isLoading: form_loading };
}
