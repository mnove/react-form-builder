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
  parseToFormikInitialValues,
} from "../Form_builder";

// import {
//   addNewField,
//   getCheckboxValue,
//   getLabelValue,
//   getModalValue,
//   removeField,
//   setLabelValue,
//   setModalClose,
//   setModalOpen,
//   setRequiredCheckboxes,
//   addSchemaField,
//   removeSchemaField,
//   saveSchemaFieldLabel,
//   setSchemaFieldRequired,
// } from "../Form_builder/reducers";
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
  setLSMSchemaLabelField,
} from "../Form_builder/state-machine/formSchema/reducers";
import {
  LSMAddNewElementToFormContainerState,
  LSMinitializeFormContainerState,
  LSMRemoveElementFromFormContainerState,
  LSMsetLabelValue,
  LSMsetModalState,
  LSMsetRequiredCheckboxFormContainerState,
} from "../Form_builder/state-machine/formState/reducers";
import { getCurrentLabelValue } from "../Form_builder/state-machine/formSchema/utils";
import {
  addNewElementToFormValues,
  initializeLSMFormValues,
  removeElementFromFormValues,
} from "../Form_builder/state-machine/formValues/reducers";

// Sample data
import { sampleFormSchema, sampleInitialFormValues } from "./sampleData";
// Form Schema data
const formSchema = sampleFormSchema;

