import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    searchQuery: "",
    loading: false,
  },
  reducers: {
    setTasks: (state, action) => {
      const newTasks = action.payload;
      const otherTasks = state.tasks.filter(
        (t) => !newTasks.find((nt) => nt.id === t.id)
      );
      state.tasks = [...otherTasks, ...newTasks].sort((a, b) => a.order - b.order);
      state.loading = false;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const selectTaskById = (state, taskId) =>
  state.task.tasks.find((task) => task.id === taskId);

export const { setTasks, setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer;