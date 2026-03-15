import { configureStore } from "@reduxjs/toolkit";
import labelReducer from "./labelSlice"; 
import taskReducer from "./taskSlice"

export const store = configureStore({
  reducer: {
    label: labelReducer,
    task: taskReducer
  }
});