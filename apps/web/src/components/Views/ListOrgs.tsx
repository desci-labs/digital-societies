import Loader from "components/Loader";
import { MetadataCard } from "components/UI/Credential/Index";
import { useGetOrgState } from "services/orgs/hooks";
import Link from "next/link";

export default function ListOrgs() {
  const { data, isLoading } = useGetOrgState();

  if (isLoading) {
    return <Loader className="h-screen" />;
  }

  if (data.length === 0) {
    return <NoContent />;
  }

  return (
    <div className="container py-10 grid grid-cols-1 lg:grid-cols-3 content-start gap-y-10 place-items-center mt-10">
      {data.map((org, idx) => (
        <MetadataCard
          key={idx}
          link={`orgs/${org.address}`}
          metadata={org.metadata}
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
        <a className="font-semibold text-lg hover:text-dark capitalize border border-black p-2">
          Launch an organisation
        </a>
      </Link>
    </div>
  );
}
