import { RotatingLines } from "react-loader-spinner";

type Props = { className?: string }
export default function Loader(props: Props) {
  return (
    <div className={`w-full flex justify-center ${props.className ?? ''}`} >
      <RotatingLines strokeColor="#7B61FF" width="100" strokeWidth="2" />
    </div>
  )
}