function FormContainer() {
  const { actions, state } = useStateMachine({
    initializeLSMFormSchema,
    addLSMSchemaField,
    removeLSMSchemaField,
    setLSMSchemaFieldRequired,
    setLSMSchemaLabelField,
    LSMinitializeFormContainerState,
    LSMAddNewElementToFormContainerState,
    LSMRemoveElementFromFormContainerState,
    LSMsetRequiredCheckboxFormContainerState,
    LSMsetModalState,
    LSMsetLabelValue,
    initializeLSMFormValues,
    addNewElementToFormValues,
    removeElementFromFormValues,
  });

  // STATE //
  // global FORM SCHEMA (little state machine)
  const LSMFormSchemaState = state.formSchemaState;
  // global FORM CONTAINER STATE (Little state machine)
  const LSMFormContainerState = state.formContainerState;
  // global FORM VALUES STATE (Little state machine)
  const LSMFormValuesState = state.formValuesState;

  //const [formSchemaState, setFormSchemaState] = useState(state.formSchemaState);

  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  console.log("called function");

  const getInitialFormValues = () => {
    let initialFormValues = sampleInitialFormValues;
    actions.initializeLSMFormValues(initialFormValues);

    return initialFormValues;
  };

  // const parseFormInitialValues = (valuesToParse) => {
  //   let newArray = {};
  //   valuesToParse.forEach((element) => {
  //     newArray[element.key] = element.fieldValue;
  //   });

  //   return newArray;
  // };

  const getFormInitalValues = () => {
    console.log(LSMFormValuesState);
    let formDataValues = parseToFormikInitialValues(LSMFormValuesState);
    if (Object.keys(formDataValues).length === 0) {
      getInitialFormValues();
      return parseToFormikInitialValues(getInitialFormValues());
    } else {
      return parseToFormikInitialValues(LSMFormValuesState);
    }
  };

  let formInitialValues = getFormInitalValues();
  console.log(formInitialValues);

  const initializeEmptyForm = () => {
    // An Empty form is initialized with some sample data
    let initializedData = initializeForm(sampleFormSchema);
    let initialFormContainerState =
      initializeFormContainerState(sampleFormSchema);

    // Dispatch state update (LSM)
    actions.initializeLSMFormSchema(sampleFormSchema);
    actions.LSMinitializeFormContainerState(initialFormContainerState);

    // Set validation schema and form data
    setValidationSchema(Yup.object().shape(initializedData.schemaData));
    setFormData(initializedData.formData);
  };

  // INITIALIZE the form schema, setting Form Data and Yup Validation Schema
  const formInitializer = () => {
    // if form schema is empty initialize the form with sample data,
    // otherwise use available data
    if (LSMFormSchemaState[0] === undefined) {
      initializeEmptyForm();
      return;
    } else {
      // Initialize form with provided form schema and form container state
      let initializedData = initializeForm(LSMFormSchemaState);
      let initialFormContainerState =
        initializeFormContainerState(LSMFormSchemaState);

      // Dispatch state update (LSM)
      actions.initializeLSMFormSchema(LSMFormSchemaState);
      actions.LSMinitializeFormContainerState(initialFormContainerState);

      // Set validation schema and form data
      setValidationSchema(Yup.object().shape(initializedData.schemaData));
      setFormData(initializedData.formData);
    }
  };

  // Initialize form on first render
  useEffect(() => {
    formInitializer();
    //getInitialFormValues();
    getFormInitalValues();
  }, []);

  // Re-initialize the form whenerver form schema is updated (e.g. adding new field)
  useEffect(() => {
    let initializedData = initializeForm(LSMFormSchemaState);
    setValidationSchema(Yup.object().shape(initializedData.schemaData));
  }, [LSMFormSchemaState]);

  //logger(formData, "Form Data: ");
  //logger(validationSchema, "Validation Schema: ");
  //logger(formContainerState, "Form Container State: ");
  //logger(formSchemaState, "Form Schema State: ");

  // tracking changes on the formSchemaState - as the state updates, we initialize the form again with the latest state data
  // useEffect(() => {
  //   formInitializer(); // re-initialize the form
  //   setSelectValue("");
  //   console.log(state.formSchemaState);
  // }, [state.formSchemaState]);

  // useEffect(() => {
  //   formInitializer(); // re-initialize the form

  //   setSelectValue("");
  // }, [LSMFormSchemaState]);

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

  // handler for REMOVING a form field from the store
  const handleFieldRemove = (key, formik) => {
    actions.removeLSMSchemaField(key);
    // console.log(state.formSchemaState);
    let newFormData = {};
    setFormData(newFormData);

    let payload = {
      key: key,
    };

    actions.LSMRemoveElementFromFormContainerState(payload);
    // console.log(state.formSchemaState);

    actions.removeElementFromFormValues(payload);

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

    actions.setLSMSchemaFieldRequired(payload);
    actions.LSMsetRequiredCheckboxFormContainerState(payload);
  };

  const handleRequiredCheckboxValue = (key) => {
    let item = LSMFormContainerState.filter((item) => {
      return item.key === key;
    });
    return item[0].isRequiredChecked;
  };

  // display the correct label value inside the modal input
  const handleValueLabel = (key) => {
    let item = LSMFormContainerState.filter((item) => {
      return item.key === key;
    });
    return item[0].labelValue;
  };

  const handleOnChangeLabel = (e, key) => {
    let payload = {
      labelKey: key,
      labelValue: e.target.value,
    };
    actions.LSMsetLabelValue(payload);
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

  const handleOpenModal = (key) => {
    let payload = {
      modalKey: key,
      isModalOpened: true,
    };

    actions.LSMsetModalState(payload);
  };

  const handleCloseModal = (key) => {
    let payload = {
      modalKey: key,
      isModalOpened: false,
    };
    actions.LSMsetModalState(payload);
  };

  const handleModalOpening = (key) => {
    let item = LSMFormContainerState.filter((item) => {
      return item.key === key;
    });
    return item[0].isModalOpened;
  };

  console.log(LSMFormValuesState);
  console.log(formData);

  //let formDataValues = parseFormInitialValues(LSMFormValuesState);

  return (
    <React.Fragment key={"1001"}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        key={"1001"}
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
                      {getFormElement(key, elem)}
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

                {/* <button onClick={handleCreationFormSchema}>
                Create Schema to LSM
              </button> */}
              </EuiFlexGroup>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}
export default FormContainer;
