import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { asyncMap } from "helper";
import useBlockNumber from "hooks/useBlockNumber";
import { useSBTContractFactory } from "hooks/useContract";
import { useProvider } from "wagmi";
import { useGetOrgs } from "services/orgs/hooks";
import { CredentialToken, CredentialToTokenMap } from "./types";
import { setTokens } from "./credentialSlice";
import { FACTORY_DEPLOY_BLOCK } from "constants/web3";

export default function TokenUpdater() {
  const dispatch = useDispatch();
  const orgs = useGetOrgs();
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
        event.args?.tokenId.toString() ?? event.args?.[2].toNumber();

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
      const lastQuery = await provider.getBlockNumber();
      const filters = contracts.map((contract) => contract.filters.Mint());
      const events = await Promise.all(
        filters.map((filter, i) =>
          contracts[i].queryFilter(
            filter,
            lastUpdated ? lastUpdated - 10 : FACTORY_DEPLOY_BLOCK
          )
        )
      );
      const results = await Promise.all(events.map(transformEventsToTokens));
      const tokens = results.filter(Boolean).reduce((all, token) => {
        if (!token) return all;
        all[token.address] = token.data;
        return all;
      }, {} as CredentialToTokenMap);

      dispatch(setTokens(tokens));
      setLastUpdated(lastQuery);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [block, lastUpdated]
  );

  useEffect(() => {
    if (block && (lastUpdated === 0 || block - lastUpdated > 5)) {
      indexCredentialTokens();
    }
  }, [block, lastUpdated, indexCredentialTokens]);
  return null;
}
