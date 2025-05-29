
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const videoApiSlice = createApi({
    reducerPath: "videoApi",
    tagTypes: ["Video"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
            
        },
    }),
    endpoints: (build) => ({
        getVideo: build.query({
            query: (id) => `/3/movie/${id}/videos`,
            providesTags: ["Video"],
        }),
    }),
})



export const { useGetVideoQuery} = videoApiSlice;