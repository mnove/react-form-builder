import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import "react-responsive-modal/styles.css";
// import { initializeForm } from "../Form_builder/initializeForm";
import {
  initializeForm,
  initializeFormContainerState,
  parseToFormikInitialValues,
} from "../Form_builder";
import { EuiText } from "@elastic/eui";
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
import {
  addNewElementToFormValues,
  initializeLSMFormValues,
  removeElementFromFormValues,
} from "../Form_builder/state-machine/formValues/reducers";
import { sampleFormSchema, sampleInitialFormValues } from "./sampleData"; // Sample data
import { motion } from "framer-motion";
import { FormElementsContainer } from "./FormElementsContainer";
import { FormValidation } from "./FormValidation";
import { FormAddField } from "./FormAddField";
import { FormButtons } from "./FormButtons";
import { FormHeader } from "./FormHeader";
const formSchema = sampleFormSchema; // Form Schema data

function FormContainer({ isEditingMode, ...rest }) {
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
    let formDataValues = parseToFormikInitialValues(LSMFormValuesState);
    if (Object.keys(formDataValues).length === 0) {
      getInitialFormValues();
      return parseToFormikInitialValues(getInitialFormValues());
    } else {
      return parseToFormikInitialValues(LSMFormValuesState);
    }
  };

  let formInitialValues = getFormInitalValues();

  // INITIALIZE the form container state
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
    getFormInitalValues();
  }, []);

  // Re-initialize the form whenerver form schema is updated (e.g. adding new field)
  useEffect(() => {
    let initializedData = initializeForm(LSMFormSchemaState);
    setValidationSchema(Yup.object().shape(initializedData.schemaData));
  }, [LSMFormSchemaState]);

  // Handle form submit button
  const onSubmit = (values, { validateForm, resetForm }) => {
    validateForm(values);
    let JSONFormValues = JSON.stringify(values);
    console.log("JSON FORM VALUES", JSONFormValues);
    //window.alert(JSONFormValues);
    resetForm();
  };

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
            <>
              <Form>
                <FormElementsContainer
                  formik={formik}
                  isEditingMode={isEditingMode}
                  {...rest}
                />
                {!isEditingMode && (
                  <motion.div layout>
                    <FormValidation formik={formik} />
                  </motion.div>
                )}
                {isEditingMode && (
                  <motion.div layout>
                    <FormAddField />
                  </motion.div>
                )}

                <motion.div layout>
                  <FormButtons formSchemaState={LSMFormSchemaState} />
                </motion.div>
              </Form>
            </>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}
export default FormContainer;
