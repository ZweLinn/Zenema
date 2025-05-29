
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creditsSeriesApiSlice = createApi({
    reducerPath: "creditsSeriesApi",
    tagTypes: ["CreditSeriesApi"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL ,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getCreditsSeriesDetail: build.query({
            query: (id) => `/3/person/${id}/tv_credits`,
            providesTags: ["CreditSeriesApi"],
        }),
    }),
})



export const { useGetCreditsSeriesDetailQuery } = creditsSeriesApiSlice;