import { queryIpfsURL } from "api";
import { AttestationMetadata } from "components/Transactors/types";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setAttestations,
  setIsLoading,
  setTokens,
} from "services/attestations/reducer";
import { Attestation, AttestationToken } from "services/attestations/types";
import { addDelegates } from "services/orgs/reducer";
import { Org, PendingOrg } from "services/orgs/types";
import {
  QuerySocietiesArgs,
  Society,
  useGetDesocAttestationsQuery,
  GetDesocAttestationsQuery,
  useGetAttestationTokensQuery,
  GetAttestationTokensQuery,
  useGetDelegateTokensQuery,
  GetDelegateTokensQuery,
} from "thegraph/desoc/graphql";
import { chainId, useNetwork } from "wagmi";
import { thegraphApi } from ".";
import { CHAIN_SUBGRAPH_URL } from "../urls";
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

export function useGetDesocBadges(id?: string) {
  const dispatch = useDispatch();
  const { chain } = useNetwork();

  const { data, isLoading, isError } = useGetDesocAttestationsQuery(
    { endpoint: CHAIN_SUBGRAPH_URL[chain?.id ?? chainId.goerli] },
    { society: id ?? "" }
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
        createdAt: Number(attestation.createdAt ?? 0) * 1000,
        updatedAt: Number(attestation.updatedAt ?? 0) * 1000,
        society: id ?? "",
        metadataUri: attestation.metadataUri,
      };
    },
    [id]
  );

  const processData = useCallback(
    async (id: string, data: GetDesocAttestationsQuery["attestations"]) => {
      const results = await Promise.all(data.map(parseData));
      dispatch(setAttestations({ [id]: results }));
      dispatch(setIsLoading(false));
    },
    [dispatch, parseData]
  );

  useEffect(() => {
    if (!id || isLoading || isError || !data?.attestations) return;
    processData(id, data.attestations);
  }, [data, isLoading, isError, processData, id]);
}

export function useGetSbtTokens(attestationId: string) {
  const dispatch = useDispatch();
  const { chain } = useNetwork();

  const { data, isLoading, isError } = useGetAttestationTokensQuery(
    { endpoint: CHAIN_SUBGRAPH_URL[chain?.id ?? chainId.goerli] },
    { attestation: attestationId }
  );

  const parseData = useCallback(
    async (
      token: GetAttestationTokensQuery["tokens"][number]
    ): Promise<AttestationToken> => {
      return {
        active: token?.active ?? false,
        owner: token.owner.id,
        tokenId: +token.tokenId,
        society: token.society.id,
        issuedBy: token.issuedBy,
        issuedAt: Number(token.issuedAt ?? 0) * 1000,
        revokedAt: Number(token?.revokedAt ?? 0) * 1000,
        revokedBy: token.revokedBy,
        attestation: attestationId,
      };
    },
    [attestationId]
  );

  const processData = useCallback(
    async (data: GetAttestationTokensQuery["tokens"]) => {
      const results = await Promise.all(data.map(parseData));
      if (results.length === 0) return;
      dispatch(setTokens({ [results[0].society]: results }));
      dispatch(setIsLoading(false));
    },
    [dispatch, parseData]
  );

  useEffect(() => {
    if (isLoading || isError || !data?.tokens) return;
    processData(data.tokens);
  }, [data, isLoading, isError, processData]);
}

export function useDelegateTokens(society?: Org | PendingOrg) {
  const dispatch = useDispatch();
  const { chain } = useNetwork();

  const { data, isLoading, isError } = useGetDelegateTokensQuery(
    { endpoint: CHAIN_SUBGRAPH_URL[chain?.id ?? chainId.goerli] },
    { attestation: society?.delegateRoleId }
  );

  const parseData = useCallback(
    async (
      token: GetDelegateTokensQuery["tokens"][number]
    ): Promise<Partial<AttestationToken>> => {
      return {
        active: token?.active ?? false,
        owner: token.owner.id,
        tokenId: +token.tokenId,
      };
    },
    []
  );

  const processData = useCallback(
    async (address: string, data: GetDelegateTokensQuery["tokens"]) => {
      const results = await Promise.all(data.map(parseData));
      const validTokens = results
        .filter((t) => !!t && t.active === true)
        .map((t) => t.owner);
      if (validTokens.length === 0) return;
      dispatch(
        addDelegates({
          org: address,
          delegates: validTokens as string[],
        })
      );
      dispatch(setIsLoading(false));
    },
    [dispatch, parseData]
  );

  useEffect(() => {
    if (!society || isLoading || isError || !data?.tokens) return;
    processData(society.address, data.tokens);
  }, [data, isLoading, isError, processData, society]);
}
