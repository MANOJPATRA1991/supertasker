import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { removeUser } from "./users-slice";

export type TasksState = {
  entities: Task[];
  loading?: boolean;
};

const initialState: TasksState = {
  entities: [],
  loading: false,
};

type DraftTask = RequireOnly<Task, 'title'>;

export const createTask = (draftTask: DraftTask): Task => {
  return { id: nanoid(), ...draftTask };
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (): Promise<Task[]> => {
  const response = await fetch('/api/tasks').then(response => response.json());
  return response.tasks;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const task = createTask(action.payload);
      state.entities.unshift(task);
    },
    removeTask: (state, action: PayloadAction<Task['id']>) => {
      const index = state.entities.findIndex(task => task.id === action.payload);
      state.entities.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state, action) => {
      const userId = action.payload;
      for (const task of state.entities) {
        if (task.user === userId) {
          task.user = undefined
        }
      }
    });

    /**
     * can be fetchTasks.fulfilled or fetchTasks.rejected or fetchTasks.pending
     */
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchTasks.pending, (state, action) => {
      state.loading = true;
    });
  }
});

export const tasksReducer = tasksSlice.reducer;

export const { addTask, removeTask } = tasksSlice.actions;

export default tasksSlice;
