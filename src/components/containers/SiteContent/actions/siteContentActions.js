import { sdk } from '../../../../sdk';
import { contentRequestStarted, contentRequestSucceeded, contentRequestFailed } from '../../../../store/reducers/siteContentReducer';

export function loadSiteContent() {
  return async function (dispatch) {
    dispatch(contentRequestStarted());
    try {
      const blocks = await sdk.content.getAllSiteContent();
      dispatch(contentRequestSucceeded(blocks));
    } catch (error) {
      dispatch(contentRequestFailed(error.message));
    }
  };
}
