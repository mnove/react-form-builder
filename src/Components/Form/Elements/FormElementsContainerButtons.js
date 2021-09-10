import React, { useState } from "react";

import "react-responsive-modal/styles.css";
// import { initializeForm } from "../Form_builder/initializeForm";

import {
  EuiButtonIcon,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
  EuiFormRow,
  EuiPopover,
  EuiForm,
  EuiFieldText,
} from "@elastic/eui";
import { CloseCircle } from "@styled-icons/remix-fill/CloseCircle";
import { Edit } from "@styled-icons/remix-fill/Edit";
import { useStateMachine } from "little-state-machine";
import {
  removeLSMSchemaField,
  setLSMSchemaFieldRequired,
  setLSMSchemaLabelField,
} from "../../../Services/state-machine/formSchema/reducers";
import {
  LSMRemoveElementFromFormContainerState,
  LSMsetLabelValue,
  LSMsetModalState,
  LSMsetRequiredCheckboxFormContainerState,
} from "../../../Services/state-machine/formState/reducers";
import { removeElementFromFormValues } from "../../../Services/state-machine/formValues/reducers";

import styled from "styled-components";

const StyledEuiFlexGroup = styled(EuiFlexGroup)`
  margin-bottom: 0.2rem;
  background-color: rgba(105, 112, 125, 0.1);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 0.4rem;
`;

export const FormElementsContainerButtons = ({ formik, elemKey }) => {
  const key = elemKey;
  const { actions, state } = useStateMachine({
    removeLSMSchemaField, //
    setLSMSchemaFieldRequired, //
    setLSMSchemaLabelField, //
    LSMRemoveElementFromFormContainerState, //
    LSMsetRequiredCheckboxFormContainerState, //
    LSMsetModalState, //
    LSMsetLabelValue, //
    removeElementFromFormValues, //
  });

  // global FORM CONTAINER STATE (Little state machine)
  const LSMFormContainerState = state.formContainerState;

  const handleOpenModal = (key) => {
    let payload = {
      modalKey: key,
      isModalOpened: true,
    };

    actions.LSMsetModalState(payload);
  };

  const handleModalOpening = (key) => {
    let item = LSMFormContainerState.filter((item) => {
      return item.key === key;
    });
    return item[0].isModalOpened;
  };

  const handleCloseModal = (key) => {
    let payload = {
      modalKey: key,
      isModalOpened: false,
    };
    actions.LSMsetModalState(payload);
  };

  const handleOnChangeLabel = (e, key) => {
    let payload = {
      labelKey: key,
      labelValue: e.target.value,
    };
    actions.LSMsetLabelValue(payload);
  };

  const handleValueLabel = (key) => {
    let item = LSMFormContainerState.filter((item) => {
      return item.key === key;
    });
    return item[0].labelValue;
  };

  const handleSaveFieldLabel = (key) => {
    let payload = {
      labelKey: key,
      labelValue: handleValueLabel(key),
    };
    actions.setLSMSchemaLabelField(payload);

    // Dispatch closing the targeted modal on save
    handleCloseModal(key);
  };

  const handleRequiredCheckboxValue = (key) => {
    let item = LSMFormContainerState.filter((item) => {
      return item.key === key;
    });
    return item[0].isRequiredChecked;
  };

  // handler for setting a form field as "Required" or not in the formSchema
  const handleRequiredCheckbox = (e, key) => {
    let payload = {
      key: key,
      isRequired: e.target.checked,
    };

    actions.setLSMSchemaFieldRequired(payload);
    actions.LSMsetRequiredCheckboxFormContainerState(payload);
  };

  const [formData, setFormData] = useState({});

  // handler for REMOVING a form field from the store
  const handleFieldRemove = (key, formik) => {
    actions.removeLSMSchemaField(key);

    let newFormData = {};
    setFormData(newFormData);

    let payload = {
      key: key,
    };

    actions.LSMRemoveElementFromFormContainerState(payload);

    actions.removeElementFromFormValues(payload);

    formik.setValues({});
    formik.resetForm();
  };

  // return <>{width < mobileBreakpoint ? mobileRender : desktopRender}</>;
  return (
    <>
      {" "}
      <StyledEuiFlexGroup
        direction="row"
        alignItems="center"
        justifyContent="flexEnd"
        responsive={false}
      >
        <EuiFlexGroup responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiPopover
              id="inlineFormPopover"
              button={
                <EuiButtonIcon
                  iconType={Edit}
                  color="subdued"
                  aria-label="Edit form label"
                  display="base"
                  onClick={() => handleOpenModal(key)}
                >
                  Edit
                </EuiButtonIcon>
              }
              isOpen={handleModalOpening(key)}
              closePopover={() => handleCloseModal(key)}
            >
              <div style={{ width: "auto" }}>
                {
                  <EuiForm component="form">
                    <EuiFlexGroup direction="column">
                      <EuiFlexItem>
                        <EuiFlexGroup>
                          <EuiFlexItem>
                            <EuiFormRow label="Field label">
                              <EuiFieldText
                                placeholder="Type here..."
                                onChange={(e) => handleOnChangeLabel(e, key)}
                                value={handleValueLabel(key)}
                              />
                            </EuiFormRow>
                          </EuiFlexItem>
                          <EuiFlexItem grow={false}>
                            <EuiFormRow hasEmptyLabelSpace>
                              <EuiButton
                                onClick={() => handleSaveFieldLabel(key)}
                              >
                                Save
                              </EuiButton>
                            </EuiFormRow>
                          </EuiFlexItem>
                        </EuiFlexGroup>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiForm>
                }
              </div>
            </EuiPopover>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiFlexGroup
              direction="row"
              alignItems="center"
              justifyContent="flexEnd"
              responsive={false}
            >
              <EuiFlexItem grow={false}>
                <EuiSwitch
                  name="switch"
                  label="Required?"
                  value={true}
                  checked={handleRequiredCheckboxValue(key)}
                  onChange={(e) => {
                    handleRequiredCheckbox(e, key);
                  }}
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonIcon
                  iconType={CloseCircle}
                  color="danger"
                  aria-label="Delete field"
                  display="base"
                  onClick={() => {
                    handleFieldRemove(key, formik);
                  }}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </StyledEuiFlexGroup>
    </>
  );
};
