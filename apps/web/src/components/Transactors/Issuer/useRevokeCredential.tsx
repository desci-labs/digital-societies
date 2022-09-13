import { useSetModal } from "components/Modal/Modal";
import ErrorView from "components/ModalViews/Error";
import Processing from "components/ModalViews/Processing";
import Success from "components/ModalViews/Success";
import { useSetTx } from "context/useTx";
import { useSBTContractFactory } from "hooks/useContract";
import { useContractWrite } from "wagmi";

export default function useRevokeCredential(address: string) {
  const { showModal } = useSetModal();
  const { setTx, reset } = useSetTx();
  const getContract = useSBTContractFactory();
  const tokenContract = getContract(address);

  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: tokenContract.address!,
    contractInterface: tokenContract.interface!,
    functionName: "revoke",
  });

  async function revoke(tokenId: number) {
    if (!tokenContract) return;
    try {
      reset();
      
      showModal(Processing, { message: 'Confirming transaction...' })
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: tokenId,
      });
      setTx({ txInfo: tx, message: 'Revoking Credential...' })
      await tx.wait();
      showModal(Success, { message: `Credential successfully revoked `});
    } catch (e: any) {
      console.log('Error ', e?.data?.message, e?.message);
      showModal(ErrorView, { message: "Error processing transaction", })
    }

  }
  return { revoke, isLoading, isSuccess };
}
