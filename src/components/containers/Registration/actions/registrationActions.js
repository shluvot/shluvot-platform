import { sdk } from '../../../../sdk';
import { validateStep } from '../../../../business/RegistrationWizard/actions/validation';
import {
  fieldChanged,
  stepValidationFailed,
  stepAdvanced,
  stepBackedUp,
  submissionStarted,
  submissionSucceeded,
  submissionFailed,
} from '../../../../store/reducers/registrationReducer';

const AMOUNT_BY_CYCLE = { monthly: 30, annual: 300 }; // TODO: לאשר סכומי דמי חבר אמיתיים עם העמותה

export function changeField(field, value) {
  return fieldChanged({ field, value });
}

export function goNext() {
  return function (dispatch, getState) {
    const { step, values } = getState().registration;
    const errors = validateStep(step, values);
    if (Object.keys(errors).length > 0) {
      dispatch(stepValidationFailed(errors));
      return;
    }
    dispatch(stepAdvanced());
  };
}

export function goBack() {
  return stepBackedUp();
}

export function submitRegistration() {
  return async function (dispatch, getState) {
    const { values } = getState().registration;
    dispatch(submissionStarted());
    try {
      const registrant = await sdk.registrants.createRegistrant({
        full_name: values.fullName,
        national_id: values.nationalId,
        email: values.email,
        phone: values.phone,
        address: values.address,
        city: values.city,
        billing_cycle: values.billingCycle,
      });

      const { reference } = await sdk.payments.createPaymentSession({
        registrantId: registrant.id,
        billingCycle: values.billingCycle,
        amountIls: AMOUNT_BY_CYCLE[values.billingCycle],
      });

      dispatch(submissionSucceeded({ registrantId: registrant.id, paymentReference: reference }));
    } catch (error) {
      dispatch(submissionFailed(error.message));
    }
  };
}
