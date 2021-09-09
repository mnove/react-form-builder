import React from "react";

import { useStateMachine } from "little-state-machine";
import { FormHeader } from "../Components/Form";
import styled from "styled-components";
import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import FormContainer from "../Components/Form/FormContainer";
import { useFormState } from "../Hooks/useFormState";

const FormContainerPanel = styled.div`
  width: 50%;
  margin: auto;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const FormBuilder = () => {
  const { state } = useStateMachine();
  const LSMFormBuilder = state.formBuilder;

  // check if the form is in "player mode" (AKA for users to just fill-in)
  const isEditingMode = LSMFormBuilder.status.isEditingMode;
  console.log(isEditingMode);

  const {stateToReturn} = useFormState();
  console.log(stateToReturn);


  return (
    <>
      <EuiFlexGroup direction="column">
        <EuiFlexItem>
          <FormHeader />
        </EuiFlexItem>
        <EuiFlexItem>
          <div style={{ marginTop: "2rem" }}>
            <FormContainerPanel>
              <FormContainer isEditingMode={isEditingMode} />
            </FormContainerPanel>
          </div>
        </EuiFlexItem>
        {/* <div>More...</div> */}
      </EuiFlexGroup>
    </>
  );
};
