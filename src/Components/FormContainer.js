import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";

import "react-responsive-modal/styles.css";
// import { initializeForm } from "../Form_builder/initializeForm";
import {
  initializeForm,
  getFormElement,
  initializeFormContainerState,
  fieldTypeControls,
  formAlertValidation,
} from "../Form_builder";
import { sampleFormSchema } from "./sampleData/sampleFormSchema";
import {
  addNewField,
  getCheckboxValue,
  getLabelValue,
  getModalValue,
  removeField,
  setLabelValue,
  setModalClose,
  setModalOpen,
  setRequiredCheckboxes,
  addSchemaField,
  removeSchemaField,
  saveSchemaFieldLabel,
  setSchemaFieldRequired,
} from "../Form_builder/reducers";
import { logger } from "../utils/logger";

import {
  EuiText,
  EuiButtonIcon,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
  EuiFormRow,
  EuiSelect,
  EuiPopover,
  EuiForm,
  EuiFieldText,
  EuiHorizontalRule,
} from "@elastic/eui";

import {
  AddFormFieldPanel,
  FormFieldPanel,
} from "./styled-components/formStyles";

import { CloseCircle } from "@styled-icons/remix-fill/CloseCircle";
import { Edit } from "@styled-icons/remix-fill/Edit";

import { useStateMachine } from "little-state-machine";
import {
  initializeLSMFormSchema,
  addLSMSchemaField,
  removeLSMSchemaField,
  setLSMSchemaFieldRequired,
} from "../Form_builder/state-machine/formSchema/reducers";
import {
  LSMAddNewElementToFormContainerState,
  LSMRemoveElementFromFormContainerState,
  // LSMAddNewFieldCheckbox,
  // LSMAddNewValueLabel,
} from "../Form_builder/state-machine/formState/reducers";

// Form Schema data
const formSchema = sampleFormSchema;

