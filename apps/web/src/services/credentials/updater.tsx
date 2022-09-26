import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { useProvider } from "wagmi";
import { queryIpfsHash } from "api";
import { asyncMap, getCIDStringFromBytes } from "helper";
import useBlockNumber from "hooks/useBlockNumber";
import { useTokenContract } from "hooks/useContract";
import { useGetOrgs } from "services/orgs/hooks";
import { Credential, CredentialMap } from "./types";
import { setCredentials, setIsLoading } from "./credentialSlice";
import { Metadata } from "components/Transactors/types";
import { FACTORY_DEPLOY_BLOCK } from "constants/web3";

export default function CredentialUpdater() {
  const dispatch = useDispatch();
  const orgs = useGetOrgs();
  const block = useBlockNumber();
  const provider = useProvider();
  const getContract = useTokenContract();
  const [lastUpdated, setLastUpdated] = useState(0);

  async function getCrendentialInfofromEvent(
    event: ethers.Event
  ): Promise<Credential> {
    const block = await provider.getBlock(event.blockNumber);
    const mintedBy = event.args?.createdBy ?? event.args?.[1];
    const id = event.args?.tokenType ?? event.args?.[0];
    const contract = getContract(event.address) as ethers.Contract;
    let cid = await contract.typeURI(id);
    cid = await getCIDStringFromBytes(cid);
    const metadata = (await queryIpfsHash(cid)) as Metadata;
    return {
      id,
      metadata,
      mintedBy,
      cid,
      dateCreated: block.timestamp * 1000,
      address: contract.address,
    };
  }

  async function transformEventsToCrendentials(events: ethers.Event[]) {
    const address = events[0]?.address;
    if (!events.length) return null;
    const credentials = await asyncMap<Credential, ethers.Event>(
      events,
      getCrendentialInfofromEvent
    );
    return { address, data: credentials };
  }

  const getCredentials = useCallback(
    async () => {
      if (!block) return;

      if (orgs.length === 0) return;
      const contracts = orgs.map((org) => {
        return getContract(org.address);
      }) as ethers.Contract[];
      try {
        const lastQuery = await provider.getBlockNumber();
        const filters = contracts.map((contract) =>
          contract.filters.TypeCreated()
        );
        const events = await Promise.all(
          filters.map((filter, i) =>
            contracts[i].queryFilter(
              filter,
              lastUpdated ? lastUpdated - 10 : FACTORY_DEPLOY_BLOCK
            )
          )
        );
        const results = await Promise.all(
          events.map(transformEventsToCrendentials)
        );

        const credentials = results
          .filter(Boolean)
          .reduce((all, credential) => {
            if (!credential) return all;
            all[credential.address] = credential.data;
            return all;
          }, {} as CredentialMap);

        dispatch(setCredentials(credentials));
        dispatch(setIsLoading(false));
        setLastUpdated(lastQuery);
      } catch (e) {
        console.log("Error: ", e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [block, lastUpdated]
  );

  useEffect(() => {
    if (block && (lastUpdated === 0 || block - lastUpdated > 10)) {
      getCredentials();
    }
  }, [block, lastUpdated, getCredentials]);

  return null;
}
