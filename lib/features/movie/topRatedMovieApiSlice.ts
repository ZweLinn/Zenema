
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const topRatedMovieApiSlice = createApi({
    reducerPath: "topRatedMovieApi",
    tagTypes: ["TopRatedMovie"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getTopRatedMovies: build.query({
            query: (page) => `/3/movie/top_rated?page=${page}`,
            providesTags: ["TopRatedMovie"],
        }),
    }),
})



export const { useGetTopRatedMoviesQuery } = topRatedMovieApiSlice;