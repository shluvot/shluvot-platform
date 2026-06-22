import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  values: {
    fullName: '',
    nationalId: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    billingCycle: 'annual',
  },
  errors: {},
  status: 'idle', // idle | submitting | submitted | error
  error: null,
  registrantId: null,
  paymentReference: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    fieldChanged(state, action) {
      const { field, value } = action.payload;
      state.values[field] = value;
    },
    stepValidationFailed(state, action) {
      state.errors = action.payload;
    },
    stepAdvanced(state) {
      state.errors = {};
      state.step += 1;
    },
    stepBackedUp(state) {
      state.step = Math.max(0, state.step - 1);
    },
    submissionStarted(state) {
      state.status = 'submitting';
      state.error = null;
    },
    submissionSucceeded(state, action) {
      state.status = 'submitted';
      state.registrantId = action.payload.registrantId;
      state.paymentReference = action.payload.paymentReference;
    },
    submissionFailed(state, action) {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const {
  fieldChanged,
  stepValidationFailed,
  stepAdvanced,
  stepBackedUp,
  submissionStarted,
  submissionSucceeded,
  submissionFailed,
} = registrationSlice.actions;
export default registrationSlice.reducer;
