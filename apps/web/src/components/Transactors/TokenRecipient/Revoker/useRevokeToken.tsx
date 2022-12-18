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
import { useGetOrg } from "services/orgs/hooks";
import { addDelegates, removeDelegates } from "services/orgs/reducer";

export default function useRevokeToken() {
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const { address: account } = useAccount();
  const getContract = useTokenContract();
  const { showModal } = useModalContext();
  const { form_loading } = useGetTxState();
  const resetState = useResetTokenRecipients();
  const selectedTokens = useGetSelectedTokens();
  const { getValues, reset } = useFormContext<IssuerValues>();
  const society = getValues("society");
  const attestation = getValues("attestation");
  const tokenContract = getContract(society);
  const originalTokens = useGetAttestationTokens(society, attestation);
  const org = useGetOrg(society);

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

      if (org?.delegateRoleId === attestation) {
        const delegates = tokensToUpdate.map((t) => t.owner);
        dispatch(removeDelegates({ org: society, delegates }));
      }
      dispatch(
        updateTokens({
          address: society,
          tokens: tokensToUpdate.map((token) => ({
            society: token.society,
            tokenId: token.tokenId,
            attestation: token.attestation,
            issuedBy: token.issuedBy,
            issuedAt: token.issuedAt,
            active: false,
            revokedBy: account,
            owner: token.owner,
            revokedAt: Date.now(),
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
      dispatch(updateTokens({ address: society, tokens: tokensToUpdate }));
      if (org?.delegateRoleId === attestation) {
        const delegates = tokensToUpdate.map((t) => t.owner);
        dispatch(addDelegates({ org: society, delegates }));
      }
      dispatch(setFormLoading(false));
      updateTx({
        step: Step.error,
        message: `Error revoking token(s)`,
      });
    }
  }
  return { revoke, isLoading: form_loading };
}
