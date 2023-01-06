import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "../../types/Company";

export interface TimeSeriesState {
  selected: Company | null;
}

const initialState: TimeSeriesState = {
  selected: null,
};

export const timeSeriesSlice = createSlice({
  name: 'timeSeries',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Company | null>) => {
      state.selected = action.payload;
    }
  }
})

export const { setSelected } = timeSeriesSlice.actions;

export default timeSeriesSlice.reducer;