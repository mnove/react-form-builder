import react, { useState } from "react";

import {
  EuiAvatar,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiLink,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSelectable,
  EuiSelectableMessage,
  EuiSelectableTemplateSitewide,
  EuiSpacer,
  EuiText,
  EuiSwitch,
} from "@elastic/eui";

import { Eye } from "@styled-icons/remix-fill/Eye";
import { Edit } from "@styled-icons/remix-fill/Edit";
import { useStateMachine } from "little-state-machine";
import { setLSMFormEditingMode } from "../Form_builder/state-machine/formBuilder/reducers";

export const FormHeader = () => {
  const { actions, state } = useStateMachine({
    setLSMFormEditingMode,
  });
  const editingStatus = state.formBuilder.status.isEditingMode;
  const handleClick = () => {
    let payload = {
      editingModeStatus: editingStatus,
    };

    actions.setLSMFormEditingMode(payload);
  };

  return (
    <>
      <EuiHeader>
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
