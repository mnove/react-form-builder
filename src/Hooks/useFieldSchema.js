import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";

/**
 * Return the entire form field state from the form's schema
 * @param {string} fieldKey The key of the form field to be returned
 * @return {Field} The field's schema
 */
export const useFieldSchema = (fieldKey) => {
  const { state } = useStateMachine();
  const formSchemaState = state.formSchemaState;
  let field = formSchemaState.filter((el) => {
    return el.key === fieldKey;
  });
  return field[0];
};
