import produce from "immer";

export const setLSMFormEditingMode = (state, payload) => {
  return produce(state, (draft) => {
    if (payload)
      draft.formBuilder.status.isEditingMode = !payload.editingModeStatus;
  });
};
