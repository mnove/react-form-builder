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
