import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FormValues } from "../components/Form/Form";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("users");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const patchUser = createAsyncThunk(
  "users/patchUser",
  async (id, thunkAPI) => {
    try {
      const response = await axios.patch(`users/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user: FormValues, thunkAPI) => {
    try {
      const response = await axios.post("users", user);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`users/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
