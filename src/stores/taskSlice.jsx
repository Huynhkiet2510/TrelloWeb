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
      const { columnId, tasks: newTasksFromFirebase } = action.payload;
      const tasksOfOtherColumns = state.tasks.filter(
        (t) => t.columnId !== columnId
      );
      state.tasks = [...tasksOfOtherColumns, ...newTasksFromFirebase].sort(
        (a, b) => a.order - b.order
      );
      state.loading = false;
    },

    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.tasks.sort((a, b) => a.order - b.order);
    },

    updateTask: (state, action) => {
      const { id, title } = action.payload;
      state.tasks = state.tasks.map((t) => t.id === id ? {...t, title: title} : t);
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const selectTaskById = (state, taskId) =>
  state.task.tasks.find((task) => task.id === taskId);

export const { setTasks, setSearchQuery, removeTask, addTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;