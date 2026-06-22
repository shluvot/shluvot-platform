import { sdk } from '../../../../sdk';
import { authRequestStarted, authRequestSucceeded, authRequestFailed, sessionCleared } from '../../../../store/reducers/authReducer';

export function login(email, password) {
  return async function (dispatch) {
    dispatch(authRequestStarted());
    try {
      const session = await sdk.auth.signIn(email, password);
      dispatch(authRequestSucceeded(session));
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };
}

export function logout() {
  return async function (dispatch) {
    await sdk.auth.signOut();
    dispatch(sessionCleared());
  };
}

export function restoreSession() {
  return async function (dispatch) {
    const session = await sdk.auth.getSession();
    dispatch(authRequestSucceeded(session));
  };
}
