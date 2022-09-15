import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useGetOrgs } from "context/Factory/FactoryContext";
import { asyncMap } from "helper";
import useBlockNumber from "hooks/useBlockNumber";
import { useSBTContractFactory } from "hooks/useContract";
import { useProvider } from "wagmi";
import { useSetCredentials } from "./CredentialContext";

export type CredentialToken = {
  org: string;
  tokenId: number;
  credential: number;
  dateIssued: number;
  issuer: string;
  owner: string;
};
export type CredentialToTokenMap = Record<string, CredentialToken[]>;

export default function TokenUpdater() {
  const { setTokens } = useSetCredentials();
  const { data: orgs } = useGetOrgs();
  const block = useBlockNumber();
  const provider = useProvider();
  const getContract = useSBTContractFactory();
  const [lastUpdated, setLastUpdated] = useState(0);

  async function getTokenInfofromEvent(
    event: ethers.Event
  ): Promise<CredentialToken | null> {
    const contract = getContract(event.address);
    try {
      const block = await provider.getBlock(event.blockNumber);
      const issuer = event.args?.mintedBy ?? event.args?.[0];
      const owner = event.args?.to ?? event.args?.[1];
      const tokenId =
        event.args?.tokenId.toString() ?? event.args?.[2].toString();

      // check validity of the token
      await contract.ownerOf(tokenId);

      const credential = event.args?.tokenType ?? event.args?.[3];
      return {
        org: event.address,
        tokenId,
        owner,
        issuer,
        credential,
        dateIssued: block.timestamp * 1000,
      };
    } catch (e) {
      return null;
    }
  }

  async function transformEventsToTokens(events: ethers.Event[]) {
    const address = events[0]?.address;
    if (!events.length) return null;
    const tokens = await asyncMap<CredentialToken, ethers.Event>(
      events,
      getTokenInfofromEvent
    );
    return { address, data: tokens.filter(Boolean) };
  }

  const indexCredentialTokens = useCallback(
    async () => {
      if (!block) return;

      if (orgs.length === 0) return;
      const contracts = orgs.map((org) => {
        return getContract(org.address);
      });

      const filters = contracts.map((contract) => contract.filters.Mint());
      const events = await Promise.all(
        filters.map((filter, i) => contracts[i].queryFilter(filter))
      );
      const results = await Promise.all(events.map(transformEventsToTokens));
      const tokens = results.filter(Boolean).reduce((all, token) => {
        if (!token) return all;
        all[token.address] = token.data;
        return all;
      }, {} as CredentialToTokenMap);

      setTokens(tokens);
      setLastUpdated(block);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [block, setTokens, lastUpdated]
  );

  useEffect(() => {
    if (block && (lastUpdated === 0 || block - lastUpdated > 5)) {
      indexCredentialTokens();
    }
  }, [block, lastUpdated, indexCredentialTokens]);
  return null;
}
