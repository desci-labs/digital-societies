/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from "react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { useProvider } from "wagmi";
import { queryIpfsURL } from "api";
import { asyncMap } from "helper";
import useBlockNumber from "hooks/useBlockNumber";
import { useTokenContract } from "hooks/useContract";
import { useGetOrgs } from "services/orgs/hooks";
import { Attestation } from "./types";
import { setIsLoading } from "./reducer";
import { AttestationMetadata } from "components/Transactors/types";
import { Desoc } from "@desoc/contracts";

export default function AttestationUpdater() {
  const dispatch = useDispatch();
  const orgs = useGetOrgs();
  const block = useBlockNumber();
  const provider = useProvider();
  const getContract = useTokenContract();
  const [lastUpdated, setLastUpdated] = useState(0);

  // async function getCrendentialInfofromEvent(
  //   event: ethers.Event
  // ): Promise<Attestation> {
  //   const block = await provider.getBlock(event.blockNumber);
  //   const mintedBy = event.args?.createdBy ?? event.args?.[1];
  //   const id = event.args?.tokenType ?? event.args?.[0];
  //   const contract = getContract(event.address) as Desoc;
  //   const cid = await contract.attestationMeta(id);
  //   const metadata = (await queryIpfsURL(cid)) as AttestationMetadata;
  //   return {
  //     id,
  //     metadata,
  //     mintedBy,
  //     cid,
  //     dateCreated: block.timestamp * 1000,
  //     address: contract.address,
  //   };
  // }

  // async function transformEventsToCrendentials(events: ethers.Event[]) {
  //   const address = events[0]?.address;
  //   if (!events.length) return null;
  //   const credentials = await asyncMap<Attestation, ethers.Event>(
  //     events,
  //     getCrendentialInfofromEvent
  //   );
  //   return { address, data: credentials };
  // }

  const getCredentials = useCallback(async () => {
    if (!block) return;

    if (orgs.length === 0) return;
    const contracts = orgs.map((org) => {
      return getContract(org.address);
    }) as Desoc[];
    try {
      const lastQuery = await provider.getBlockNumber();
      // const filters = contracts.map((contract) =>
      //   contract.filters.TypeCreated()
      // );
      // const events = await Promise.all(
      //   filters.map((filter, i) =>
      //     contracts[i].queryFilter(
      //       filter,
      //       lastUpdated ? lastUpdated - 10 : FACTORY_DEPLOY_BLOCK
      //     )
      //   )
      // );
      // const results = await Promise.all(
      //   events.map(transformEventsToCrendentials)
      // );

      // const credentials = results.filter(Boolean).reduce((all, credential) => {
      //   if (!credential) return all;
      //   all[credential.address] = credential.data;
      //   return all;
      // }, {} as AttestationMap);

      // dispatch(setAttestations(credentials));
      dispatch(setIsLoading(false));
      setLastUpdated(lastQuery);
    } catch (e) {
      console.log("Error: ", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block, lastUpdated]);

  // useEffect(() => {
  //   if (block && (lastUpdated === 0 || block - lastUpdated > 10)) {
  //     getCredentials();
  //   }
  // }, [block, lastUpdated, getCredentials]);

  return null;
}
