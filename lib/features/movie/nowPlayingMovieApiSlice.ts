
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const nowPlayingMovieApiSlice = createApi({
    reducerPath: "nowPlayingMovieApi",
    tagTypes: ["NowPlayingMovie"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getNowPlayingMovies: build.query({
            query: (page) => `/3/movie/now_playing?page=${page}`,
            providesTags: ["NowPlayingMovie"],
        }),
    }),
})



export const { useGetNowPlayingMoviesQuery } = nowPlayingMovieApiSlice;
