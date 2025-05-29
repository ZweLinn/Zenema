
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const serieVideoApiSlice = createApi({
    reducerPath: "serieVideoApi",
    tagTypes: ["SerieVideo"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
            
        },
    }),
    endpoints: (build) => ({
        getserieVideo: build.query({
            query: (id) => `/3/tv/${id}/videos`,
            providesTags: ["SerieVideo"],
        }),
    }),
})



export const { useGetserieVideoQuery} = serieVideoApiSlice;