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
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from "@elastic/eui";

import { AddCircle } from "@styled-icons/remix-fill/AddCircle";

import { nanoid } from "nanoid";
import { addRadioOption } from "../Form_builder/reducers/radio/radioSchemaStateReducer";

import { useStateMachine } from "little-state-machine";
import { addLSMShemaRadioOption } from "../Form_builder/state-machine/formSchema/reducers";
import { RadioInput } from "./RadioInput";

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

  const handleAddRadioOptionToField = () => {
    console.log(name);
    let paylaod = {
      fieldKey: name,
      newOption: {
        key: `radio_opt_${nanoid()}`,
        label: "Untitled",
      },
    };
    actions.addLSMShemaRadioOption(paylaod);
    console.log("Added");
  };

  const [radioIdSelected, setRadioIdSelected] = useState(`${idPrefix}1`);

  const onChange = (optionId) => {
    setRadioIdSelected(optionId);
  };

  const [style, setStyle] = useState({ display: "none" });

  // return (
  //   <>
  //     <label htmlFor={name}>{label}</label>
  //     <Field name={name} key={name}>
  //       {({ form, field }) => {
  //         return (
  //           <React.Fragment>
  //             <EuiRadioGroup
  //               // id={option.id}
  //               // //key={option.id}
  //               // type="radio"
  //               {...field}
  //               {...rest}
  //               options={radioOptions}
  //               idSelected={radioIdSelected}
  //               onChange={(id) => onChange(id)}
  //               placeholder={placeholder || ""}
  //               isInvalid={
  //                 form.errors[name] && form.touched[name] ? true : false
  //               }
  //             />
  //           </React.Fragment>
  //         );
  //       }}
  //     </Field>

  //     <EuiHorizontalRule />

  //     <EuiButton onClick={handleAddRadioOptionToField}>+ Add Field</EuiButton>
  //   </>
  // );

  return (
    <>
      {/* <label htmlFor={name}>{label}</label> */}
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
                        <RadioInput
                          key={index}
                          option={option}
                          placeholder={placeholder}
                          name={name}
                          form={form}
                          field={field}
                        />
                      );
                    })}
                  </EuiFlexGroup>
                </div>
              </EuiFormRow>
            </>
          );

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
                  value={option.label}
                  checked={field.value === option.label}
                  // label="Option one"
                  // // onChange={(id) => onChange(id)}
                  // name="radio group"
                  placeholder={placeholder || ""}
                  isInvalid={
                    form.errors[name] && form.touched[name] ? true : false
                  }
                />
                <label htmlFor={option.label}>{option.label}</label>
                {/* <EuiRadio
                  id={option.id}
                  //key={option.id}
                  type="radio"
                  {...field}
                  {...rest}
                  //value={option.value}
                  //checked={field.value === option.value}
                  checked={checked}
                  label={option.value}
                  // onChange={(id) => onChange(id)}
                  onChange={(e) => onChange(e)}
                  //name={option.value}
                  placeholder={placeholder || ""}
                  isInvalid={
                    form.errors[name] && form.touched[name] ? true : false
                  }
                /> */}
              </React.Fragment>
            );
          });
        }}
      </Field>

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
  );
}
