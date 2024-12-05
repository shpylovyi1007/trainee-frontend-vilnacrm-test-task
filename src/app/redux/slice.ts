import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsers, RejectedValue, Users } from "./operations";

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
      );
  },
});

export const usersReducer = usersSlice.reducer;
