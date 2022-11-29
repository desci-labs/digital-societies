import { api } from ".";
import { tags } from "./tags";
import {
  ApiResponse,
  QueryParams,
  SocietyDataInsert,
  SocietyDataRow,
  SocietyDataUpdate,
} from "./types";

export const defaultErrorMsg = "We encountered an error saving the data";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSocieties: builder.query<SocietyDataRow[] | SocietyDataRow, QueryParams>(
      {
        query: ({ address }) => {
          return {
            method: "GET",
            url: `admin/society`,
            params: {
              address,
            },
          };
        },
        extraOptions: { maxRetries: 5 },
        providesTags: [tags.society],
      }
    ),
    insertSociety: builder.mutation<ApiResponse, SocietyDataInsert>({
      query: (data) => {
        return {
          method: "POST",
          body: data,
          url: "admin/society",
        };
      },
      invalidatesTags: [tags.society],
    }),
    updateSociety: builder.mutation<ApiResponse, SocietyDataUpdate>({
      query: (data) => {
        return {
          method: "PUT",
          body: data,
          url: "admin/society",
        };
      },
      invalidatesTags: [tags.society],
    }),
  }),
});

export const {
  useGetSocietiesQuery,
  useInsertSocietyMutation,
  useUpdateSocietyMutation,
} = adminApi;
