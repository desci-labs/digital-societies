import { useCallback, useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { queryIpfsHash } from "api";
import { Contract, ethers } from "ethers";
import { asyncMap, getCIDStringFromBytes } from "helper";
import useBlockNumber from "hooks/useBlockNumber";
import { useFactoryContract, useSBTContractFactory } from "hooks/useContract";
import { useGetOrgs, useSetOrgs } from "./FactoryContext";
import { DEFAULT_ADMIN_ROLE, DELEGATE_ROLE } from "constants/roles";

export default function FactoryUpdater() {
  const { setOrgs } = useSetOrgs();
  const { data: orgs } = useGetOrgs();
  const contract = useFactoryContract();
  const block = useBlockNumber();
  const provider = useProvider();
  const getContract = useSBTContractFactory();
  const [lastUpdated, setLastUpdated] = useState(0);

  async function getDelegates(contract: Contract) {
    const roleCount = await contract.getRoleMemberCount(DELEGATE_ROLE);
    const members = [];
    for (let i = 0; i < roleCount; i++) {
      const member = await contract.getRoleMember(DELEGATE_ROLE, i);
      members.push(member)
    }
    return members;
  }

  async function getContractInfofromEvent(event: ethers.Event) {
    const block = await provider.getBlock(event.blockNumber);
    const owner = event.args?.owner ?? event.args?.[0];
    const contract = getContract(event.args?.token ?? event.args?.[1]);
    const admin = await contract.getRoleMember(DEFAULT_ADMIN_ROLE, 0);
    const delegates = await getDelegates(contract);
    let cid = await contract.contractURI();
    cid = await getCIDStringFromBytes(cid);
    const metadata = await queryIpfsHash(cid)
    return { metadata, owner, cid, dateCreated: block.timestamp * 1000, address: contract.address, admin, delegates }
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
      block && (lastUpdated === 0 || block - lastUpdated > 5)
    ) {
      getFactoryTokens();
    }
  }, [block, lastUpdated, contract, getFactoryTokens]);
  return null;
}
