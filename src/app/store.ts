import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { nasdaqApi } from '../services/nasdaq';
import timeSeriesReducer from '../features/timeSeries/timeSeriesSlice';

export const store = configureStore({
  reducer: {
    [nasdaqApi.reducerPath]: nasdaqApi.reducer,
    timeSeries: timeSeriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(nasdaqApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
