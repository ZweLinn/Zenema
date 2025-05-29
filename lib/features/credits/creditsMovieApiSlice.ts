
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creditsMovieApiSlice = createApi({
    reducerPath: "creditsMovieApi",
    tagTypes: ["CreditMovieApi"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL ,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getCreditsMovieDetail: build.query({
            query: (id) => `/3/person/${id}/movie_credits`,
            providesTags: ["CreditMovieApi"],
        }),
    }),
})



export const { useGetCreditsMovieDetailQuery } = creditsMovieApiSlice;