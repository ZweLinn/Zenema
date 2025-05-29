
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creditsDetailApiSlice = createApi({
    reducerPath: "creditsDetailApi",
    tagTypes: ["CreditDetailsApi"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL ,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getCreditsDetail: build.query({
            query: (id) => `/3/person/${id}`,
            providesTags: ["CreditDetailsApi"],
        }),
    }),
})



export const { useGetCreditsDetailQuery } = creditsDetailApiSlice;