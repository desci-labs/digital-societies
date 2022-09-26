import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useTokenContract } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { removeToken, setTokens } from "services/credentials/credentialSlice";
import { CredentialToken } from "services/credentials/types";
import { addRevocation, deleteRevocation } from "services/orgs/orgSlice";
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

  async function revoke(token: CredentialToken) {
    if (!tokenContract) return;
    try {
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Confirm transaction..." })
      showModal(TransactionPrompt, {});

      const tx = await tokenContract.revoke(token.tokenId);
      dispatch(removeToken({ address, tokenId: token.tokenId }));
      dispatch(addRevocation({ org: address, token: { tokenId: token.tokenId, revokedBy: account!, owner: token.owner, timestamp: Date.now() } }))

      updateTx({ step: Step.broadcast, txHash: tx.hash, message: 'Revoking Credential...' })
      await tx.wait();
      console.log('tx ', tx);
      dispatch(setFormLoading(false));
      updateTx({ step: Step.success, txHash: tx.hash, message: 'Credential revoked' });
    } catch (e: any) {
      dispatch(setTokens({ [address]: [token] }));
      dispatch(deleteRevocation({ org: address, tokenId: token.tokenId }))
      dispatch(setFormLoading(false));
      updateTx({ step: Step.error, message: `Error revoking tokenId ${token.tokenId}`, });
    }

  }
  return { revoke, isLoading: form_loading };
}
