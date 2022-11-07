import { useMemo } from "react";
import { useGetAccountMetadataQuery } from "./associatedMetadata";

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
