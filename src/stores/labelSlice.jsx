import { createSlice } from "@reduxjs/toolkit";

const labelSlice = createSlice({
  name: "labels",
  initialState: {
    items: [],
    loading: true, 
  },
  reducers: {
    setLabels: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { setLabels, setLoading } = labelSlice.actions;
export default labelSlice.reducer;