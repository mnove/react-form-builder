import React from "react";

import {
  TextField,
  EmailField,
  NumberField,
  RadioGroupField,
  CheckboxGroupField,
} from "../Components/Form/Elements/FormElements";

export const getFormElement = (elemName, elemSchema, isEditingMode) => {
  const props = {
    name: elemName,
    label: elemSchema.label,
    placeholder: elemSchema.placeholder,
    options: elemSchema.options,
    fielddata: elemSchema.fieldData,
    mode: isEditingMode,
  };

  if (elemSchema.type === "textInput") {
    return <TextField key={elemName} {...props} />;
  } else if (elemSchema.type === "emailInput") {
    return <EmailField key={elemName} {...props} />;
  } else if (elemSchema.type === "numberInput") {
    return <NumberField key={elemName} {...props} />;
  } else if (elemSchema.type === "radioGroupInput") {
    return <RadioGroupField key={elemName} {...props} />;
  } else if (elemSchema.type === "checkboxGroupInput") {
    return <CheckboxGroupField key={elemName} {...props} />;
  }
};
