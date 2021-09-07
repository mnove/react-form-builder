import React, { useState } from "react";
import {
  EuiRadio,
  EuiCheckbox,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
} from "@elastic/eui";
import { CloseCircle } from "@styled-icons/remix-fill/CloseCircle";
import { useStateMachine } from "little-state-machine";
import { nanoid } from "nanoid";
import {
  removeLSMShemaCheckboxOption,
  setLSMSchemaCheckboxOption,
} from "../Form_builder/state-machine/formSchema/reducers";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { OptionLabelInlineEdit } from "./OptionLabelInlineEdit";

const idPrefix = nanoid(10);

export const CheckboxInput = ({
  index,
  option,
  form,
  field,
  placeholder,
  name,
  ...rest
}) => {
  const { actions } = useStateMachine({
    removeLSMShemaCheckboxOption,
    setLSMSchemaCheckboxOption,
  });

  const handleDeleteOption = (optionKey) => {
    let payload = {
      fieldKey: name,
      optionKey: optionKey,
    };
    actions.removeLSMShemaCheckboxOption(payload);
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
          {/* {console.log("Field.value", field.value)}
          {console.log("option.label", option.label)}
          {console.log("option.key", option.key)} */}
          <EuiCheckbox
            type="inList"
            id={option.key}
            {...field}
            {...rest}
            value={option.label}
            // checked={field.value[0] === option.label}
            checked={field.value && field.value.includes(option.label)}
            label={
              <OptionLabelInlineEdit
                labelText={option.label}
                fieldKey={name}
                optionKey={option.key}
                // We need to pass state's actions and the action type name
                // in order to perfor state updates within the children components
                stateActions={actions}
                stateActionType={"setLSMSchemaCheckboxOption"}
              />
            }
            placeholder={placeholder || ""}
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
    </React.Fragment>
  );
};
