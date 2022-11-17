import { maskAddress } from "helper";
import { useEnsName } from "wagmi";

export default function AddressOrEns(props: {
  address: string;
  shorten?: boolean;
}) {
  const { data } = useEnsName({ address: props.address as `0x`, chainId: 1 });
  const shorten = props.shorten === undefined || props.shorten == true;
  return <>{data ?? shorten ? maskAddress(props.address) : props.address}</>;
}
