import Loader from "components/Loader";
import { Org, useGetOrgs } from "context/Factory/FactoryContext";
import { resolveIpfsURL } from "helper";
import Image from "next/image";
import Link from "next/link";

export default function ListOrgs() {
  const { data, isLoading } = useGetOrgs();

  if (isLoading) {
    return <Loader className="h-screen" />;
  }

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 content-start gap-y-10 place-items-center mt-10">
      {data.length && data.map((org, idx) => <SBCard key={idx} org={org} />)}
    </div>
  );
}

export function SBCard({ org }: { org: Org }) {
  return (
    <div className="min-w-80 w-80 h-96 rounded-lg shadow-lg cursor-pointer transition-shadow duration-200 hover:shadow-xl overflow-hidden">
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
          <a className="text-xl block font-bold mb-1">
            {org.metadata.name}
          </a>
        </Link>
        <div className="flex flex-col justify-between h-32 gap-2">
          <span className="text-md block">{org.metadata.description.substring(0, 100)}...</span>
          {org.metadata.external_link && (
            <div className="flex justify-center">
              <a
                href={org.metadata.external_link}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-md border border-cornflower-blue hover:text-cornflower-blue text-center rounded-3xl px-3 py-1.5"
              >
                Visit website
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
