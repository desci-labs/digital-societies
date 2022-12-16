import { queryIpfsURL } from "api";
import { AttestationMetadata } from "components/Transactors/types";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAttestations, setIsLoading } from "services/attestations/reducer";
import { Attestation } from "services/attestations/types";
import { THEGRAPH_API_ENDPOINT } from "thegraph/config";
import {
  QuerySocietiesArgs,
  Society,
  useGetDesocAttestationsQuery,
  GetDesocAttestationsQuery,
} from "thegraph/desoc/graphql";
import { thegraphApi } from ".";
export const defaultErrorMsg = "We encountered an error saving the metadata";

const api = thegraphApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocieties: builder.mutation<Society[], QuerySocietiesArgs>({
      query: () => {
        return {
          method: "POST",
          url: "",
          params: {},
        };
      },
      extraOptions: { maxRetries: 5 },
    }),
  }),
});

export const { useGetSocietiesMutation } = api;

export function useGetDesocBadges(id: string) {
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetDesocAttestationsQuery(
    { endpoint: THEGRAPH_API_ENDPOINT },
    { society: id },
    { staleTime: 1000 }
  );

  const parseData = useCallback(
    async (
      attestation: GetDesocAttestationsQuery["attestations"][number]
    ): Promise<Attestation> => {
      const metadata = (await queryIpfsURL(
        attestation.metadataUri
      )) as AttestationMetadata;
      return {
        id: attestation.id,
        metadata,
        createdAt: attestation.createdAt,
        updatedAt: attestation.updatedAt,
        society: id,
        metadataUri: attestation.metadataUri,
      };
    },
    [id]
  );

  const processData = useCallback(
    async (data: GetDesocAttestationsQuery["attestations"]) => {
      const results = await Promise.all(data.map(parseData));
      dispatch(setAttestations({ [id]: results }));
      dispatch(setIsLoading(false));
    },
    [dispatch, id, parseData]
  );

  useEffect(() => {
    if (isLoading || isError || !data?.attestations) return;
    processData(data.attestations);
  }, [data, isLoading, isError, processData]);
}
