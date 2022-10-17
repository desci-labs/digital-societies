import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { asyncMap } from "helper";
import useBlockNumber from "hooks/useBlockNumber";
import { useTokenContract } from "hooks/useContract";
import { useProvider } from "wagmi";
import { useGetOrgs } from "services/orgs/hooks";
import { AttestationToken, AttestationToTokenMap } from "./types";
import { setTokens } from "./attestationSlice";
import { FACTORY_DEPLOY_BLOCK } from "constants/web3";

export default function TokenUpdater() {
  const dispatch = useDispatch();
  const orgs = useGetOrgs();
  const block = useBlockNumber();
  const provider = useProvider();
  const getContract = useTokenContract();
  const [lastUpdated, setLastUpdated] = useState(0);

  async function getTokenInfofromEvent(
    event: ethers.Event
  ): Promise<AttestationToken | null> {
    const contract = getContract(event.address);
    
    try {
      const block = await provider.getBlock(event.blockNumber);
      const issuer = event.args?.mintedBy ?? event.args?.[0];
      const owner = event.args?.to ?? event.args?.[1];
      const tokenId =
        event.args?.tokenId.toString() ?? event.args?.[2].toNumber();

      // check validity of the token
      await contract?.ownerOf(tokenId);

      const attestation = event.args?.tokenType ?? event.args?.[3];
      return {
        org: event.address,
        tokenId,
        owner,
        issuer,
        attestation,
        dateIssued: block.timestamp * 1000,
      };
    } catch (e) {
      return null;
    }
  }

  async function transformEventsToTokens(events: ethers.Event[]) {
    const address = events[0]?.address;
    if (!events.length) return null;
    const tokens = await asyncMap<AttestationToken, ethers.Event>(
      events,
      getTokenInfofromEvent
    );
    return { address, data: tokens.filter(Boolean) };
  }

  const indexAttestationTokens = useCallback(
    async () => {
      if (!block) return;

      if (orgs.length === 0) return;
      const contracts = orgs.map((org) => {
        return getContract(org.address);
      }) as ethers.Contract[];
      
      const lastQuery = await provider.getBlockNumber();
      const filters = contracts.map((contract) => contract?.filters.Mint());
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
      }, {} as AttestationToTokenMap);
      dispatch(setTokens(tokens));
      setLastUpdated(lastQuery);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [block, lastUpdated]
  );

  useEffect(() => {
    if (block && (lastUpdated === 0 || block - lastUpdated > 5)) {
      indexAttestationTokens();
    }
  }, [block, lastUpdated, indexAttestationTokens]);
  return null;
}
