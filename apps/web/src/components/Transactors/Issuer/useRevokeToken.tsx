import { useModalContext } from "components/Modal/Modal";
import ErrorView from "components/ModalViews/Error";
import Processing from "components/ModalViews/Processing";
import Success from "components/ModalViews/Success";
import { useSetTx } from "context/useTx";
import { useSBTContractFactory } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { removeToken } from "services/credentials/credentialSlice";
import { CredentialToken } from "services/credentials/types";
import { addRevocation } from "services/orgs/orgSlice";
import { useAccount, useContractWrite } from "wagmi";

export default function useRevokeToken(address: string) {
  const { showModal } = useModalContext();
  const { address: account } = useAccount();
  const { setTx, reset } = useSetTx();
  const getContract = useSBTContractFactory();
  const tokenContract = getContract(address);
  const dispatch = useDispatch();

  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: tokenContract?.address!,
    contractInterface: tokenContract?.interface!,
    functionName: "revoke",
  });

  async function revoke(token: CredentialToken) {
    if (!tokenContract) return;
    try {
      reset();

      showModal(Processing, { message: 'Confirming transaction...' })
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: token.tokenId,
      });

      dispatch(removeToken({ address, tokenId: token.tokenId }));
      dispatch(addRevocation({ org: address, token: { tokenId: token.tokenId, revokedBy: account!, owner: token.owner, timestamp: Date.now() } }))
      
      setTx({ txHash: tx.hash, message: 'Revoking Credential...' })
      await tx.wait();
      showModal(Success, { message: `Credential successfully revoked ` });
    } catch (e: any) {
      console.log('Error ', e?.data?.message, e?.message);
      showModal(ErrorView, { message: "Error processing transaction", });
    }

  }
  return { revoke, isLoading, isSuccess };
}
