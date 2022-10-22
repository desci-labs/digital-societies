import Loader from "components/Loader";
import useCredenter from "components/Transactors/Attestation/useCredenter";
import {
  useGetAttestationState,
} from "services/attestations/hooks";
import {
  useIsAdminOrDelegate,
  useGetOrg,
} from "services/orgs/hooks";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../Button/Index";
import { MetadataCard } from "./MetadataCard";
import { Org, PendingOrg } from "services/orgs/types";
import { useMemo } from "react";

export function AttestationList({ address, showUpdater }: { address: string, showUpdater?: boolean }) {
  const org = useGetOrg(address);
  const { isLoading, attestations: data } = useGetAttestationState();
  const attestations = data[address];
  const noData = useMemo(() => !attestations || attestations.length === 0, [attestations])
  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto pt-2 mt-10 px-2 lg:px-0">
      <div className="flex w-full justify-between">
        <h1 className="text-left heading-2">Attestations</h1>
        {showUpdater && <AttestationUpdater desoc={org!} />}
      </div>
      {noData && <p className="font-normal text-sm mt-2">This Desoc has no attestations</p>}
      {attestations && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-y-10 md:place-items-start mt-5 mb-10">
          {attestations.map((attestation, idx) => (
            <MetadataCard
              key={idx}
              metadata={attestation.metadata}
              verified={org?.verified}
              link={`/attestations/${attestation.id}?address=${attestation.address}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}


function AttestationUpdater(props: { desoc: Org | PendingOrg }) {
  const showCredenter = useCredenter(props.desoc);
  const hasAccess = useIsAdminOrDelegate(props.desoc.address);
  
  return <>
    {hasAccess && (
      <Button
        onClick={showCredenter}
        className="flex items-center justify-evenly font-bold outline-none px-2 p-1 bg-primary-hover"
      >
        <AiOutlinePlus color="black" className="block" />{" "}
        <span className="block capitalize text-sm">new</span>{" "}
      </Button>
    )}</>
}