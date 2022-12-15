import { useMemo } from "react";
import { useGetAdminSocietiesQuery } from "./admin";
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
  const { data, isLoading } = useGetAdminSocietiesQuery(
    { address },
    { skip: !address }
  );
  return useMemo(
    () => ({
      isLoading,
      data: Array.isArray(data)
        ? data.find((meta) => meta.address === address)
        : data,
    }),
    [data, isLoading, address]
  );
}
