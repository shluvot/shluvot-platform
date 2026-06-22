import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blocks: {},
  status: 'idle', // idle | loading | error
  error: null,
};

const siteContentSlice = createSlice({
  name: 'siteContent',
  initialState,
  reducers: {
    contentRequestStarted(state) {
      state.status = 'loading';
    },
    contentRequestSucceeded(state, action) {
      state.status = 'idle';
      state.blocks = action.payload;
    },
    contentRequestFailed(state, action) {
      state.status = 'error';
      state.error = action.payload;
    },
    blockUpdatedLocally(state, action) {
      const { key, value } = action.payload;
      state.blocks[key] = value;
    },
  },
});

export const { contentRequestStarted, contentRequestSucceeded, contentRequestFailed, blockUpdatedLocally } =
  siteContentSlice.actions;
export default siteContentSlice.reducer;
