import { useGetter } from "store/accessors";

export function useGetTxStage() {
  const stage = useGetter(state => state.transaction.stage);

  return stage;
}

export function useGetTxState() {
  const state = useGetter(state => state.transaction);

  return state;
}