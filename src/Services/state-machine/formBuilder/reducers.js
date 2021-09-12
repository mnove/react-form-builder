import produce from "immer";

export const setLSMFormEditingMode = (state, payload) => {
  return produce(state, (draft) => {
    if (payload)
      draft.formBuilder.status.isEditingMode = !payload.editingModeStatus;
  });
};

export const setLSMFormTitle = (state, payload) => {
  return produce(state, (draft) => {
    if (payload) draft.formBuilder.meta.formTitle = payload.labelValue;
  });
};

export const setLSMFormDescription = (state, payload) => {
  return produce(state, (draft) => {
    if (payload) draft.formBuilder.meta.formDescription = payload.labelValue;
  });
};
