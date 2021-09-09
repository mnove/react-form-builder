import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";

/**
 * Returns values and methods from the form's state
 */

export const useFormState = () => {
  const { state } = useStateMachine();
  const formState = state.formBuilder;

  /**
   * Return the required status of the form field
   */
  const getEditingMode = () => {
    return formState.status.isEditingMode;
  };

  return { getEditingMode };
};
