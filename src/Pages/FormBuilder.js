import React from "react";
import FormContainer from "../Components/FormContainer";

import { useStateMachine } from "little-state-machine";

export const FormBuilder = () => {
  const { state } = useStateMachine();
  const LSMFormBuilder = state.formBuilder;

  // check if the form is in "player mode" (AKA for users to just fill-in)
  const isEditingMode = LSMFormBuilder.status.isEditingMode;
  console.log(isEditingMode);
  return (
    <>
      <FormContainer isEditingMode={isEditingMode} />
      {/* <div>More...</div> */}
    </>
  );
};
