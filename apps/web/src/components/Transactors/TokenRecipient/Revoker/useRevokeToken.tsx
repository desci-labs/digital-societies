import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { IssuerValues } from "components/Transactors/types";
import { useTokenContract } from "hooks/useContract";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  useGetSelectedTokens,
  useResetTokenRecipients,
} from "services/admin/hooks";
import { updateTokens } from "services/attestations/reducer";
import { useGetAttestationTokens } from "services/attestations/hooks";
import { AttestationToken } from "services/attestations/types";
import { useGetTxState } from "services/transaction/hooks";
import { setFormLoading } from "services/transaction/reducer";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useAccount } from "wagmi";

export default function useRevokeToken() {
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const { address: account } = useAccount();
  const getContract = useTokenContract();
  const { showModal } = useModalContext();
  const { form_loading } = useGetTxState();
  console.log("loading", form_loading);
  const resetState = useResetTokenRecipients();
  const selectedTokens = useGetSelectedTokens();
  const { getValues, reset } = useFormContext<IssuerValues>();
  const orgContractAddress = getValues("org");
  const attestation = getValues("attestation");
  const tokenContract = getContract(orgContractAddress);
  const originalTokens = useGetAttestationTokens(
    orgContractAddress,
    attestation
  );

  async function revoke() {
    if (!tokenContract || !account) return;
    const tokens = selectedTokens
      .filter((t) => t.is_deleted && t.tokenId)
      .map((t) => t.tokenId) as number[];

    if (!tokens || tokens.length === 0) return;
    const tokensToUpdate = tokens
      .map((tokenId) => originalTokens.find((t) => t.tokenId === tokenId))
      .filter(Boolean) as AttestationToken[];

    try {
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Confirm transaction..." });
      showModal(TransactionPrompt, {});

      dispatch(
        updateTokens({
          address: orgContractAddress,
          tokens: tokensToUpdate.map((token) => ({
            org: token.org,
            tokenId: token.tokenId,
            attestation: token.attestation,
            issuer: token.issuer,
            active: false,
            revokedBy: account,
            owner: token.owner,
            dateRevoked: Date.now(),
          })),
        })
      );
      const tx = await tokenContract.batchRevoke(tokens);

      updateTx({
        step: Step.broadcast,
        txHash: tx.hash,
        message: "Revoking token...",
      });
      await tx.wait();

      reset();
      resetState();
      dispatch(setFormLoading(false));
      updateTx({
        step: Step.success,
        txHash: tx.hash,
        message: "Token revoked",
      });
    } catch (e: unknown) {
      dispatch(
        updateTokens({ address: orgContractAddress, tokens: tokensToUpdate })
      );
      dispatch(setFormLoading(false));
      updateTx({
        step: Step.error,
        message: `Error revoking token(s)`,
      });
    }
  }
  return { revoke, isLoading: form_loading };
}
