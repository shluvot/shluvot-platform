import { sdk } from '../../../../sdk';
import {
  listRequestStarted,
  listRequestSucceeded,
  listRequestFailed,
  filtersChanged,
  registrantUpdatedLocally,
  registrantRemovedLocally,
} from '../../../../store/reducers/adminRegistrantsReducer';

export function loadRegistrants() {
  return async function (dispatch, getState) {
    dispatch(listRequestStarted());
    try {
      const rows = await sdk.registrants.getRegistrants(getState().adminRegistrants.filters);
      dispatch(listRequestSucceeded(rows));
    } catch (error) {
      dispatch(listRequestFailed(error.message));
    }
  };
}

export function changeFilters(patch) {
  return function (dispatch) {
    dispatch(filtersChanged(patch));
    dispatch(loadRegistrants());
  };
}

export function overridePayment(registrant, { paymentId, status, reason }) {
  return async function (dispatch) {
    const updatedPayment = await sdk.payments.overridePaymentStatus(paymentId, { status, reason });
    dispatch(
      registrantUpdatedLocally({
        id: registrant.id,
        payments: [updatedPayment, ...(registrant.payments?.filter((p) => p.id !== paymentId) ?? [])],
      }),
    );
  };
}

export function updateRegistrantDetails(id, patch) {
  return async function (dispatch) {
    const updated = await sdk.registrants.updateRegistrant(id, patch);
    dispatch(registrantUpdatedLocally(updated));
  };
}

export function deleteRegistrant(id) {
  return async function (dispatch) {
    await sdk.registrants.deleteRegistrant(id);
    dispatch(registrantRemovedLocally(id));
  };
}
