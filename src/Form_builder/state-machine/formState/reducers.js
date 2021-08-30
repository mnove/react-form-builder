import produce from "immer";

export const LSMAddNewFieldCheckbox = (state, payload) => {
  return produce(state, (draft) => {
    draft.formContainerState["requiredCheckboxes"] = payload;
  });
};

export const LSMAddNewValueLabel = (state, payload) => {
  return produce(state, (draft) => {
    draft.formContainerState["labels"] = payload;
  });
};
