import maskAddress from "helper";
import { useEnsName } from "wagmi";

export default function AddressOrEns(props: { address: string }) {
  const { data } = useEnsName({ address: props.address, chainId: 1 });
  return <>{data ?? maskAddress(props.address)}</>;
}