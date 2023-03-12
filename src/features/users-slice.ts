import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export type UserState = {
  entities: User[];
}

const initialState: UserState = {
  entities: [],
};

type DraftUser = RequireOnly<User, 'realName' | 'alterEgo'>;
type UpdateUser = RequireOnly<User, 'id'>;  

const createUser = (draftUser: DraftUser): User => {
  return { id: nanoid(), tasks: [], ...draftUser };
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<DraftUser>) => {
      const user = createUser(action.payload);
      state.entities.unshift(user);
    },
    editUser: (state, action: PayloadAction<UpdateUser>) => {
      const index = state.entities.findIndex(user => user.id === action.payload.id);
      const { realName, alterEgo } = state.entities[index];
      state.entities[index] = {
        ...state.entities[index],
        realName: action.payload.realName ?? realName,
        alterEgo: action.payload.alterEgo ?? alterEgo,
      };
    },
    removeUser: (state, action: PayloadAction<User['id']>) => {
      const index = state.entities.findIndex(user => user.id === action.payload);
      state.entities.splice(index, 1);
    },
  }
})

export const usersReducer = usersSlice.reducer;

export const { addUser, removeUser, editUser } = usersSlice.actions;

export default usersSlice;
