import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useTokenContract } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { updateTokens } from "services/attestations/attestationSlice";
import { AttestationToken } from "services/attestations/types";
import { useGetTxState } from "services/transaction/hooks";
import { setFormLoading } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useAccount } from "wagmi";

export default function useRevokeToken(address: string) {
  const { address: account } = useAccount();
  const { updateTx } = useTxUpdator();
  const { showModal } = useModalContext();
  const getContract = useTokenContract();
  const tokenContract = getContract(address);
  const dispatch = useDispatch();
  const { form_loading } = useGetTxState();

  async function revoke(token: AttestationToken) {
    if (!tokenContract) return;
    try {
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Confirm transaction..." });
      showModal(TransactionPrompt, {});

      const tx = await tokenContract.revoke(token.tokenId);
      dispatch(updateTokens({
        address, tokens: [{
          ...token, 
          active: false,
          revokedBy: account!,
          owner: token.owner,
          dateRevoked: Date.now(),
        }]
      }));
      updateTx({
        step: Step.broadcast,
        txHash: tx.hash,
        message: "Revoking token...",
      });
      await tx.wait();
      dispatch(setFormLoading(false));
      updateTx({
        step: Step.success,
        txHash: tx.hash,
        message: "Token revoked",
      });
    } catch (e: any) {
      dispatch(updateTokens({ address, tokens: [token] }));
      dispatch(setFormLoading(false));
      updateTx({
        step: Step.error,
        message: `Error revoking tokenId ${token.tokenId}`,
      });
    }
  }
  return { revoke, isLoading: form_loading };
}
