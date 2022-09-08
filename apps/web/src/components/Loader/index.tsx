import { RotatingLines } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="h-screen w-full flex justify-center" >
      <RotatingLines strokeColor="#7B61FF" width="100" strokeWidth="2" />
    </div>
  )
}