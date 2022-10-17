import { useCallback, useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { queryIpfsHash } from "api";
import { Contract, ethers } from "ethers";
import { asyncMap, getCIDStringFromBytes } from "helper";
import useBlockNumber from "hooks/useBlockNumber";
import { useFactoryContract, useTokenContract } from "hooks/useContract";
import { DEFAULT_ADMIN_ROLE, DELEGATE_ROLE } from "constants/roles";
import { useDispatch } from "react-redux";
import { setIsLoading, setOrgs } from "./orgSlice";
import { Org, Revoked } from "./types";
import { Metadata } from "components/Transactors/types";
import { useGetOrgs } from "./hooks";
import { FACTORY_DEPLOY_BLOCK } from "constants/web3";

export default function FactoryUpdater() {
  const dispatch = useDispatch();
  const orgs = useGetOrgs();

  const managerContract = useFactoryContract();
  const block = useBlockNumber();

  const provider = useProvider();
  const getContract = useTokenContract();
  const [lastUpdated, setLastUpdated] = useState(0);

  async function getDelegates(contract: Contract): Promise<string[]> {
    const roleCount = await contract.getRoleMemberCount(DELEGATE_ROLE);
    const members = [];
    for (let i = 0; i < roleCount; i++) {
      const member = await contract.getRoleMember(DELEGATE_ROLE, i);
      members.push(member);
    }
    return members;
  }

  async function getRevocationHistory(contract: Contract): Promise<Revoked[]> {
    const filter = contract.filters.Revoked();
    const events = await contract.queryFilter(filter, FACTORY_DEPLOY_BLOCK);
    const revocations = await asyncMap<Revoked, ethers.Event>(
      events,
      async (event: ethers.Event) => {
        const block = await provider.getBlock(event.blockNumber);
        return {
          owner: event?.args?.revokedBy ?? event.args?.[0],
          revokedBy: event?.args?.owner ?? event.args?.[1],
          tokenId: event.args?.[2].toNumber(),
          timestamp: block.timestamp * 1000,
        };
      }
    );
    return revocations;
  }

  async function getContractInfofromEvent(event: ethers.Event): Promise<Org | null> {
    const block = await provider.getBlock(event.blockNumber);
    const contract = getContract(event.args?.token ?? event.args?.[1]);
    if (!contract) return null;
    const admin = await contract.getRoleMember(DEFAULT_ADMIN_ROLE, 0);
    const delegates = await getDelegates(contract);
    console.log('delegates', contract.address, delegates)
    let cid = await contract.contractURI();
    cid = await getCIDStringFromBytes(cid);
    const metadata = (await queryIpfsHash(cid)) as Metadata;
    // const revocations = await getRevocationHistory(contract);
    const verified = await managerContract?.verified(contract.address) ?? false;
    return {
      metadata,
      cid,
      admin,
      delegates,
      // revocations,
      verified,
      address: contract.address,
      dateCreated: block.timestamp * 1000,
    };
  }

  const getFactoryTokens = useCallback(
    async () => {
      if (!block || !managerContract) return;

      if (block - lastUpdated < 10) return;

      try {
        const lastQuery = await provider.getBlockNumber();
        const filter = managerContract.filters.TokenCreated();
        const events = await managerContract.queryFilter(
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
    [block, managerContract, dispatch, lastUpdated]
  );

  useEffect(() => {
    if (
      managerContract &&
      block &&
      (orgs.length === 0 || lastUpdated === 0 || block - lastUpdated > 10)
    ) {
      getFactoryTokens();
    }
  }, [block, lastUpdated, managerContract, getFactoryTokens, provider, orgs.length]);
  return null;
}
