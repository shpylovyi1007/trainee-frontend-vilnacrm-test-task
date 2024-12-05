import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface PatchUserParams {
  id: number;
  userChange: Partial<Users>;
}

export interface RejectedValue {
  error: string;
}

export const getUsers = createAsyncThunk<
  Users[],
  void,
  { rejectValue: RejectedValue }
>("users/getUsers", async (_, thunkAPI) => {
  try {
    const response = await axios.get<Users[]>("users");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      error: (error as Error).message || "Error fetching users",
    });
  }
});

export const patchUser = createAsyncThunk<
  Users,
  PatchUserParams,
  { rejectValue: RejectedValue }
>("users/patchUser", async ({ id, userChange }, thunkAPI) => {
  try {
    const response = await axios.patch<Users>(`users/${id}`, userChange);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      error: (error as Error).message || "Error updating user",
    });
  }
});

export const addUser = createAsyncThunk<
  Users,
  Users,
  { rejectValue: RejectedValue }
>("users/addUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post<Users>("users", userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      error: (error as Error).message || "Error adding user",
    });
  }
});

export const deleteUser = createAsyncThunk<
  void,
  number,
  { rejectValue: RejectedValue }
>("users/deleteUser", async (id, thunkAPI) => {
  try {
    await axios.delete(`users/${id}`);
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      error: (error as Error).message || "Error deleting user",
    });
  }
});
