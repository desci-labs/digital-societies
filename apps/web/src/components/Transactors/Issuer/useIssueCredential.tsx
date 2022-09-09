import { useSetModal } from "components/Modal/Modal";
import ErrorView from "components/ModalViews/Error";
import Processing from "components/ModalViews/Processing";
import Success from "components/ModalViews/Success";
import { useSetTx } from "context/useTx";
import { useSBTContractFactory } from "hooks/useContract";
import { useContractWrite } from "wagmi";
import { IssuerValues } from "../types";

export default function useIssueCredential(address: string) {
  const { showModal } = useSetModal();
  const { setTx, reset } = useSetTx();
  const getContract = useSBTContractFactory();
  const tokenContract = getContract(address);

  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: tokenContract.address!,
    contractInterface: tokenContract.interface!,
    functionName: "batchMint",
  });

  async function issueCredential(metadata: IssuerValues) {
    try {
      reset();
      
      showModal(Processing, { message: 'Confirming transaction...' })
      const args = [metadata.addresses.split(',').map(v => v.trim()), metadata.credential]
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: args,
      });
      setTx({ txInfo: tx, message: 'Issuing Credential...' })
      await tx.wait();
      showModal(Success, {});
    } catch (e: any) {
      console.log('Error ', e?.data?.message, e?.message);
      showModal(ErrorView, { message: "Error processing transaction", })
    }

  }
  return { issueCredential, isLoading, isSuccess };
}
