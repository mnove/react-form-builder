import React from "react";
import { formAlertValidation } from "../../Services";

export const FormValidation = ({ formik }) => {
  return <>{formAlertValidation(formik)}</>;
};
