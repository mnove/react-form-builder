import produce from "immer";

export const initializeLSMFormSchema = (state, payload) => {
  return {
    ...state,
    formSchemaState: [...payload],
  };
};

/** Add a new field to the form schema state
 * @param {object} state Previous form schema state
 * @param {object} payload  Data of the field to be added
 */

export const addLSMSchemaField = (state, payload) => {
  return {
    ...state,
    formSchemaState: [...state.formSchemaState, payload],
  };
};

/** Remove a new field from the form schema state
 * @param {object} state Previous form schema state
 * @param {string} payload  The key value of the targeted field to remove
 */
export const removeLSMSchemaField = (state, payload) => {
  let toReturn = state.formSchemaState.filter((elem, index) => {
    if (elem.key === payload) {
      return false;
    }
    return true;
  });

  console.log(toReturn);

  return {
    ...state,
    formSchemaState: toReturn,
  };
};

/** Set field required within Form Schema State
 */

export const setLSMSchemaFieldRequired = (state, payload) => {
  return produce(state, (draft) => {
    console.log(draft);
    const index = draft.formSchemaState.findIndex(
      (elem) => elem.key === payload.key
    );

    console.log(index);
    console.log(draft.formSchemaState);

    if (index !== -1)
      draft.formSchemaState[index].required = payload.isRequired;
  });
};

/** Change the label within Form Schema State
 */
export const setLSMSchemaLabelField = (state, payload) => {
  return produce(state, (draft) => {
    const index = draft.formSchemaState.findIndex(
      (elem) => elem.key === payload.labelKey
    );

    console.log(index);

    if (index !== -1) draft.formSchemaState[index].label = payload.labelValue;
  });
};

// RADIO FIELD

export const addLSMShemaRadioOption = (state, payload) => {
  return produce(state, (draft) => {
    const index = draft.formSchemaState.findIndex(
      (elem) => elem.key === payload.fieldKey
    );

    console.log(index);

    if (index !== -1)
      draft.formSchemaState[index].fieldData.radioOptions.push(
        payload.newOption
      );
  });
};

export const removeLSMShemaRadioOption = (state, payload) => {
  return produce(state, (draft) => {
    const radioFieldIndex = draft.formSchemaState.findIndex(
      (elem) => elem.key === payload.fieldKey
    );

    let radioOptions;
    if (radioFieldIndex !== -1)
      radioOptions =
        draft.formSchemaState[radioFieldIndex].fieldData.radioOptions;

    const radioOptionIndex = radioOptions.findIndex(
      (elem) => elem.key === payload.optionKey
    );

    if (radioOptionIndex !== -1) radioOptions.splice(radioOptionIndex, 1);
  });
};

export const setLSMSchemaRadioOption = (state, payload) => {
  return produce(state, (draft) => {
    const radioFieldIndex = draft.formSchemaState.findIndex(
      (elem) => elem.key === payload.fieldKey
    );

    let radioOptions;
    if (radioFieldIndex !== -1)
      radioOptions =
        draft.formSchemaState[radioFieldIndex].fieldData.radioOptions;

    const radioOptionIndex = radioOptions.findIndex(
      (elem) => elem.key === payload.optionKey
    );

    if (radioOptionIndex !== -1)
      radioOptions[radioOptionIndex].label = payload.labelValue;
  });
};

// CHECKBOX FIELD

export const addLSMShemaCheckboxOption = (state, payload) => {
  console.log("called here...");
  return produce(state, (draft) => {
    const index = draft.formSchemaState.findIndex(
      (elem) => elem.key === payload.fieldKey
    );

    console.log(index);

    if (index !== -1)
      draft.formSchemaState[index].fieldData.checkboxOptions.push(
        payload.newOption
      );
  });
};

export const removeLSMShemaCheckboxOption = (state, payload) => {
  return produce(state, (draft) => {
    const checkboxFieldIndex = draft.formSchemaState.findIndex(
      (elem) => elem.key === payload.fieldKey
    );

    let checkboxOptions;
    if (checkboxFieldIndex !== -1)
      checkboxOptions =
        draft.formSchemaState[checkboxFieldIndex].fieldData.checkboxOptions;

    const checkboxOptionIndex = checkboxOptions.findIndex(
      (elem) => elem.key === payload.optionKey
    );

    if (checkboxOptionIndex !== -1)
      checkboxOptions.splice(checkboxOptionIndex, 1);
  });
};

export const setLSMSchemaCheckboxOption = (state, payload) => {
  return produce(state, (draft) => {
    const checkboxFieldIndex = draft.formSchemaState.findIndex(
      (elem) => elem.key === payload.fieldKey
    );

    let checkboxOptions;
    if (checkboxFieldIndex !== -1)
      checkboxOptions =
        draft.formSchemaState[checkboxFieldIndex].fieldData.checkboxOptions;

    const checkboxOptionIndex = checkboxOptions.findIndex(
      (elem) => elem.key === payload.optionKey
    );

    if (checkboxOptionIndex !== -1)
      checkboxOptions[checkboxOptionIndex].label = payload.labelValue;
  });
};
