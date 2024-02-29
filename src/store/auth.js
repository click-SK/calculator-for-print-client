import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../http/BaseUrl";
import axios from "axios";
import { AUTH_TOKEN } from "../http/tokenLogin";

export const fetchAuth = createAsyncThunk(
    "auth/fetchAuth",
    async (payload, thunkAPI) => {
      const { login, password } = payload;
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });
      const data = await response.json();
      if (data.message) {
        return { message: data.message };
      }
      thunkAPI.dispatch(authSlice.actions.setData(data));
  
      return data || null;
    }
  );

  export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async (payload, thunkAPI) => {
    const response = await fetch(`${BASE_URL}/get-me/${AUTH_TOKEN}`);
    const data = await response.json();
    if(!data.login) {
        window.localStorage.removeItem('S-F-P-token');
    } else {
      thunkAPI.dispatch(authSlice.actions.setData(data));
    }
  });

  const initialState = {
    data: null,
    user: null,
    isAdmin: false
  };
  

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        state.data = null;
      },
      setData: (state, action) => {
        state.data = action.payload;
      },
      setIsAdmin: (state, action) => {
        state.isAdmin = action.payload;
      },
    },
    // extraReducers: {

    // },
  });
  
  export const selectIsAuth = (state) => Boolean(state.auth.data);
  
  export const currentUser = (state) => state.auth.data;
  
  export const allUsers = (state) => state.auth.users;
  
  export const selectIsAdmin = (state) => state.auth.isAdmin;
  
  export const statisticAdmin = (state) => state.auth.adminStatistics;
  
  export const authReducer = authSlice.reducer;
  
  export const { logout } = authSlice.actions;
  