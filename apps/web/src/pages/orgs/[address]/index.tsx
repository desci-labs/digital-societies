import AddressOrEns from "components/AddressOrEns/Index";
import { Button } from "components/Form/Index";
import Loader from "components/Loader";
import useRemoveDelegate from "components/Transactors/Delegater/useRemoveDelegate";
import { Cell, Row, Table, TBody, THead } from "components/UI/Table";
import {
  useGetOrg,
  useIsAdmin,
} from "context/Factory/FactoryContext";
import { resolveIpfsURL } from "helper";
import Image from "next/image";
import { useRouter } from "next/router";
import { RiCloseLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { useAccount } from "wagmi";
import { CredentialGridView } from "components/UI/Credential/Index";
import useDelegater from "components/Transactors/Delegater/useDelegater";

export default function ViewOrgs() {
  const router = useRouter();
  const { address } = router.query;
  const org = useGetOrg(address as string);
  // const hasAccess = useCanMutateOrg(org?.address!);

  if (!org) return <Loader className="h-screen" />;

  return (
    <div className="w-full grid grid-cols-1 content-start gap-y-5 place-items-center mb-10">
      <div className="w-full h-104 relative group">
        <div className="w-full h-full relative">
          <Image
            src={resolveIpfsURL(org.metadata.image)}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={org.metadata.name}
          />
        </div>
      </div>
      <div className="container mx-auto">
        <span className="text-3xl block font-bold mb-2 text-left">
          {org.metadata.name} ({org.metadata.symbol})
        </span>
        <span className="text-lg block mb-2 text-left text-regent-gray">
          {org.metadata.description}
        </span>
      </div>
      <CredentialGridView address={org.address} />
      <Delegates address={org.address} />
    </div>
  );
}

function Delegates({ address }: { address: string }) {
  const org = useGetOrg(address);
  const { address: user } = useAccount();
  const { revoke, isLoading } = useRemoveDelegate(address);
  const showDelegate = useDelegater(address);

  const hasAccess = useIsAdmin(address, user ?? "");
  if (!org?.delegates || org.delegates.length === 0) return null;

  const getRows = () => {
    const rows = ["", "delegates"];
    return hasAccess ? rows.concat(["Revoke"]) : rows;
  };

  return (
    <div className="container mx-auto pb-5 pt-2 mt-10 shadow-2xl">
      {hasAccess && (
        <div className="flex justify-end px-5">
          <button
            onClick={showDelegate}
            className="flex items-center justify-evenly outline-none border rounded-3xl w-12 px-2 p-1 border-curious-blue"
          >
            <span className="block capitalize text-sm">new</span>{" "}
            <AiOutlinePlus className="block" />{" "}
          </button>
        </div>
      )}
      <Table>
        <THead rows={getRows()} />
        <TBody className="">
          {org.delegates.map((delegate, idx) => (
            <Row key={idx} className="border-none">
              <Cell className="flex justify-start p-2">
                <div className="w-10 h-10 relative">
                  <Image
                    src={resolveIpfsURL(org?.metadata?.image ?? "")}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={`${org?.metadata.name} image`}
                    className="rounded-full block"
                  />
                </div>
              </Cell>
              <Cell>
                <AddressOrEns address={delegate} />
              </Cell>
              {hasAccess && delegate !== org.admin && (
                <Cell className="p-0">
                  <Button
                    onClick={() => revoke(delegate)}
                    disabled={isLoading}
                    className={`bg-transparent bg-white bg-opacity-0`}
                  >
                    <RiCloseLine
                      className="hover:scale-150 duration-100"
                      color={isLoading ? "#8793A6" : "#f15156"}
                    />
                  </Button>
                </Cell>
              )}
            </Row>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