function FormContainer() {
  const { actions, state } = useStateMachine({
    initializeLSMFormSchema,
    addLSMSchemaField,
    removeLSMSchemaField,
    setLSMSchemaFieldRequired,
    // LSMAddNewFieldCheckbox,
    // LSMAddNewValueLabel,
    LSMAddNewElementToFormContainerState,
    LSMRemoveElementFromFormContainerState,
  });

  // global FORM SCHEMA (little state machine)
  const LSMFormSchemaState = state.formSchemaState;

  const handleCreationFormSchema = () => {
    actions.initializeLSMFormSchema(sampleFormSchema);
    console.log(state);
  };

  const [formSchemaState, setFormSchemaState] = useState(state.formSchemaState);

  // STATE
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  let initialFormContainerState =
    initializeFormContainerState(LSMFormSchemaState);
  const [formContainerState, setFormContainerState] = useState(
    initialFormContainerState
  );

  useEffect(() => {
    formInitializer();
  }, []);

  // initialize the form schema, setting Form Data and Yup Validation Schema
  const formInitializer = () => {
    let initializedData = initializeForm(state.formSchemaState);
    setValidationSchema(Yup.object().shape(initializedData.schemaData));
    setFormData(initializedData.formData);
  };

  logger(formData, "Form Data: ");
  logger(validationSchema, "Validation Schema: ");
  logger(formContainerState, "Form Container State: ");
  logger(formSchemaState, "Form Schema State: ");

  const [selectValue, setSelectValue] = useState("");

  // tracking changes on the formSchemaState - as the state updates, we initialize the form again with the latest state data
  useEffect(() => {
    formInitializer(); // re-initialize the form
    setSelectValue("");
    console.log(state.formSchemaState);
  }, [state.formSchemaState]);

  // useEffect(() => {
  //   formInitializer(); // re-initialize the form
  //   setSelectValue("");
  // }, [formSchemaState]);

  // handler for ADDING a new field type to the form schema
  const handleFieldTypeAdd = (value, formSchema) => {
    let newFieldData = fieldTypeControls(value, formSchema);
    let newKey = newFieldData.newField.key;

    // Dispatch formSchemaState Update
    // setFormSchemaState((previous) =>
    //   addSchemaField(previous, newFieldData.newField)
    // );

    actions.addLSMSchemaField(newFieldData.newField);
    console.log(state.formSchemaState);

    // Dispatch formContainerState Update
    setFormContainerState((previous) => addNewField(previous, newKey));

    let newFieldElementState = {
      key: newKey,
      isRequiredChecked: false,
      labelValue: "Default label",
      isModalOpened: false,
    };

    actions.LSMAddNewElementToFormContainerState(newFieldElementState);
    console.log(state);
  };

  // handler for REMOVING a form field from the formSchema
  const handleFieldRemove = (key, formik) => {
    // Dispatch formSchemaState Update
    // setFormSchemaState((previous) => removeSchemaField(previous, key));

    actions.removeLSMSchemaField(key);
    console.log(state.formSchemaState);

    let newFormData = {};
    setFormData(newFormData);

    let payload = {
      key: key,
    };

    actions.LSMRemoveElementFromFormContainerState(payload);
    console.log(state.formSchemaState);

    // Dispatch formContainerState Update
    setFormContainerState((previous) => removeField(previous, key));

    formik.setValues({});
    formik.resetForm();
  };

  // Handle form submit button
  const onSubmit = (values, { validateForm, resetForm }) => {
    validateForm(values);
    let JSONFormValues = JSON.stringify(values);
    console.log("JSON FORM VALUES", JSONFormValues);
    //window.alert(JSONFormValues);
    resetForm();
  };

  // Get the current form schema as JSON
  const getFormSchema = () => {
    let JSONFormSchema = JSON.stringify(LSMFormSchemaState);
    console.log("JSON FORM SCHEMA", JSONFormSchema);
    window.alert(JSONFormSchema);
    return JSONFormSchema;
  };

  // handler for setting a form field as "Required" or not in the formSchema
  const handleRequiredCheckbox = (e, key) => {
    let payload = {
      key: key,
      isRequired: e.target.checked,
    };
    let isRequired = e.target.checked;
    let fieldKey = key;

    // Dispatch formSchemaState Update
    // setFormSchemaState((previous) =>
    //   setSchemaFieldRequired(previous, fieldKey, isRequired)
    // );

    actions.setLSMSchemaFieldRequired(payload);
    console.log(state.formSchemaState);

    console.log(state);

    // Dispatch formContainerState update
    // setFormContainerState((previous) =>
    //   setRequiredCheckboxes(state.formSchemaState, isRequired, fieldKey)
    // );
  };

  const handleRequiredCheckboxValue = (key) => {
    return getCheckboxValue(formContainerState, key);
  };

  // display the correct label value inside the modal input
  const handleValueLabel = (key) => {
    return getLabelValue(formContainerState, key);
  };

  const handleOnChangeLabel = (e, key) => {
    let labelValue = e.target.value;
    setFormContainerState((previous) =>
      setLabelValue(previous, key, labelValue)
    );
  };

  const handleSaveFieldLabel = (key) => {
    let labelToSave = handleValueLabel(key);

    // Dispatch Form schema State Update
    setFormSchemaState((previous) =>
      saveSchemaFieldLabel(previous, key, labelToSave)
    );

    // Dispatch closing the targeted modal on save
    let modalKey = key;
    setFormContainerState((previous) => setModalClose(previous, modalKey));
  };

  const handleOpenModal = (key) => {
    let modalKey = key;
    setFormContainerState((previous) => setModalOpen(previous, modalKey));
  };

  const handleCloseModal = (key) => {
    let modalKey = key;
    setFormContainerState((previous) => setModalClose(previous, modalKey));
  };

  const handleModalOpening = (key) => {
    return getModalValue(formContainerState, key);
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <EuiText>
              <h1>YOUR FORM</h1>
            </EuiText>
            {LSMFormSchemaState.map((elem, index) => {
              const key = elem.key;
              return (
                <>
                  <FormFieldPanel
                    hasShadow={false}
                    hasBorder={true}
                    key={index}
                  >
                    <EuiFlexGroup
                      direction="row"
                      alignItems="center"
                      justifyContent="flexEnd"
                    >
                      <EuiFlexItem grow={false}>
                        <EuiPopover
                          id="inlineFormPopover"
                          button={
                            <EuiButtonIcon
                              iconType={Edit}
                              color="secondary"
                              aria-label="Edit form label"
                              display="base"
                              fill
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
                                            onChange={(e) =>
                                              handleOnChangeLabel(e, key)
                                            }
                                            value={handleValueLabel(key)}
                                          />
                                        </EuiFormRow>
                                      </EuiFlexItem>
                                      <EuiFlexItem grow={false}>
                                        <EuiFormRow hasEmptyLabelSpace>
                                          <EuiButton
                                            onClick={() =>
                                              handleSaveFieldLabel(key)
                                            }
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
                    {getFormElement(
                      key,
                      elem,
                      formSchemaState,
                      formContainerState
                    )}
                  </FormFieldPanel>
                </>
              );
            })}

            {console.log("FORMIK", formik)}
            {console.log("FORMIK ERRORS", formik.errors)}

            {formAlertValidation(formik)}
            <AddFormFieldPanel hasShadow={false}>
              <EuiFormRow label="Add a field">
                <EuiSelect
                  hasNoInitialSelection
                  options={[
                    { value: "textInput", text: "Text Input" },
                    { value: "emailInput", text: "Email Input" },
                    { value: "numberInput", text: "Number Input" },
                    { value: "radioGroupInput", text: "Radio Input" },
                  ]}
                  onChange={(e) =>
                    handleFieldTypeAdd(e.target.value, formSchema)
                  }
                  value={selectValue}
                />
              </EuiFormRow>
            </AddFormFieldPanel>

            <EuiFlexGroup>
              <EuiFlexItem grow={false}>
                <EuiButton color="text">Reset Form</EuiButton>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButton type="submit" color="secondary">
                  Submit
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>

            <EuiHorizontalRule></EuiHorizontalRule>
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiButton
                  type="submit"
                  color="text"
                  size="s"
                  onClick={() => getFormSchema()}
                >
                  Print Schema to console
                </EuiButton>
              </EuiFlexItem>

              <button onClick={handleCreationFormSchema}>
                Create Schema to LSM
              </button>
            </EuiFlexGroup>
          </Form>
        );
      }}
    </Formik>
  );
}
export default FormContainer;
