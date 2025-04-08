import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://api.poki.com';
const SITE_ID = 3;
const DEVICE = 'desktop';
const COUNTRY = 'NL';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getHomepage: builder.query({
            query: ({limit = 10}) => `/list/game/HOME?site=${SITE_ID}&device=${DEVICE}&country=${COUNTRY}&limit=${limit}`,
            transformResponse: responseData => {
                const { content } = responseData;
                return {
                    games: content,
                };
            },
        }),
        getGameBySlug: builder.query({
            query: ({ slug }) => `/game/${slug}?site=${SITE_ID}&device=${DEVICE}&country=${COUNTRY}`,
            transformResponse: responseData => {
                return  responseData;
            },
        }),
    }),
});

export const { useGetHomepageQuery, useGetGameBySlugQuery } = api;
