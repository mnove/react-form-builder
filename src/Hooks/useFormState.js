import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";
export const useFormState = () => {
  const { actions, state } = useStateMachine();

  console.log(state);

  let stateToReturn = state.formSchemaState;

  return { stateToReturn };
};
