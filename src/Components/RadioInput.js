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
} from "@elastic/eui";

import { useStateMachine } from "little-state-machine";

import { nanoid } from "nanoid";
import { removeLSMShemaRadioOption } from "../Form_builder/state-machine/formSchema/reducers";

const idPrefix = nanoid(10);

export const RadioInput = ({
  key,
  option,
  form,
  field,
  placeholder,
  name,
  ...rest
}) => {
  const { actions, state } = useStateMachine({
    removeLSMShemaRadioOption,
  });

  const [radioIdSelected, setRadioIdSelected] = useState(`${idPrefix}1`);

  const onChange = (optionId) => {
    setRadioIdSelected(optionId);
  };

  const handleDeleteOption = (optionKey) => {
    console.log(optionKey);

    let payload = {
      fieldKey: name,
      optionKey: optionKey,
    };
    actions.removeLSMShemaRadioOption(payload);
  };

  const [style, setStyle] = useState({ display: "none" });
  return (
    <React.Fragment key={key}>
      <EuiFlexItem>
        <EuiFlexGroup
          alignItems="center"
          justifyContent="center"
          onMouseEnter={(e) => {
            setStyle({ display: "block" });
          }}
          onMouseLeave={(e) => {
            setStyle({ display: "none" });
          }}
        >
          <EuiFlexItem grow={false}>
            <input
              type="radio"
              id={option.key}
              {...field}
              {...rest}
              value={option.label}
              checked={field.value === option.label}
              // label="Option one"
              // // onChange={(id) => onChange(id)}
              // name="radio group"
              placeholder={placeholder || ""}
              isInvalid={form.errors[name] && form.touched[name] ? true : false}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={true}>
            <label htmlFor={option.label}>{option.label}</label>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <button
              style={style}
              onClick={() => {
                handleDeleteOption(option.key);
              }}
            >
              Delete X
            </button>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </React.Fragment>
  );
};
