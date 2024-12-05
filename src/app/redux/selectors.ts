import { Users } from "./operations";
import { RootState } from "./slice";

export const selectUsers = (state: RootState): Users[] => state.users.items;

export const selectLoading = (state: RootState): boolean => state.users.loading;

export const selectError = (state: RootState): string | null =>
  state.users.error;
