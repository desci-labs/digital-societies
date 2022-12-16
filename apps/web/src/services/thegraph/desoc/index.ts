import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.THEGRAPH_API_ENDPOINT,
});

const baseQueryWithRetry = retry(baseQuery, {
  maxRetries: 0 /* current default for all apis */,
});

export const thegraphApi = createApi({
  reducerPath: "subgraphApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Societies"],
  // tagTypes: [tags.societies, tags.attestations],
  endpoints: () => ({}),
});
