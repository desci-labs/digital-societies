import { api } from ".";
import { tags } from "./tags";
import { AssociatedDataInsert, AssociatedDataRow } from "./types";

type ApiResponse = { status: string; message?: string };
type QueryParams = { org?: string; owner?: string };
export const defaultErrorMsg = "We encountered an error saving the metadata";

const associatedMetadataApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccountMetadata: builder.query<AssociatedDataRow[], QueryParams>({
      query: ({ org }) => {
        return {
          method: "GET",
          url: `queryAssociatedData`,
          params: {
            org,
          },
        };
      },
      extraOptions: { maxRetries: 5 },
      providesTags: [tags.meta],
    }),
    saveMetadata: builder.mutation<ApiResponse, AssociatedDataInsert>({
      query: (data) => {
        return {
          method: "post",
          body: data,
          url: "saveAssociatedMeta",
        };
      },
      invalidatesTags: [tags.meta],
    }),
  }),
});

export const { useGetAccountMetadataQuery, useSaveMetadataMutation } =
  associatedMetadataApi;
