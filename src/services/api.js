import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://api.poki.com';
const SITE_ID = 3;
const DEVICE = 'desktop';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getHomepage: builder.query({
            query: () => `/list/game/HOME?site=${SITE_ID}&device=${DEVICE}&country=US&limit=1`,
            transformResponse: responseData => {
                const { content } = responseData;
                return {
                    games: content,
                };
            },
        }),
        getGameBySlug: builder.query({
            query: ({ slug }) => `/game/${slug}?site=${SITE_ID}&device=${DEVICE}&country=NL`,
        }),
    }),
});

export const { useGetHomepageQuery, useGetGameBySlugQuery } = api;
