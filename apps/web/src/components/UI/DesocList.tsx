import Loader from "components/Loader";
import { useGetOrgState } from "services/orgs/hooks";
import Link from "next/link";
import { MetadataCard } from "./Attestation/MetadataCard";

export default function DesocList() {
  const { data, isLoading } = useGetOrgState();

  if (isLoading) {
    return <Loader className="h-screen" />;
  }

  if (data.length === 0) {
    return <NoContent />;
  }
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 content-start gap-y-10 place-items-center mt-10">
      {data.map((org, idx) => (
        <MetadataCard
          key={idx}
          link={`orgs/${org.address}`}
          metadata={org.metadata}
          bannerClass="h-40"
        />
      ))}
    </div>
  );
}

function NoContent() {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-96 gap-10">
      <h1 className="text-xl">No Organisations deployed yet!!!</h1>
      <Link href="/launch">
        <a className="font-semibold text-lg hover:text-darker capitalize border border-black p-2">
          Launch an organisation
        </a>
      </Link>
    </div>
  );
}
