import { ConnectButton } from "@rainbow-me/rainbowkit";
import Loader from "components/Loader";
import Link from "next/link";
import { useAccount } from "wagmi";
import { MetadataCard } from "../../Attestation/MetadataCard";
import Toolbar from "./Toolbar";
import useFilteredOrg from "./useFilteredOrg";

export default function DesocList() {
  const {
    isEmpty,
    isDebouncing,
    isLoading,
    filteredList: data,
    searchText,
    handleSearchTextChange,
  } = useFilteredOrg();

  if (isLoading) {
    return <Loader className="h-screen" />;
  }

  if (isEmpty) {
    return <NoContent />;
  }

  return (
    <div className="container mx-auto w-full mt-5">
      <Toolbar
        searchText={searchText}
        onhSearchTextChange={handleSearchTextChange}
        isDebouncing={isDebouncing}
      />
      {searchText && data.length === 0 && <NoResult text={searchText} />}
      <div className="container mx-auto py-10 grid grid-cols-1 content-start gap-y-10 place-items-center mt-2">
        {data.map((org, idx) => (
          <MetadataCard
            key={idx}
            link={`orgs/${org.address}`}
            metadata={org.metadata}
            verified={org.verified}
            bannerClass="h-40"
          />
        ))}
      </div>
    </div>
  );
}

function NoResult(props: { text: string }) {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-96 gap-10">
      <h1 className="text-xl tracking-widest">
        No Results found for{" "}
        <span className="font-bold text-tint-primary-hover">{props.text}</span>
      </h1>
    </div>
  );
}

function NoContent() {
  const { isConnected } = useAccount();
  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-96 gap-10">
      <h1 className="text-xl">No Organisations deployed yet!!!</h1>
      {isConnected ? (
        <Link href="/launch">
          <a className="font-semibold text-lg hover:text-darker capitalize border border-black p-2">
            Launch an organisation
          </a>
        </Link>
      ) : (
        <ConnectButton showBalance={false} />
      )}
    </div>
  );
}
