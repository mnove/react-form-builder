import React from "react";

import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

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
  EuiFieldText,
} from "@elastic/eui";

const errorValidationStyles = {
  border: "1px solid rgb(250, 8, 8)",
};

// export function TextField(props) {
//   const { name, label, placeholder, ...rest } = props;

//   return (
//     <>

//         {label && <label htmlFor={name}>{label}</label>}
//         <Field name={name}>
//           {({ form, field }) => {
//             return (
//               <input
//                 type="text"
//                 {...field}
//                 {...rest}
//                 placeholder={placeholder || ""}
//                 style={
//                   form.errors[name] && form.touched[name]
//                     ? errorValidationStyles
//                     : null
//                 }
//               />
//             );
//           }}
//         </Field>
//         <ErrorMessage name={name} component={TextError} />

//     </>
//   );
// }

export function TextField(props) {
  const { name, label, placeholder, ...rest } = props;

  let fieldLabel = label;
  if (!label) {
    fieldLabel = "Untitled";
  }

  return (
    <>
      <Field name={name}>
        {({ form, field }) => {
          return (
            <EuiFormRow
              label={fieldLabel}
              isInvalid={form.errors[name] && form.touched[name] ? true : false}
              error={<ErrorMessage name={name} component={TextError} />}
            >
              <EuiFieldText
                type="text"
                {...field}
                {...rest}
                placeholder={placeholder || ""}
                isInvalid={
                  form.errors[name] && form.touched[name] ? true : false
                }
              />
            </EuiFormRow>
          );
        }}
      </Field>

      <ErrorMessage name={name} component={TextError} />
    </>
  );
}

export function EmailField(props) {
  const { name, label, placeholder, ...rest } = props;

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Field name={name}>
        {({ form, field }) => {
          return (
            <input
              type="email"
              {...field}
              {...rest}
              placeholder={placeholder || ""}
              style={
                form.errors[name] && form.touched[name]
                  ? errorValidationStyles
                  : null
              }
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </>
  );
}

export function NumberField(props) {
  const { name, label, placeholder, ...rest } = props;

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Field name={name}>
        {({ form, field }) => {
          return (
            <input
              type="number"
              {...field}
              {...rest}
              placeholder={placeholder || ""}
              style={
                form.errors[name] && form.touched[name]
                  ? errorValidationStyles
                  : null
              }
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </>
  );
}
