import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  const res = await axiosInstance.post('/auth/login', credentials);
  // expected: { token, user }
  return res.data;
});

export const register = createAsyncThunk('auth/register', async (data) => {
  const res = await axiosInstance.post('/auth/register', data);
  return res.data;
});

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (s) => { s.status = 'loading'; })
      .addCase(login.fulfilled, (s, action) => {
        s.status = 'succeeded';
        s.user = action.payload.user;
        s.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (s, action) => {
        s.status = 'failed';
        s.error = action.error.message;
      })
      .addCase(register.fulfilled, (s) => { s.status = 'registered'; });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
