
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creditsApiSlice = createApi({
    reducerPath: "creditsApi",
    tagTypes: ["CreditsApi"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL ,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getCredits: build.query({
            query: (id) => `/3/movie/${id}/credits`,
            providesTags: ["CreditsApi"],
        }),
    }),
})



export const { useGetCreditsQuery } = creditsApiSlice;