import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./features/tasks-slice";
import { usersReducer } from "./features/users-slice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
});

export default store;

export type ApplicationState = ReturnType<typeof store.getState>;

export type ApplicationDispatch = typeof store.dispatch;
