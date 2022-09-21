import { useModalContext } from "components/Modal/Modal";
import ErrorView from "components/ModalViews/Error";
import Processing from "components/ModalViews/Processing";
import Success from "components/ModalViews/Success";
import { DELEGATE_ROLE } from "constants/roles";
import { useSetTx } from "context/useTx";
import { useSBTContractFactory } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { addDelegate } from "services/orgs/orgSlice";
import { useContractWrite } from "wagmi";
import { DelegaterValues } from "../types";

export default function useGrantRole(address: string) {
  const { showModal } = useModalContext();
  const { setTx, reset } = useSetTx();
  const getContract = useSBTContractFactory();
  const tokenContract = getContract(address);
  const dispatch = useDispatch();

  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: tokenContract.address!,
    contractInterface: tokenContract.interface!,
    functionName: "grantRole",
  });

  async function grantRole(metadata: DelegaterValues) {
    try {
      reset();
      
      showModal(Processing, { message: 'Confirming transaction...' })
      const args = [DELEGATE_ROLE, metadata.delegate]
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: args,
      });
      setTx({ txHash: tx.hash, message: 'Delegate role granted' })
      dispatch(addDelegate({ org: address, delegate: metadata.delegate }))
      await tx.wait();
      showModal(Success, {});
    } catch (e: any) {
      console.log('Error ', e?.data?.message, e?.message);
      showModal(ErrorView, { message: "Error processing transaction", })
    }

  }
  return { grantRole, isLoading, isSuccess };
}
