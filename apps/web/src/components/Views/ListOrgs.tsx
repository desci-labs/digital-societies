import Loader from "components/Loader";
import { ExternalLink } from "components/UI/Index";
import { Org, useGetOrgs } from "context/Factory/FactoryContext";
import { resolveIpfsURL, shortenText } from "helper";
import Image from "next/image";
import Link from "next/link";

export default function ListOrgs() {
  const { data, isLoading } = useGetOrgs();

  if (isLoading) {
    return <Loader className="h-screen" />;
  }
  console.log('filtered ', data);
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 content-start gap-y-10 place-items-center mt-10">
      {data.length && data.filter(org => !!org.metadata).map((org, idx) => <SBCard key={idx} org={org} />)}
    </div>
  );
}

export function SBCard({ org }: { org: Org }) {
  return (
    <div className="min-w-80 w-80 h-96 rounded-lg shadow-md cursor-pointer transition-shadow duration-200 hover:shadow-xl overflow-hidden">
      <div className="w-80 h-48 relative rounded-lg">
        <Image
          src={resolveIpfsURL(org.metadata.image)}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={`${org.metadata.name} image`}
          className="rounded-lg rounded-bl-none rounded-br-none"
        />
      </div>
      <div className="p-2">
        <Link href={`orgs/${org.address}`}>
          <a className="text-xl block font-bold mb-1 truncate">{org.metadata.name}</a>
        </Link>
        <div className="flex flex-col justify-between h-32 gap-1">
          <span className="text-sm block">
            {shortenText(org.metadata.description)}
          </span>
          {org.metadata.external_link && (
            <div className="flex justify-center">
              <ExternalLink href={org.metadata.external_link} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
