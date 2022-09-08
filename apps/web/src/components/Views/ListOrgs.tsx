import Loader from "components/Loader";
import { Org, useGetOrgs } from "context/Factory/FactoryContext";
import { resolveIpfsURL } from "helper";
import Image from "next/image";
import Link from "next/link";

export default function ListOrgs() {
  const { data, isLoading } = useGetOrgs();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 content-start gap-y-10 place-items-center mt-10">
      {data.length && data.map((org) => <SBCard org={org} />)}
    </div>
  );
}

export function SBCard({ org }: { org: Org }) {

  return (
    <div className="min-w-80 w-80 h-96 rounded-lg shadow-lg cursor-pointer transition-shadow duration-200 hover:shadow-xl overflow-hidden">
      <div className="w-80 h-200 relative rounded-lg">
        <Image
          src={resolveIpfsURL(org.metadata.image)}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          width="100"
          height="100"
          className="rounded-lg rounded-bl-none rounded-br-none"
        />
      </div>
      <div className="p-2">
        <Link href={`orgs/${org.address}`}>
          <a className="text-xl block font-bold mb-2">
            {org.metadata.name}
          </a>
        </Link>
        <span className="text-md block truncate">{org.metadata.description}</span>
        {org.metadata.external_link && (
          <div className="flex justify-center">
            <a
              href={org.metadata.external_link}
              target="_blank"
              rel="noopener"
              className="inline-block text-md border border-cornflower-blue hover:text-cornflower-blue mt-16 text-center rounded-3xl px-3 py-1.5"
            >
              Visit website
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
