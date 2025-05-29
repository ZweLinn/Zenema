import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { topRatedMovieApiSlice } from "./features/topRatedMovie/topRatedMovieApiSlice";
import { movieDetailApiSlice } from "./features/movieDetail/movieDetailApiSlice";
import { videoApiSlice } from "./features/video/videoApiSlice";
import { creditsApiSlice } from "./features/credits/creditsApiSlice";
import { creditsDetailApiSlice } from "./features/credits/creditsDetailApiSlice";
import { creditsExternalIdApiSlice } from "./features/credits/creditExternalIdApiSlice";
import { creditsMovieApiSlice } from "./features/credits/creditsMovieApiSlice";
import { creditsSeriesApiSlice } from "./features/credits/creditsSeriesApiSlice";
import { creditsImageApiSlice } from "./features/credits/creditsImageApiSlice";
import { serieDetailApiSlice } from "./features/serieDetail/serieDetailApiSlice";
import { serieVideoApiSlice } from "./features/video/serieVideoApiSlice";
// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  topRatedMovieApiSlice,
  movieDetailApiSlice,
  videoApiSlice,
  serieVideoApiSlice,
  creditsApiSlice,
  creditsDetailApiSlice,
  creditsExternalIdApiSlice,
  creditsMovieApiSlice,
  creditsSeriesApiSlice,
  creditsImageApiSlice,
  serieDetailApiSlice);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(topRatedMovieApiSlice.middleware)
        .concat(movieDetailApiSlice.middleware)
        .concat(videoApiSlice.middleware)
        .concat(serieVideoApiSlice.middleware)
        .concat(creditsApiSlice.middleware)
        .concat(creditsDetailApiSlice.middleware)
        .concat(creditsExternalIdApiSlice.middleware)
        .concat(creditsMovieApiSlice.middleware)
        .concat(creditsSeriesApiSlice.middleware)
        .concat(creditsImageApiSlice.middleware)
        .concat(serieDetailApiSlice.middleware);
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
