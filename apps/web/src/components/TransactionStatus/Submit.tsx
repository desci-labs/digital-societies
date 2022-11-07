import { RotatingLines } from "react-loader-spinner";
import { SubmitStage } from "services/transaction/types";

export default function Submit({ message }: SubmitStage) {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row justify-center items-center mb-5">
          <RotatingLines strokeColor="#61DCF7" width="100" strokeWidth="2" />
        </div>
        <p className="font-semibold text-regent-gray capitalize text-lg">
          {message || "Submitting transaction..."}
        </p>
      </div>
    </div>
  );
}
