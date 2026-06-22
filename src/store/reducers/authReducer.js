import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  session: null,
  status: 'idle', // idle | loading | error
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequestStarted(state) {
      state.status = 'loading';
      state.error = null;
    },
    authRequestSucceeded(state, action) {
      state.status = 'idle';
      state.session = action.payload;
    },
    authRequestFailed(state, action) {
      state.status = 'error';
      state.error = action.payload;
    },
    sessionCleared(state) {
      state.session = null;
      state.status = 'idle';
    },
  },
});

export const { authRequestStarted, authRequestSucceeded, authRequestFailed, sessionCleared } = authSlice.actions;
export default authSlice.reducer;
