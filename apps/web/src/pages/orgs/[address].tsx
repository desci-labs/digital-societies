import { useGetOrg } from "context/Factory/FactoryContext";
import { resolveIpfsURL } from "helper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { RotatingLines } from "react-loader-spinner";

export default function ListOrgs() {
  const router = useRouter();
  const { address } = router.query;
  const org = useGetOrg(address as string);

  if (!org) return (
    <div className="h-screen w-full flex justify-center">
      <RotatingLines strokeColor="#7B61FF" width="100" strokeWidth="2" />
    </div>
  );

  return (
    <div className="w-full h-screen bg-gray-200 grid grid-cols-1 content-start gap-y-5 place-items-center">
      <div className="w-full h-300 relative group">
        <ActionButtons address={org.address} />
        <div className="w-full h-300 relative">
          <Image
            src={resolveIpfsURL(org.metadata.image)}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            width="100"
            height="100"
          />
        </div>
      </div>
      <div className="container mx-auto">
        <span className="text-3xl block font-bold mb-2 text-left">
          {org.metadata.name} ({org.metadata.symbol})
        </span>
        <span className="text-lg block mb-2 text-left">
          {org.metadata.description}
        </span>
      </div>
    </div>
  );
}

function ActionButtons({ address}: {address: string}) {
  return (
    <div className="absolute top-0 right-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 h-300 w-full z-10 p-5 flex gap-5 items-start justify-end">
      <div>
        <Link href={`create-type/${address}`}>
          <a
            href={`create-type/${address}`}
            className="text-white text-md border border-cornflower-blue hover:text-cornflower-blue mt-16 text-center rounded-3xl px-3 py-1.5"
          >
            Add new type
          </a>
        </Link>
      </div>
      <div>
        <Link href={`edit/${address}`}>
          <a
            href={`edit/${address}`}
            className="text-white text-md border border-cornflower-blue hover:text-cornflower-blue mt-16 text-center rounded-3xl px-3 py-1.5"
          >
            Edit
          </a>
        </Link>
      </div>
    </div>
  );
}