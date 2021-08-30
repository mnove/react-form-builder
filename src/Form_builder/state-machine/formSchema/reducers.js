import produce from "immer";

export const initializeLSMFormSchema = (state, payload) => {
  return {
    ...state,
    formSchemaState: payload,
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

/** Change the label within Form Schema State
 * @param {object} formSchemaState Previous form schema state
 * @param {string} key  c
 * @param {boolean} isRequired  Value of the required field
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
      draft.formSchemaState[index].required = !payload.isRequired;
  });
};
