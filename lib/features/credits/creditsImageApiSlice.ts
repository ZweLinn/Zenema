
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creditsImageApiSlice = createApi({
    reducerPath: "creditsImageApi",
    tagTypes: ["CreditImageApi"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL ,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getCreditsImage: build.query({
            query: (id) => `/3/person/${id}/images`,
            providesTags: ["CreditImageApi"],
        }),
    }),
})



export const { useGetCreditsImageQuery } = creditsImageApiSlice;