import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { initializeForm } from "./initializeForm";
import { getFormElement } from "./getFormElement";
import {sampleFormSchema} from "./sampleData/sampleFormSchema";
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
import { addNewFieldType, removeFieldType, saveFieldLabel, setFieldRequired } from "./formSchemaStateReducers";
import { formAlertValidation } from "./formAlertValidation";

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

  logger(formData, "Form Data: " );
  logger(validationSchema, "Validation Schema: " );
  logger(formContainerState, "Form Container State: " );
  logger( formSchemaState, "Form Schema State: ");

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
    setFormSchemaState( (previous) => addNewFieldType(previous, newFieldData.newField) );

    // Dispatch formContainerState Update
    setFormContainerState((previous) => addNewField(previous, newKey));
  };

  // handler for REMOVING a form field from the formSchema
  const handleFieldRemove = (key, formik) => {

    // Dispatch formSchemaState Update
    setFormSchemaState(previous => removeFieldType(previous, key))

    let newFormData = {};
    setFormData(newFormData);

    // Dispatch formContainerState Update
    setFormContainerState((previous) => removeField(previous, key));

    formik.setValues({});
    formik.resetForm();
  };

  const onSubmit = (
    values,
    { validateForm, resetForm }
  ) => {
    validateForm(values);
    console.log("Form Data ", values);
    console.log("JSON SUBMIT VALUES", JSON.stringify(values));
    
    let JSONFormSchema = JSON.stringify(formSchemaState)
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
    setFormSchemaState( previous => setFieldRequired(previous, fieldKey, isRequired));

    // Dispatch formContainerState update
    setFormContainerState((previous) =>
      setRequiredCheckboxes(previous, isRequired, fieldKey)
    );
  };

 const handleRequiredCheckboxValue = (key) => {
    return getCheckboxValue (formContainerState, key);
 } 

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
    setFormSchemaState(previous => saveFieldLabel(previous, key, labelToSave));

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

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <h1>FORM EXAMPLE</h1>

            {formSchemaState.map((elem, index) => {
              const key = elem.key;
              return (
                <div className="form-field-container" key={index}>
                  <div className="form-field-controls-container">
                    <div>
                      <button
                        className="btn-delete-field"
                        onClick={() => {
                          handleFieldRemove(key, formik);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z" />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <label className="checkbox-container">
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
                      </label>
                    </div>

                    <div>
                      <button onClick={() => handleOpenModal(key)}>
                        Open modal
                      </button>
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
                      </Modal>
                    </div>
                  </div>

                  {getFormElement(key, elem)}
                </div>
              );
            })}
    
            {console.log("FORMIK", formik)}
            {console.log("FORMIK ERRORS", formik.errors)}
            
            {formAlertValidation(formik)}

            <div className="add-field-control">
              <label htmlFor="cars"> + Add a field</label>
              <select
                name="cars"
                id="cars"
                onChange={(e) => handleFieldTypeAdd(e.target.value, formSchema)}
                value={selectValue}
              >
                <option value="">Select an option</option>
                <option value="textInput">Text Input</option>
                <option value="emailInput">Email Input</option>
                <option value="numberInput">Number Input</option>
              </select>
            </div>

            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}
export default FormContainer;
