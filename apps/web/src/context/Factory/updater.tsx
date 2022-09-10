import { queryIpfsHash } from "api";
import { ethers } from "ethers";
import { getCIDStringFromBytes } from "helper";
import useBlockNumber from "hooks/useBlockNumber";
import { useFactoryContract, useSBTContractFactory } from "hooks/useContract";
import { useCallback, useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { useGetOrgs, useSetOrgs } from "./FactoryContext";

export default function FactoryUpdater() {
  const { setOrgs } = useSetOrgs();
  const { data: orgs } = useGetOrgs();
  const contract = useFactoryContract();
  const block = useBlockNumber();
  const provider = useProvider();
  const getContract = useSBTContractFactory();
  const [lastUpdated, setLastUpdated] = useState(0);

  async function getContractInfofromEvent(event: ethers.Event) {
    const block = await provider.getBlock(event.blockNumber);
    const owner = event.args?.owner ?? event.args?.[0];
    const contract = getContract(event.args?.token ?? event.args?.[1]);
    let cid = await contract.contractURI();
    cid = await getCIDStringFromBytes(cid);
    const metadata = await queryIpfsHash(cid)
    return { metadata, owner, cid, dateCreated: block.timestamp * 1000, address: contract.address }
  }

  const getFactoryTokens = useCallback(
    async () => {
      if (!block || !contract) return;

      if (block - lastUpdated < 10) return;
      const filter = contract.filters.TokenCreated();
      const events = await contract.queryFilter(filter);
      const results = await Promise.all(events.map(getContractInfofromEvent));
      if (results.length === orgs.length)  {
        return setLastUpdated(block);
      };
      setOrgs(results);
      setLastUpdated(block);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [block, setOrgs, contract, lastUpdated]
  );

  useEffect(() => {
    if (
      contract &&
      block && (lastUpdated === 0 || block - lastUpdated > 10)
    ) {
      getFactoryTokens();
    }
  }, [block, lastUpdated, contract, getFactoryTokens]);
  return null;
}
