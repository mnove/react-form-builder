// HANDLING RADIO FIELD ADD / REMOVE OPTIONS------------------------------------------------------------------

/** Add a new field to the form schema state
 * @param {object} formSchemaState Previous form schema state
 * @param {string} key
 * @param {object} newOption  Data of the field to be added
 */
export const addRadioOption = (formSchemaState, key, newOption) => {
  let oldSchema = [...formSchemaState];
  let newSchema = oldSchema.map((item, index) => {
    if (item.key === key) {
      console.log(item.options);
      return {
        ...item,
        options: [...item.options, newOption],
      };
    }
    return item;
  });
  console.log(newSchema);
  return newSchema;
};
