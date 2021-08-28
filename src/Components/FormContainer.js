import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { initializeForm } from "./initializeForm";
import { getFormElement } from "./getFormElement";
import { sampleFormSchema } from "./sampleData/sampleFormSchema";
import { fieldTypeControls } from "./fieldTypeControls";
import { initializeFormContainerState } from "./formContainerStateInitializer";
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
} from "./formStateReducers";
import { logger } from "../utils/logger";
import {
  addNewFieldType,
  removeFieldType,
  saveFieldLabel,
  setFieldRequired,
} from "./formSchemaStateReducers";
import { formAlertValidation } from "./formAlertValidation";

import {
  EuiText,
  EuiPanel,
  EuiButtonIcon,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiSwitch,
  EuiFormRow,
  EuiSelect,
  EuiPopover,
  EuiForm,
  EuiFieldText,
} from "@elastic/eui";

import { styled } from "styled-components";
import {
  AddFormFieldPanel,
  FormFieldContainer,
  FormFieldPanel,
} from "./styled-components/formStyles";

import { CloseCircle } from "@styled-icons/remix-fill/CloseCircle";
import { Edit } from "@styled-icons/remix-fill/Edit";

// Form Schema data
const formSchema = sampleFormSchema;

function FormContainer() {
  const [formSchemaState, setFormSchemaState] = useState(formSchema);

  // STATE
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  let initialFormContainerState = initializeFormContainerState(formSchemaState);
  const [formContainerState, setFormContainerState] = useState(
    initialFormContainerState
  );

  useEffect(() => {
    formInitializer();
  }, []);

  // initialize the form schema, setting Form Data and Yup Validation Schema
  const formInitializer = () => {
    let initializedData = initializeForm(formSchemaState);
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
  }, [formSchemaState]);

  // handler for ADDING a new field type to the form schema
  const handleFieldTypeAdd = (value, formSchema) => {
    let newFieldData = fieldTypeControls(value, formSchema);
    let newKey = newFieldData.newField.key;

    // Dispatch formSchemaState Update
    setFormSchemaState((previous) =>
      addNewFieldType(previous, newFieldData.newField)
    );

    // Dispatch formContainerState Update
    setFormContainerState((previous) => addNewField(previous, newKey));
  };

  // handler for REMOVING a form field from the formSchema
  const handleFieldRemove = (key, formik) => {
    // Dispatch formSchemaState Update
    setFormSchemaState((previous) => removeFieldType(previous, key));

    let newFormData = {};
    setFormData(newFormData);

    // Dispatch formContainerState Update
    setFormContainerState((previous) => removeField(previous, key));

    formik.setValues({});
    formik.resetForm();
  };

  const onSubmit = (values, { validateForm, resetForm }) => {
    validateForm(values);
    console.log("Form Data ", values);
    console.log("JSON SUBMIT VALUES", JSON.stringify(values));

    let JSONFormSchema = JSON.stringify(formSchemaState);
    console.log("JSON FORM SCHEMA", JSONFormSchema);
    window.alert(JSONFormSchema);
    console.log("FORM SCHEMA", formSchemaState);
    resetForm();
  };

  // handler for setting a form field as "Required" or not in the formSchema
  const handleRequiredCheckbox = (e, key) => {
    let isRequired = e.target.checked;
    let fieldKey = key;

    // Dispatch formSchemaState Update
    setFormSchemaState((previous) =>
      setFieldRequired(previous, fieldKey, isRequired)
    );

    // Dispatch formContainerState update
    setFormContainerState((previous) =>
      setRequiredCheckboxes(previous, isRequired, fieldKey)
    );
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
      saveFieldLabel(previous, key, labelToSave)
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
            {formSchemaState.map((elem, index) => {
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
                        {/* <EuiButtonIcon
                          iconType={Edit}
                          color="secondary"
                          aria-label="Edit form label"
                          display="base"
                          onClick={() => handleOpenModal(key)}
                        />

                        <Modal
                          open={handleModalOpening(key)}
                          onClose={() => handleCloseModal(key)}
                          center
                          animationDuration="100"
                          key={index}
                        >
                          <h2>Edit form field label</h2>
                          <input
                            type="text"
                            onChange={(e) => handleOnChangeLabel(e, key)}
                            value={handleValueLabel(key)}
                          />
                          <button onClick={() => handleSaveFieldLabel(key)}>
                            Save
                          </button>
                        </Modal> */}

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

                        {/* <label className="checkbox-container">
                          Required?
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              handleRequiredCheckbox(e, key);
                            }}
                            value={true}
                            checked={handleRequiredCheckboxValue(key)}
                          />
                          <span className="checkmark"></span>
                        </label> */}
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
                  ]}
                  onChange={(e) =>
                    handleFieldTypeAdd(e.target.value, formSchema)
                  }
                  value={selectValue}
                />
              </EuiFormRow>

              {/* <select
                name="cars"
                id="cars"
                onChange={(e) => handleFieldTypeAdd(e.target.value, formSchema)}
                value={selectValue}
              >
                <option value="">Select an option</option>
                <option value="textInput">Text Input</option>
                <option value="emailInput">Email Input</option>
                <option value="numberInput">Number Input</option>
              </select> */}
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
          </Form>
        );
      }}
    </Formik>
  );
}
export default FormContainer;
