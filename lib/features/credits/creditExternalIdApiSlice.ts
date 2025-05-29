
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creditsExternalIdApiSlice = createApi({
    reducerPath: "creditsExternalIdApi",
    tagTypes: ["CreditsExternalIdApi"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL ,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
            headers.set("accept",  "application/json" )
            return headers;
        },
    }),
    endpoints: (build) => ({
        getCreditsExternalId: build.query({
            query: (id) => `/3/person/${id}/external_ids`,
            providesTags: ["CreditsExternalIdApi"],
        }),
    }),
})



export const { useGetCreditsExternalIdQuery } = creditsExternalIdApiSlice;