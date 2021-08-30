import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import {
  EuiFormRow,
  EuiFieldText,
  EuiRadioGroup,
  EuiRadio,
  EuiHorizontalRule,
  EuiButton,
} from "@elastic/eui";
import { nanoid } from "nanoid";
import { addRadioOption } from "../Form_builder/reducers/radio/radioSchemaStateReducer";

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

const idPrefix = nanoid(10);

let defaultRadioOptions = [
  {
    id: `${idPrefix}0`,
    value: "Option one",
  },
  {
    id: `${idPrefix}1`,
    value: "Option two",
  },
];

export function RadioGroupField(props) {
  const {
    name,
    label,
    placeholder,
    options,
    formSchemaState,
    formContainerState,
    ...rest
  } = props;

  console.log(name);
  let fieldLabel = label;
  if (!label) {
    fieldLabel = "Untitled";
  }

  let radioOptions = options;

  if (!options) {
    radioOptions = defaultRadioOptions;
  }

  const [radioIdSelected, setRadioIdSelected] = useState(`${idPrefix}1`);
  const onChange = (optionId) => {
    setRadioIdSelected(optionId);
    console.log(optionId);
    console.log(radioIdSelected);
  };

  const handleAddRadioOptionToField = () => {
    let newOption = {
      id: `${nanoid()}`,
      value: "Another option",
    };
    console.log("Added");
    // Add the new form option to the whole form schema state.
    // >> Create a specific set of reducers to just handle changes for radio buttons
    // >> Keep the form state updated as the schema gets modified

    addRadioOption(formSchemaState, name, newOption);
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          return radioOptions.map((option) => {
            return (
              <>
                {/* <EuiFormRow
              label={fieldLabel}
              isInvalid={form.errors[name] && form.touched[name] ? true : false}
              error={<ErrorMessage name={name} component={TextError} />}
            > */}
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                  // label="Option one"
                  // // onChange={(id) => onChange(id)}
                  // name="radio group"
                  // placeholder={placeholder || ""}
                  // isInvalid={
                  //   form.errors[name] && form.touched[name] ? true : false
                  // }
                />
                <label htmlFor={option.value}>{option.value}</label>

                {/* <EuiRadioGroup
                {...field}
                {...rest}
                value={"Option one"}
                options={radioOptions}
                idSelected={radioIdSelected}
                onChange={(id) => onChange(id)}
                name="radio group"
                legend={{
                  children: <span>{fieldLabel}</span>,
                }}
                placeholder={placeholder || ""}
                isInvalid={
                  form.errors[name] && form.touched[name] ? true : false
                }
              /> */}
                {/* </EuiFormRow> */}
              </>
            );
          });

          return (
            <>
              {/* <EuiFormRow
              label={fieldLabel}
              isInvalid={form.errors[name] && form.touched[name] ? true : false}
              error={<ErrorMessage name={name} component={TextError} />}
            > */}
              <EuiRadio
                type="radio"
                {...field}
                {...rest}
                value={"Option one"}
                checked="Option one"
                label="Option one"
                // onChange={(id) => onChange(id)}
                name="radio group"
                placeholder={placeholder || ""}
                isInvalid={
                  form.errors[name] && form.touched[name] ? true : false
                }
              />

              {/* <EuiRadioGroup
                {...field}
                {...rest}
                value={"Option one"}
                options={radioOptions}
                idSelected={radioIdSelected}
                onChange={(id) => onChange(id)}
                name="radio group"
                legend={{
                  children: <span>{fieldLabel}</span>,
                }}
                placeholder={placeholder || ""}
                isInvalid={
                  form.errors[name] && form.touched[name] ? true : false
                }
              /> */}
              {/* </EuiFormRow> */}
            </>
          );
        }}
      </Field>

      <EuiHorizontalRule />

      <EuiButton onClick={handleAddRadioOptionToField}>+ Add Field</EuiButton>
    </>
  );
}
