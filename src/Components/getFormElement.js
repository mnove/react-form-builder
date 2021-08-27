import React from "react";


import { TextField, EmailField, NumberField } from "./FormElements";

export const getFormElement = (elemName, elemSchema) => {
    const props = {
      name: elemName,
      label: elemSchema.label,
      placeholder: elemSchema.placeholder,
      options: elemSchema.options,
    };
  
    if (elemSchema.type === "textInput") {
      return <TextField key={elemName} {...props} />;
    } else if (elemSchema.type === "emailInput") {
      return <EmailField key={elemName} {...props} />;
    } else if (elemSchema.type === "numberInput") {
      return <NumberField  key={elemName} {...props} />;
    }
  };

