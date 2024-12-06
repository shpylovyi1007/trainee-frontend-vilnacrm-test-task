import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsers, patchUser, RejectedValue, Users } from "./operations";

interface UserState {
  items: Users[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  users: UserState;
}

const initialState: UserState = {
  items: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<Users[]>) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(
        getUsers.rejected,
        (state, action: PayloadAction<RejectedValue | undefined>) => {
          state.loading = false;
          state.error = action.payload?.error ?? "Unknown error occurred";
        }
      )
      .addCase(patchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(patchUser.fulfilled, (state, action: PayloadAction<Users>) => {
        const updatedUser = action.payload;
        state.loading = false;
        state.error = null;

        const index = state.items.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.items[index] = updatedUser;
        }
      })
      .addCase(
        patchUser.rejected,
        (state, action: PayloadAction<RejectedValue | undefined>) => {
          state.loading = false;
          state.error = action.payload?.error ?? "Unknown error occurred";
        }
      );
  },
});

export const usersReducer = usersSlice.reducer;
