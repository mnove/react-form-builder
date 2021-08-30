import produce from "immer";

// export const LSMAddNewFieldCheckbox = (state, payload) => {
//   return produce(state, (draft) => {
//     draft.formContainerState["requiredCheckboxes"] = payload;
//   });
// };

// export const LSMAddNewValueLabel = (state, payload) => {
//   return produce(state, (draft) => {
//     draft.formContainerState["labels"] = payload;
//   });
// };

export const LSMAddNewElementToFormContainerState = (state, payload) => {
  return {
    ...state,
    formContainerState: [...state.formContainerState, payload],
  };
};

export const LSMRemoveElementFromFormContainerState = (state, payload) => {
  return produce(state, (draft) => {
    const index = draft.formContainerState.findIndex(
      (elem) => elem.key === payload.key
    );
    console.log(index);
    console.log(draft.formContainerState);

    if (index !== -1) draft.formContainerState.splice(index, 1);
  });
};

export const LSMsetRequiredCheckboxFormContainerState = (state, payload) => {
  return produce(state, (draft) => {
    const index = draft.formContainerState.findIndex(
      (elem) => elem.key === payload.key
    );

    console.log(index);
    console.log(draft.formContainerState);

    if (index !== -1)
      draft.formContainerState[index].isRequiredChecked = payload.isRequired;
  });
};
