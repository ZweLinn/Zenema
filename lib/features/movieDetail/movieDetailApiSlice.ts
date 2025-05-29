
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieDetailApiSlice = createApi({
    reducerPath: "movieDetailApi",
    tagTypes: ["MovieDetailApi"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL ,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getMovieDetail: build.query({
            query: (id) => `/3/movie/${id}`,
            providesTags: ["MovieDetailApi"],
        }),
    }),
})



export const { useGetMovieDetailQuery } = movieDetailApiSlice;