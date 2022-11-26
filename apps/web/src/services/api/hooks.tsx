import { useMemo } from "react";
import { useGetSocietiesQuery } from "./admin";
import { useGetAccountMetadataQuery } from "./offchainMeta";

export function useAccountMetadata(org: string, owner: string) {
  const { data, isLoading } = useGetAccountMetadataQuery(
    { org },
    { skip: !org }
  );
  return useMemo(
    () => ({
      isLoading,
      data: data && data.find((meta) => meta.owner === owner),
    }),
    [data, isLoading, owner]
  );
}

export function useGetOrgSetting(address: string) {
  const { data, isLoading } = useGetSocietiesQuery(
    { address },
    { skip: !address }
  );
  return useMemo(
    () => ({
      isLoading,
      data: data && data.find((meta) => meta.address === address),
    }),
    [data, isLoading, address]
  );
}
