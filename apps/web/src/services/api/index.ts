import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { tags } from './tags'

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 /* current default for all apis */ })

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  tagTypes: [tags.meta],
  endpoints: () => ({}),
})
