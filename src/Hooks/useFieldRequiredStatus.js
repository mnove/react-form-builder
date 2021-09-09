import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";

/**
 * Return the required status of the form field
 * @param {string} fieldKey The key of the form field to be returned
 * @return {string} The field required status
 */
export const useFieldRequiredStatus = (fieldKey) => {
  const { state } = useStateMachine();
  const formSchemaState = state.formSchemaState;
  let field = formSchemaState.filter((el) => {
    return el.key === fieldKey;
  });
  let getFieldRequiredStatus = field[0].required;
  return getFieldRequiredStatus;
};
