import { QuerySocietiesArgs, Society } from "thegraph/desoc/graphql";
import { thegraphApi } from ".";
// import { gql } from "grapql-"
export const defaultErrorMsg = "We encountered an error saving the metadata";

// const societiesQuery = gql`
//   query ($fields: querySocietiesInput) {
//     societies {
//       admin
//       attestations {
//         metadataUri
//         id
//       }
//       delegateRoleId
//       id
//       metadataUri
//       verified
//     }
//   }
// `;

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
      // providesTags: [tags.meta],
    }),
  }),
});

export const { useGetSocietiesMutation } = api;
