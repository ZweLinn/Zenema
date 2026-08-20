import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tvListApiSlice = createApi({
    reducerPath: "tvListApi",
    tagTypes: ["TopRatedTv", "PopularTv", "OnTheAirTv"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getTopRatedTv: build.query({
            query: (page) => `/3/tv/top_rated?page=${page}`,
            providesTags: ["TopRatedTv"],
        }),
        getPopularTv: build.query({
            query: (page) => `/3/tv/popular?page=${page}`,
            providesTags: ["PopularTv"],
        }),
        getOnTheAirTv: build.query({
            query: (page) => `/3/tv/on_the_air?page=${page}`,
            providesTags: ["OnTheAirTv"],
        }),
    }),
})



export const { useGetTopRatedTvQuery, useGetPopularTvQuery, useGetOnTheAirTvQuery } = tvListApiSlice;
