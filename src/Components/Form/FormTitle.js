import React, { useState, useEffect } from "react";

import { useStateMachine } from "little-state-machine";

import {
  EuiButton,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiText,
} from "@elastic/eui";
import {
  setLSMFormTitle,
  setLSMFormDescription,
} from "../../Services/state-machine/formBuilder/reducers";
import InlineEdit from "../InlineTextEdit/Components/inlineEdit";

const titleFontSize = 32; //  in px
const descriptionFontSize = 16; // in px

export const FormTitle = ({ isEditingMode }) => {
  const { actions, state } = useStateMachine({
    setLSMFormTitle,
    setLSMFormDescription,
  });

  const formTitle = state.formBuilder.meta.formTitle;
  const formDescription = state.formBuilder.meta.formDescription;

  const [storedTitle, setStoredTitle] = useState(formTitle);
  const [storedDescription, setStoredDescription] = useState(formDescription);

  // Keep track of changes
  //so the child component updates properly
  useEffect(() => {
    setStoredTitle(storedTitle);
  }, [storedTitle]);

  useEffect(() => {
    setStoredDescription(storedDescription);
  }, [storedDescription]);

  return (
    <>
      <EuiText>
        {isEditingMode ? (
          <InlineEdit
            text={storedTitle}
            onSetText={(text) => setStoredTitle(text)}
            stateActions={actions}
            stateActionType="setLSMFormTitle"
            fontSize={titleFontSize}
          />
        ) : (
          <p style={{ fontSize: titleFontSize }}>{storedTitle}</p>
        )}
      </EuiText>

      <EuiText>
        {isEditingMode ? (
          <InlineEdit
            text={storedDescription}
            onSetText={(text) => setStoredDescription(text)}
            stateActions={actions}
            stateActionType="setLSMFormDescription"
            fontSize={descriptionFontSize}
          />
        ) : (
          <p style={{ fontSize: descriptionFontSize }}>{storedDescription}</p>
        )}
      </EuiText>
    </>
  );
};
