import { ConnectButton } from "@rainbow-me/rainbowkit";
import ContentLoader from "components/ContentLoader/ContentLoader";
import Link from "next/link";
import { Org, PendingOrg } from "services/orgs/types";
import { useDelegateTokens } from "services/thegraph/desoc/hooks";
import { useAccount } from "wagmi";
import {
  MetadataCard,
  MetadataCardPlaceholder,
} from "components/UI/Attestation/MetadataCard";
import Toolbar from "components/UI/Desoc/DesocList/Toolbar";
import useFilteredOrg from "components/UI/Desoc/DesocList/useFilteredOrg";

function SocietyItem({ org }: { org: Org | PendingOrg }) {
  // trigger updater hook
  useDelegateTokens(org);

  return (
    <MetadataCard
      link={`orgs/${org.address}`}
      banner={org.metadata.banner}
      metadata={org.metadata}
      verified={org.verified}
      bannerClass="h-40"
    />
  );
}

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
    return <SkeletonPlaceholder />;
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
          <SocietyItem org={org} key={idx} />
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

function SkeletonPlaceholder() {
  return (
    <div className="container mx-auto place-content-stretch place-items-center grid p-4 pt-0 mt-8 gap-5">
      <ContentLoader className="my-8 min-w-80 w-80 h-16" />
      <MetadataCardPlaceholder />
      <MetadataCardPlaceholder />
    </div>
  );
}
