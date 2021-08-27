import React from "react";

import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const errorValidationStyles = {
  border: "1px solid rgb(250, 8, 8)",
};

export function TextField(props) {
  const { name, label, placeholder, ...rest } = props;

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Field name={name}>
        {({ form, field }) => {
          return (
            <input
              type="text"
              {...field}
              {...rest}
              placeholder={placeholder || ""}
              style={form.errors[name] && form.touched[name] ? errorValidationStyles : null}
            />
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
                style={form.errors[name] && form.touched[name] ? errorValidationStyles : null}
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
                style={form.errors[name] && form.touched[name] ? errorValidationStyles : null}
              />
            );
          }}
        </Field>
        <ErrorMessage name={name} component={TextError} />
      </>
    );
  }
  
