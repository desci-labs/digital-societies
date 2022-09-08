import { queryIpfsHash } from "api";
import { ethers } from "ethers";
import { getCIDStringFromBytes } from "helper";
import { useFactoryContract, useSBTContractFactory } from "hooks/useContract";
import useDebouncer from "hooks/useDebouncer";
import { useCallback, useEffect, useRef } from "react";
import { useBlockNumber, useProvider } from "wagmi";
import { useSetOrgs } from "./FactoryContext";

export default function FactoryUpdater() {
  const { setOrgs } = useSetOrgs();
  const contract = useFactoryContract();
  const { data: blockNumber } = useBlockNumber();
  const provider = useProvider();
  const lastFetchedBlockRef = useRef<number>(0);
  const [block] = useDebouncer(blockNumber ?? 0, 1000);
  const getContract = useSBTContractFactory();

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
      if (!block) return;
      if (block - lastFetchedBlockRef.current < 10) return;
      const filter = contract.filters.TokenCreated();
      const events = await contract.queryFilter(filter);
      const results = await Promise.all(events.map(getContractInfofromEvent));
      setOrgs(results);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [block]
  );

  useEffect(() => {
    if (
      contract &&
      block &&
      (!lastFetchedBlockRef.current || block - lastFetchedBlockRef.current > 10)
    ) {
      getFactoryTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block, contract]);
  return null;
}
