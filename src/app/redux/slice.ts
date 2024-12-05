import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormValues } from "../components/Form/Form";
import { getUsers } from "./operations";

const handlePending = (state: InitialValues) => {
  state.loading = true;
};

const handleRejected = (
  state: InitialValues,
  action: PayloadAction<string | null>
) => {
  state.loading = false;
  state.error = action.payload;
};

interface InitialValues {
  users: FormValues[];
  loading: boolean;
  error: null | string;
}

const initialState: InitialValues = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, handlePending)
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, handleRejected);
  },
});

export const usersReducer = usersSlice.reducer;
