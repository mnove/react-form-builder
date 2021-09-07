import React from "react";
import FormContainer from "../Components/FormContainer";

import { useStateMachine } from "little-state-machine";
import { FormHeader } from "../Components/FormHeader";
import styled from "styled-components";
import { EuiFlexGroup, EuiFlexItem, EuiPanel } from "@elastic/eui";

const FormContainerPanel = styled.div`
  width: 50%;
  margin: auto;
`;

export const FormBuilder = () => {
  const { state } = useStateMachine();
  const LSMFormBuilder = state.formBuilder;

  // check if the form is in "player mode" (AKA for users to just fill-in)
  const isEditingMode = LSMFormBuilder.status.isEditingMode;
  console.log(isEditingMode);
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
