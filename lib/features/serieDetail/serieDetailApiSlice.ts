
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serieDetailApiSlice = createApi({
    reducerPath: "serieDetailApi",
    tagTypes: ["SerieDetailApi"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL ,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getSerieDetail: build.query({
            query: (id) => `/3/tv/${id}`,
            providesTags: ["SerieDetailApi"],
        }),
    }),
})



export const { useGetSerieDetailQuery } =  serieDetailApiSlice;