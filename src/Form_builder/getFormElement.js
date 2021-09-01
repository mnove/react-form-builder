import React from "react";

import {
  TextField,
  EmailField,
  NumberField,
  RadioGroupField,
} from "../Components/FormElements";

export const getFormElement = (elemName, elemSchema) => {
  const props = {
    name: elemName,
    label: elemSchema.label,
    placeholder: elemSchema.placeholder,
    options: elemSchema.options,
    fieldData: elemSchema.fieldData,
  };

  if (elemSchema.type === "textInput") {
    return <TextField key={elemName} {...props} />;
  } else if (elemSchema.type === "emailInput") {
    return <EmailField key={elemName} {...props} />;
  } else if (elemSchema.type === "numberInput") {
    return <NumberField key={elemName} {...props} />;
  } else if (elemSchema.type === "radioGroupInput") {
    return <RadioGroupField key={elemName} {...props} />;
  }
};
