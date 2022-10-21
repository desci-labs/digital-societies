import AddressOrEns from "components/AddressOrEns/Index";
import Copier from "./Index";

export default function AddressCopier(props: { address: string; shorten?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      <AddressOrEns address={props.address} shorten={props.shorten} />
      <Copier text={props.address} />
    </div>
  );
}
