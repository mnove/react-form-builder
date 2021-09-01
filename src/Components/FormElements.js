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

import { useStateMachine } from "little-state-machine";
import { addLSMShemaRadioOption } from "../Form_builder/state-machine/formSchema/reducers";

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
      <Field name={name} key={name}>
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
  const { actions, state } = useStateMachine({
    addLSMShemaRadioOption,
  });

  const { name, label, placeholder, options, fieldData, ...rest } = props;

  console.log(fieldData);

  let fieldLabel = label;
  if (!label) {
    fieldLabel = "Untitled";
  }

  let radioOptions = fieldData.radioOptions;

  // if (!options) {
  //   radioOptions = defaultRadioOptions;
  // }

  const [radioIdSelected, setRadioIdSelected] = useState(`${idPrefix}1`);
  const onChange = (optionId) => {
    setRadioIdSelected(optionId);
    console.log(optionId);
    console.log(radioIdSelected);
  };

  const handleAddRadioOptionToField = () => {
    console.log(name);
    let paylaod = {
      fieldKey: name,
      newOption: {
        id: `${nanoid()}`,
        value: "Untitled",
      },
    };

    actions.addLSMShemaRadioOption(paylaod);
    console.log("Added");

    // Add the new form option to the whole form schema state.
    // >> Create a specific set of reducers to just handle changes for radio buttons
    // >> Keep the form state updated as the schema gets modified
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field name={name} key={name}>
        {({ form, field }) => {
          return radioOptions.map((option, index) => {
            return (
              <React.Fragment key={index}>
                {/* <EuiFormRow
              label={fieldLabel}
              isInvalid={form.errors[name] && form.touched[name] ? true : false}
              error={<ErrorMessage name={name} component={TextError} />}
            > */}
                <input
                  type="radio"
                  id={option.id}
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
              </React.Fragment>
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
