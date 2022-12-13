import { useCallback, useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { queryIpfsURL } from "api";
import { ethers } from "ethers";
import useBlockNumber from "hooks/useBlockNumber";
import { useFactoryContract, useTokenContract } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { setIsLoading, setOrgs } from "./reducer";
import { Org } from "./types";
import { Metadata } from "components/Transactors/types";
import { useGetOrgs } from "./hooks";
import { FACTORY_DEPLOY_BLOCK } from "constants/web3";

export default function FactoryUpdater() {
  const dispatch = useDispatch();
  const orgs = useGetOrgs();

  const factoryContract = useFactoryContract();
  const block = useBlockNumber();

  const provider = useProvider();
  const getContract = useTokenContract();
  const [lastUpdated, setLastUpdated] = useState(0);

  // async function getDelegates(contract: Contract): Promise<string[]> {
  //   const roleCount = await contract.getRoleMemberCount(DELEGATE_ROLE);
  //   const members = [];
  //   for (let i = 0; i < roleCount; i++) {
  //     const member = await contract.getRoleMember(DELEGATE_ROLE, i);
  //     members.push(member);
  //   }
  //   return members;
  // }

  async function getContractInfofromEvent(
    event: ethers.Event
  ): Promise<Org | null> {
    const block = await provider.getBlock(event.blockNumber);
    const contract = getContract(event.args?.token ?? event.args?.[1]);
    if (!contract) return null;
    const admin = await contract.owner();
    // const delegates = await getDelegates(contract);
    const cid = await contract.contractURI();
    const metadata = (await queryIpfsURL(cid)) as Metadata;
    const verified =
      (await factoryContract?.verified(contract.address)) ?? false;
    return {
      metadata,
      cid,
      admin,
      delegates: [],
      verified,
      address: contract.address,
      dateCreated: block.timestamp * 1000,
    };
  }

  const getFactoryTokens = useCallback(
    async () => {
      if (!block || !factoryContract) return;
      if (block - lastUpdated < 5) return;

      try {
        const lastQuery = await provider.getBlockNumber();
        const filter = factoryContract.filters.Deployed();
        const events = await factoryContract.queryFilter(
          filter,
          lastUpdated ? lastUpdated - 10 : FACTORY_DEPLOY_BLOCK
        );
        const results = await Promise.all(events.map(getContractInfofromEvent));
        const final = results.filter(Boolean) as Org[];
        if (results.length > 0) {
          dispatch(setOrgs(final));
        }
        dispatch(setIsLoading(false));
        setLastUpdated(lastQuery);
      } catch (e) {
        console.log("Error: ", e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [block, factoryContract, dispatch, lastUpdated]
  );

  useEffect(() => {
    if (
      factoryContract &&
      block &&
      (orgs.length === 0 || lastUpdated === 0 || block - lastUpdated > 5)
    ) {
      getFactoryTokens();
    }
  }, [
    block,
    lastUpdated,
    factoryContract,
    getFactoryTokens,
    provider,
    orgs.length,
  ]);
  return null;
}
