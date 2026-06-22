import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: [],
  filters: { search: '', status: null },
  status: 'idle', // idle | loading | error
  error: null,
};

const adminRegistrantsSlice = createSlice({
  name: 'adminRegistrants',
  initialState,
  reducers: {
    listRequestStarted(state) {
      state.status = 'loading';
      state.error = null;
    },
    listRequestSucceeded(state, action) {
      state.status = 'idle';
      state.rows = action.payload;
    },
    listRequestFailed(state, action) {
      state.status = 'error';
      state.error = action.payload;
    },
    filtersChanged(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    registrantUpdatedLocally(state, action) {
      const updated = action.payload;
      const index = state.rows.findIndex((row) => row.id === updated.id);
      if (index !== -1) {
        state.rows[index] = { ...state.rows[index], ...updated };
      }
    },
  },
});

export const {
  listRequestStarted,
  listRequestSucceeded,
  listRequestFailed,
  filtersChanged,
  registrantUpdatedLocally,
} = adminRegistrantsSlice.actions;
export default adminRegistrantsSlice.reducer;
