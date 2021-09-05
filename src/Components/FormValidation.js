import React from "react";

import { formAlertValidation } from "../Form_builder";

export const FormValidation = ({ formik }) => {
  return <>{formAlertValidation(formik)}</>;
};
