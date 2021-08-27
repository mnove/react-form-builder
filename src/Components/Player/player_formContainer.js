import React, { useState, useEffect } from "react";
import * as Yup from "yup";

import { Formik, Form } from "formik";
import { getFormElement } from "../getFormElement";
import { initializeForm } from "../initializeForm";
import { sampleFormSchema } from "./player_sampleFormSchema";
import { formAlertValidation } from "../formAlertValidation";
let formSchema = sampleFormSchema;

function FormContainerPlayer() {
  // STATE

  const [formSchemaState, setFormSchemaState] = useState(formSchema);
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    formInitializer();
  }, []);

  const formInitializer = () => {
    let initializedData = initializeForm(formSchemaState);
    setValidationSchema(Yup.object().shape(initializedData.schemaData));
    setFormData(initializedData.formData);
  };

  const onSubmit = (
    values,
    { validate, validateForm, handleSubmit, resetForm }
  ) => {
    validateForm(values);
    console.log("Form Data ", values);
    console.log("JSON SUBMIT VALUES", JSON.stringify(values));
    console.log("JSON FORM SCHEMA", JSON.stringify(formSchemaState));
    console.log("FORM SCHEMA", formSchemaState);
    resetForm();
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
              return getFormElement(key, elem);
            })}

            {formAlertValidation(formik)}

            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormContainerPlayer;
