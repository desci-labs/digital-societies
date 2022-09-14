import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { queryIpfsHash } from "api";
import { useGetOrgs } from "context/Factory/FactoryContext";
import { asyncMap, getCIDStringFromBytes } from "helper";
import useBlockNumber from "hooks/useBlockNumber";
import { useSBTContractFactory } from "hooks/useContract";
import { useProvider } from "wagmi";
import { Credential, CredentialMap, useSetCredentials } from "./CredentialContext";

export default function CredentialUpdater() {
  const { setCredentials } = useSetCredentials();
  const { data: orgs } = useGetOrgs();
  const block = useBlockNumber();
  const provider = useProvider();
  const getContract = useSBTContractFactory();
  const [lastUpdated, setLastUpdated] = useState(0);

  async function getCrendentialInfofromEvent(event: ethers.Event) {
    const block = await provider.getBlock(event.blockNumber);
    const mintedBy = event.args?.createdBy ?? event.args?.[1];
    const id = event.args?.tokenType ?? event.args?.[0];
    const contract = getContract(event.address);
    let cid = await contract.typeURI(id);
    cid = await getCIDStringFromBytes(cid);
    const metadata = await queryIpfsHash(cid)
    return { id, metadata, mintedBy, cid, dateCreated: block.timestamp * 1000, address: contract.address, pending: !metadata }
  }

  async function transformEventsToCrendentials(events: ethers.Event[]) {
    const address = events[0]?.address
    if (!events.length) return null;
    const credentials = await asyncMap<Credential, ethers.Event>(events, getCrendentialInfofromEvent);
    return { address, data: credentials };
  }

  const getFactoryTokens = useCallback(
    async () => {
      if (!block) return;

      if (orgs.length === 0) return;
      const contracts = orgs.map(org => {
        return getContract(org.address);
      })
      try {
        const filters = contracts.map(contract => contract.filters.TypeCreated());
        const events = await Promise.all(filters.map((filter, i) => contracts[i].queryFilter(filter)));
        const results = await Promise.all(events.map(transformEventsToCrendentials));
  
        const credentials = results.filter(Boolean).reduce((all, credential) => {
          if (!credential) return all;
          all[credential.address] = credential.data;
          return all;
        }, {} as CredentialMap)
        
        setCredentials(credentials);
        setLastUpdated(block);
      } catch (e) {
        console.log("Error: ", e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [block, setCredentials, lastUpdated]
  );

  useEffect(() => {
    if (
      block && (lastUpdated === 0 || block - lastUpdated > 5)
    ) {
      getFactoryTokens();
    }
  }, [block, lastUpdated, getFactoryTokens]);

  return null;
}
