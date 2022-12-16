import { useCallback, useEffect } from "react";
import { queryIpfsURL } from "api";
import { useDispatch } from "react-redux";
import { setIsLoading, setOrgs } from "./reducer";
import { Org } from "./types";
import { Metadata } from "components/Transactors/types";
import {
  GetSocietiesQuery,
  useGetSocietiesQuery,
} from "thegraph/desoc/graphql";
import { THEGRAPH_API_ENDPOINT } from "thegraph/config";

export default function FactoryUpdater() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSocietiesQuery(
    {
      endpoint: THEGRAPH_API_ENDPOINT,
    },
    {},
    { staleTime: 6000 }
  );

  async function parseData(
    society: GetSocietiesQuery["societies"][number]
  ): Promise<Org | null> {
    const metadata = (await queryIpfsURL(society.metadataUri)) as Metadata;
    return {
      metadata,
      admin: society.admin,
      // delegates: [],
      delegateRoleId: society.delegateRoleId ?? "",
      verified: society.verified ?? false,
      address: society.id,
      dateCreated: 0,
      metadataUri: society.metadataUri,
    };
  }

  const processData = useCallback(
    async () => {
      try {
        if (!data?.societies) return;
        const results = await Promise.all(data?.societies.map(parseData));
        const final = results.filter(Boolean) as Org[];
        if (results.length > 0) {
          dispatch(setOrgs(final));
        }
        dispatch(setIsLoading(false));
      } catch (e) {
        console.log("Error: ", e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, isLoading]
  );

  useEffect(() => {
    if (isLoading || !data?.societies) return;
    processData();
  }, [isLoading, data, processData]);
  return null;
}
