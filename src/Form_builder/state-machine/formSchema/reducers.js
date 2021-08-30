export const initializeLSMFormSchema = (state, payload) => {
  return {
    ...state,
    formSchemaState: payload,
  };
};
