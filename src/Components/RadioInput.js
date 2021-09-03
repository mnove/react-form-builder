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
  EuiButtonIcon,
} from "@elastic/eui";

import { CloseCircle } from "@styled-icons/remix-fill/CloseCircle";

import { useStateMachine } from "little-state-machine";

import { nanoid } from "nanoid";
import { removeLSMShemaRadioOption } from "../Form_builder/state-machine/formSchema/reducers";
import { RadioInputLabel } from "./RadioInputLabel";

const idPrefix = nanoid(10);

export const RadioInput = ({
  index,
  option,
  form,
  field,
  placeholder,
  name,
  ...rest
}) => {
  const { actions } = useStateMachine({
    removeLSMShemaRadioOption,
  });

  const handleDeleteOption = (optionKey) => {
    let payload = {
      fieldKey: name,
      optionKey: optionKey,
    };
    actions.removeLSMShemaRadioOption(payload);
  };

  // Setting style so Delete Option button appears on hover
  const [style, setStyle] = useState({ display: "none" });

  return (
    <React.Fragment key={index}>
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
            <EuiRadio
              type="radio"
              id={option.key}
              {...field}
              {...rest}
              value={option.label}
              checked={field.value === option.label}
              label={
                <RadioInputLabel
                  labelText={option.label}
                  fieldKey={name}
                  optionKey={option.key}
                />
              }
              placeholder={placeholder || ""}
              isInvalid={form.errors[name] && form.touched[name] ? true : false}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType={CloseCircle}
              color="danger"
              aria-label="Delete"
              display="base"
              style={style}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeleteOption(option.key);
              }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </React.Fragment>
  );
};
