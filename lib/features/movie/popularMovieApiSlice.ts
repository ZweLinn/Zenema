
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const popularMovieApiSlice = createApi({
    reducerPath: "popularMovieApi",
    tagTypes: ["PopularMovie"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getPopularMovies: build.query({
            query: (page) => `/3/movie/popular?page=${page}`,
            providesTags: ["PopularMovie"],
        }),
    }),
})



export const { useGetPopularMoviesQuery } = popularMovieApiSlice;
