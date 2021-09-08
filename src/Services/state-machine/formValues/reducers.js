import produce from "immer";

export const initializeLSMFormValues = (state, payload) => {
  return {
    ...state,
    formValuesState: [...payload],
  };
};

export const addNewElementToFormValues = (state, payload) => {
  return {
    ...state,
    formValuesState: [...state.formValuesState, payload],
  };
};

export const removeElementFromFormValues = (state, payload) => {
  return produce(state, (draft) => {
    const index = draft.formValuesState.findIndex(
      (elem) => elem.key === payload.key
    );
    console.log(index);
    console.log(draft.formValuesState);

    if (index !== -1) draft.formValuesState.splice(index, 1);
  });
};
