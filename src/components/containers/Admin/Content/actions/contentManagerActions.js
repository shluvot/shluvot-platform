import { sdk } from '../../../../../sdk';
import { blockUpdatedLocally } from '../../../../../store/reducers/siteContentReducer';

export function saveBlock(key, value) {
  return async function (dispatch) {
    await sdk.content.updateSiteContent(key, value);
    dispatch(blockUpdatedLocally({ key, value }));
  };
}

export async function uploadImage(file) {
  return sdk.media.uploadImage(file);
}
