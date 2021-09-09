import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";

/**
 * Returns values and methods from the store's form schema
 * @param {string} fieldKey - The key of the form field
 */

export const useFieldSchema = () => {
  const { state } = useStateMachine();
  const formSchemaState = state.formSchemaState;

  /**
   * Return the required status of the form field
   * @param {string} fieldKey The key of the form field to be returned
   * @returns
   */
  const getElementRequiredStatus = (fieldKey) => {
    let field = formSchemaState.filter((el) => {
      return el.key === fieldKey;
    });
    let getFieldRequiredStatus = field[0].required;
    return getFieldRequiredStatus;
  };

  /**
   * Return the entire form field state from the form's schema
   * @param {string} fieldKey The key of the form field to be returned
   */

  const getFieldSchema = (fieldKey) => {
    let field = formSchemaState.filter((el) => {
      return el.key === fieldKey;
    });
    return field[0];
  };
  return { getElementRequiredStatus, getFieldSchema };
};
