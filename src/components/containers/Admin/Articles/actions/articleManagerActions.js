import { sdk } from '../../../../../sdk';
import {
  listRequestStarted,
  listRequestSucceeded,
  listRequestFailed,
  articleUpserted,
  articleRemoved,
} from '../../../../../store/reducers/adminArticlesReducer';

export function loadArticles() {
  return async function (dispatch) {
    dispatch(listRequestStarted());
    try {
      const rows = await sdk.articles.getAllArticlesForStaff();
      dispatch(listRequestSucceeded(rows));
    } catch (error) {
      dispatch(listRequestFailed(error.message));
    }
  };
}

export function saveArticle(existingId, fields) {
  return async function (dispatch) {
    const saved = existingId ? await sdk.articles.updateArticle(existingId, fields) : await sdk.articles.createArticle(fields);
    dispatch(articleUpserted(saved));
    return saved;
  };
}

export function removeArticle(id) {
  return async function (dispatch) {
    await sdk.articles.deleteArticle(id);
    dispatch(articleRemoved(id));
  };
}

export async function uploadCoverImage(file) {
  return sdk.media.uploadImage(file);
}
