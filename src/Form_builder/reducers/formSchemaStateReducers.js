// =============================================================
// FORM SCHEMA  - Reducers
// =============================================================

// HANDLING FIELDS ADD / REMOVE ------------------------------------------------------------------

/** Add a new field to the form schema state
 * @param {object} formSchemaState Previous form schema state
 * @param {object} newFieldData  Data of the field to be added
 */
export const addSchemaField = (formSchemaState, newFieldData) => {
  return [...formSchemaState, newFieldData];
};

/** Remove a new field from the form schema state
 * @param {object} formSchemaState Previous form schema state
 * @param {object} key  The key value of the targeted field to remove
 */
export const removeSchemaField = (formSchemaState, key) => {
  let oldSchema = formSchemaState;
  let newSchema = oldSchema.filter((elem) => {
    if (elem.key === key) {
      return false;
    }
    return true;
  });
  return newSchema;
};

// REQUIRED fields contraints --------------------------------------------------------------------

/** Change the label within Form Schema State
 * @param {object} formSchemaState Previous form schema state
 * @param {string} key  c
 * @param {boolean} isRequired  Value of the required field
 */

export const setSchemaFieldRequired = (formSchemaState, key, isRequired) => {
  let oldSchema = [...formSchemaState];
  let newSchema = oldSchema.map((item, index) => {
    if (item.key === key) {
      return {
        ...item,
        required: isRequired,
      };
    }
    return item;
  });
  return newSchema;
};

// LABELS -----------------------------------------------------------------------

/** Change the label within Form Schema State
 * @param {object} formSchemaState Previous form schema state
 * @param {string} key  The key value of the targeted label
 * @param {string} labelValue  The value of the new label
 */
export const saveSchemaFieldLabel = (formSchemaState, key, labelValue) => {
  let oldSchema = [...formSchemaState];
  let newSchema = oldSchema.map((item, index) => {
    if (item.key === key) {
      return {
        ...item,
        label: labelValue,
      };
    }
    return item;
  });

  return newSchema;
};
