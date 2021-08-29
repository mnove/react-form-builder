import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { EuiFormRow, EuiFieldText } from "@elastic/eui";

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
    </>
  );
}

export function EmailField(props) {
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
                type="email"
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
    </>
  );
}

export function NumberField(props) {
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
                type="number"
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
    </>
  );
}
