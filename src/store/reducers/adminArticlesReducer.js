import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: [],
  status: 'idle', // idle | loading | error
  error: null,
};

const adminArticlesSlice = createSlice({
  name: 'adminArticles',
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
    articleUpserted(state, action) {
      const article = action.payload;
      const index = state.rows.findIndex((row) => row.id === article.id);
      if (index === -1) {
        state.rows.unshift(article);
      } else {
        state.rows[index] = article;
      }
    },
    articleRemoved(state, action) {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
  },
});

export const { listRequestStarted, listRequestSucceeded, listRequestFailed, articleUpserted, articleRemoved } =
  adminArticlesSlice.actions;
export default adminArticlesSlice.reducer;
