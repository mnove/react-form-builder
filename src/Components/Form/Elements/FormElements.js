import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";
import {
  EuiFormRow,
  EuiFieldText,
  EuiHorizontalRule,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import { AddCircle } from "@styled-icons/remix-fill/AddCircle";
import { RadioInput } from "./Radio/RadioInput";
import { nanoid } from "nanoid";
import { useStateMachine } from "little-state-machine";
import {
  addLSMShemaRadioOption,
  addLSMShemaCheckboxOption,
} from "../../../Form_builder/state-machine/formSchema/reducers";

import { motion } from "framer-motion";
import { CheckboxInput } from "./Checkbox";

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

// RADIO INPUT
export function RadioGroupField(props) {
  const { actions } = useStateMachine({
    addLSMShemaRadioOption,
  });

  const { name, label, placeholder, options, fielddata, mode, ...rest } = props;

  const isEditingMode = mode;

  let fieldLabel = label;
  if (!label) {
    fieldLabel = "Untitled";
  }
  let radioOptions = fielddata.radioOptions;

  const handleAddRadioOptionToField = () => {
    let paylaod = {
      fieldKey: name,
      newOption: {
        key: `radio_opt_${nanoid()}`,
        label: "Untitled",
      },
    };
    actions.addLSMShemaRadioOption(paylaod);
  };

  return (
    <>
      <motion.div layout>
        <Field name={name} key={name}>
          {({ form, field }) => {
            return (
              <>
                <EuiFormRow
                  label={fieldLabel}
                  isInvalid={
                    form.errors[name] && form.touched[name] ? true : false
                  }
                  error={<ErrorMessage name={name} component={TextError} />}
                >
                  <div style={{ marginTop: 5 }}>
                    <EuiFlexGroup
                      direction="column"
                      alignItems="flexStart"
                      justifyContent="center"
                    >
                      {radioOptions.map((option, index) => {
                        return (
                          <React.Fragment key={index}>
                            <EuiFlexItem>
                              <motion.div layout>
                                <RadioInput
                                  index={index}
                                  option={option}
                                  placeholder={placeholder}
                                  name={name}
                                  form={form}
                                  field={field}
                                  isEditingMode={isEditingMode}
                                />
                              </motion.div>
                            </EuiFlexItem>
                          </React.Fragment>
                        );
                      })}
                    </EuiFlexGroup>
                  </div>
                </EuiFormRow>
              </>
            );
          }}
        </Field>
      </motion.div>

      {isEditingMode && (
        <>
          <EuiHorizontalRule />

          <EuiButton
            onClick={handleAddRadioOptionToField}
            size="s"
            color="text"
            iconType={AddCircle}
          >
            Add option
          </EuiButton>
        </>
      )}
    </>
  );
}

// CHECKBOX INPUT
export function CheckboxGroupField(props) {
  const { actions } = useStateMachine({
    addLSMShemaCheckboxOption,
  });

  const { name, label, placeholder, options, fielddata, mode, ...rest } = props;

  const isEditingMode = mode;

  let fieldLabel = label;
  if (!label) {
    fieldLabel = "Untitled";
  }
  let checkboxOptions = fielddata.checkboxOptions;

  const handleAddCheckboxOptionToField = () => {
    let payload = {
      fieldKey: name,
      newOption: {
        key: `check_opt_${nanoid()}`,
        label: "Untitled",
      },
    };
    actions.addLSMShemaCheckboxOption(payload);
  };

  return (
    <>
      <motion.div layout>
        <Field name={name} key={name}>
          {({ form, field }) => {
            return (
              <>
                <EuiFormRow
                  label={fieldLabel}
                  isInvalid={
                    form.errors[name] && form.touched[name] ? true : false
                  }
                  error={<ErrorMessage name={name} component={TextError} />}
                  style={{ width: "100%" }}
                >
                  <div style={{ marginTop: 5 }}>
                    <EuiFlexGroup
                      direction="column"
                      alignItems="flexStart"
                      justifyContent="center"
                    >
                      {checkboxOptions.map((option, index) => {
                        return (
                          <React.Fragment key={index}>
                            <EuiFlexItem>
                              <motion.div layout>
                                <CheckboxInput
                                  index={index}
                                  option={option}
                                  placeholder={placeholder}
                                  name={name}
                                  form={form}
                                  field={field}
                                  isEditingMode={isEditingMode}
                                />
                              </motion.div>
                            </EuiFlexItem>
                          </React.Fragment>
                        );
                      })}
                    </EuiFlexGroup>
                  </div>
                </EuiFormRow>
              </>
            );
          }}
        </Field>
      </motion.div>

      {isEditingMode && (
        <>
          <EuiHorizontalRule />

          <EuiButton
            onClick={handleAddCheckboxOptionToField}
            size="s"
            color="text"
            iconType={AddCircle}
          >
            Add option
          </EuiButton>
        </>
      )}
    </>
  );
}
