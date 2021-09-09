import React from "react";

import {
  EuiButton,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiText,
} from "@elastic/eui";

import { Eye } from "@styled-icons/remix-fill/Eye";
import { Edit } from "@styled-icons/remix-fill/Edit";
import { useStateMachine } from "little-state-machine";
import { setLSMFormEditingMode } from "../../Services/state-machine/formBuilder/reducers";
import { useFormState } from "../../Hooks/useFormState";

export const FormHeader = () => {
  const { actions, state } = useStateMachine({
    setLSMFormEditingMode,
  });

  const { getEditingMode } = useFormState();
  // check if the form is in "player mode" (AKA for users to just fill-in)

  const editingStatus = getEditingMode();
  const handleClick = () => {
    let payload = {
      editingModeStatus: editingStatus,
    };
    actions.setLSMFormEditingMode(payload);
  };

  return (
    <>
      <EuiHeader position="fixed">
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem>
            <EuiText>
              <h3>Your form</h3>
            </EuiText>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection grow={false} side="right">
          <EuiHeaderSectionItem style={{ minWidth: 200 }}>
            <EuiButton
              fullWidth={true}
              style={{ width: "100%" }}
              color={editingStatus ? "success" : "warning"}
              size="s"
              label="Edit mode"
              onClick={handleClick}
              iconType={editingStatus ? Eye : Edit}
            >
              {editingStatus ? "Preview form" : "Edit form"}
            </EuiButton>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </>
  );
};
