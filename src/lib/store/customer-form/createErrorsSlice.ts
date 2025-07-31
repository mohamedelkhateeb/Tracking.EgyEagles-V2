import { StateCreator } from 'zustand';

type Errors = any;

type ErrorsSlice = {
  Errors: Errors;
  setErrors: (Errors: Errors) => void;
};

const initialState = {};

const createErrorsSlice: StateCreator<ErrorsSlice> = (set) => ({
  Errors: initialState,
  setErrors: (data) => set((state) => ({ Errors: data })),
});

export default createErrorsSlice;
export type { Errors, ErrorsSlice };
