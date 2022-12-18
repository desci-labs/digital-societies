/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetOrg } from "services/orgs/hooks";
import useRouterAddress from "hooks/useRouterAddress";
import {
  useDelegateTokens,
  useGetDesocBadges,
  useGetSbtTokens,
} from "services/thegraph/desoc/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function TokenUpdater() {
  const router = useRouter();
  const [{ address, id }, setRouterQuery] = useState({ address: "", id: "" });
  const org = useGetOrg(address);

  // query subgraph
  useDelegateTokens(org);
  useGetDesocBadges(address);
  useGetSbtTokens(id);

  useEffect(() => {
    if (router.isReady) {
      const { id, address } = router.query;
      setRouterQuery({
        id: id as string,
        address: address as string,
      });
    }
  }, [router.isReady, router.query]);

  return null;
}
