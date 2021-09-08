import React from "react";

import "react-responsive-modal/styles.css";
// import { initializeForm } from "../Form_builder/initializeForm";
import { fieldTypeControls } from "../../Services";
import { EuiFormRow, EuiSelect, EuiPanel } from "@elastic/eui";
import { useStateMachine } from "little-state-machine";
import { addLSMSchemaField } from "../../Services/state-machine/formSchema/reducers";
import { LSMAddNewElementToFormContainerState } from "../../Services/state-machine/formState/reducers";
import { addNewElementToFormValues } from "../../Services/state-machine/formValues/reducers";
// Sample data
import { sampleFormSchema } from "../sampleData";

import styled from "styled-components";

const AddFormFieldPanel = styled(EuiPanel)`
  margin: 1rem 0rem;
  border: 2px solid rgba(0, 191, 179, 0.2);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const formSchema = sampleFormSchema;

export const FormAddField = () => {
  const { actions, state } = useStateMachine({
    addLSMSchemaField,
    LSMAddNewElementToFormContainerState,
    addNewElementToFormValues,
  });
  // handler for ADDING a new field type to the store
  const handleFieldTypeAdd = (value, formSchema) => {
    let newFieldData = fieldTypeControls(value, formSchema); // get correct field type
    let newKey = newFieldData.newField.key;

    // Update formSchemaState with schema data of the new field
    actions.addLSMSchemaField(newFieldData.newField);

    // Update formContainerState with the new field
    let newFieldElementState = {
      key: newKey,
      isRequiredChecked: false,
      labelValue: "Default label",
      isModalOpened: false,
    };
    actions.LSMAddNewElementToFormContainerState(newFieldElementState);

    // Update formValuesState with initial field data for the new field
    let newFieldElementInitialValue = {
      key: newKey,
      fieldValue: "",
    };
    actions.addNewElementToFormValues(newFieldElementInitialValue);
  };

  return (
    <>
      <AddFormFieldPanel hasShadow={false}>
        <EuiFormRow label="Add a field">
          <EuiSelect
            hasNoInitialSelection
            options={[
              { value: "textInput", text: "Text Input" },
              { value: "emailInput", text: "Email Input" },
              { value: "numberInput", text: "Number Input" },
              { value: "radioGroupInput", text: "Radio Input" },
              { value: "checkboxGroupInput", text: "Checkbox Input" },
            ]}
            onChange={(e) => handleFieldTypeAdd(e.target.value, formSchema)}
          />
        </EuiFormRow>
      </AddFormFieldPanel>
    </>
  );
};
