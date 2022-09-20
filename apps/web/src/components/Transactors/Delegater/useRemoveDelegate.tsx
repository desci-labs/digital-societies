import { useModalContext } from "components/Modal/Modal";
import ErrorView from "components/ModalViews/Error";
import Processing from "components/ModalViews/Processing";
import Success from "components/ModalViews/Success";
import { DELEGATE_ROLE } from "constants/roles";
import { useSetTx } from "context/useTx";
import { useSBTContractFactory } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { removeDelegate } from "services/orgs/orgSlice";
import { useContractWrite } from "wagmi";

export default function useRemoveDelegate(address: string) {
  const { showModal } = useModalContext();
  const { setTx, reset } = useSetTx();
  const getContract = useSBTContractFactory();
  const tokenContract = getContract(address);
  const dispatch = useDispatch();

  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: tokenContract.address!,
    contractInterface: tokenContract.interface!,
    functionName: "revokeRole",
  });

  async function revoke(delegate: string) {
    if (!tokenContract) return;
    try {
      reset();
      
      showModal(Processing, { message: 'Confirming transaction...' })
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: [DELEGATE_ROLE, delegate],
      });
      setTx({ txInfo: tx, message: 'Revoking role...' })
      dispatch(removeDelegate({ org: address, delegate: delegate }))
      await tx.wait();
      showModal(Success, { message: `Delegate removed `});
    } catch (e: any) {
      console.log('Error ', e?.data?.message, e?.message);
      showModal(ErrorView, { message: "Error processing transaction", })
    }

  }
  return { revoke, isLoading, isSuccess };
}
