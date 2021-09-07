import React, { useState } from "react";
import {
  EuiRadio,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
} from "@elastic/eui";
import { CloseCircle } from "@styled-icons/remix-fill/CloseCircle";
import { useStateMachine } from "little-state-machine";
import { nanoid } from "nanoid";
import {
  removeLSMShemaRadioOption,
  setLSMSchemaRadioOption,
} from "../Form_builder/state-machine/formSchema/reducers";

import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { OptionLabelInlineEdit } from "./OptionLabelInlineEdit";

const idPrefix = nanoid(10);

export const RadioInput = ({
  index,
  option,
  form,
  field,
  placeholder,
  name,
  isEditingMode,
  ...rest
}) => {
  const { actions } = useStateMachine({
    removeLSMShemaRadioOption,
    setLSMSchemaRadioOption,
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
              isEditingMode ? (
                <OptionLabelInlineEdit
                  labelText={option.label}
                  fieldKey={name}
                  optionKey={option.key}
                  // We need to pass state's actions and the action type name
                  // in order to perfor state updates within the children components
                  stateActions={actions}
                  stateActionType={"setLSMSchemaRadioOption"}
                />
              ) : (
                `${option.label}`
              )
            }
            placeholder={placeholder || ""}
          />
        </EuiFlexItem>

        {isEditingMode && (
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
        )}
      </EuiFlexGroup>
    </React.Fragment>
  );
};
