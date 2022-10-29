import { api } from ".";
import { tags } from "./tags";
import { AssociatedDataInsert } from "./types";

type ApiResponse = { status: string; message?: string }
type QueryParams = { org?: string; owner: string }

const associatedMetadataApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccountMetadata: builder.query<any, QueryParams>({
      query: ({ owner, org }) => "",
      providesTags: [tags.meta]
    }),
    saveMetadata: builder.mutation<ApiResponse, AssociatedDataInsert>({
      query: (data) => {
        return {
          method: "post",
          body: data,
          url: "saveAssociatedMeta"
        }
      },
      invalidatesTags: [tags.meta]
    }),
  })
});

export const { useGetAccountMetadataQuery, useSaveMetadataMutation } = associatedMetadataApi;