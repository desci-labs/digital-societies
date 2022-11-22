import { useDispatch } from "react-redux";
import { setStage } from "./reducer";
import { StageUpdator } from "./types";

export default function useTxUpdator() {
  const dispatch = useDispatch();

  const updateTx: StageUpdator = (update) => {
    dispatch(setStage(update));
  };

  return { updateTx };
}
