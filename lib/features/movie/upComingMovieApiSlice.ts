
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const upComingMovieApiSlice = createApi({
    reducerPath: "upComingMovieApi",
    tagTypes: ["UpComingMovie"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getUpComingMovies: build.query({
            query: (page) => `/3/movie/upcoming?page=${page}`,
            providesTags: ["UpComingMovie"],
        }),
    }),
})



export const { useGetUpComingMoviesQuery } = upComingMovieApiSlice;
