import { nanoid } from "nanoid";

export const fieldTypeControls = (value, formSchema) => {
  let randomId = nanoid(15);

  let fieldToAdd = {};

  switch (value) {
    case "textInput":
      fieldToAdd = {
        key: randomId,
        type: "textInput",
        label: "Default label",
        placeholder: "default placeholder",
        required: false,
      };

      break;

    case "emailInput":
      fieldToAdd = {
        key: randomId,
        type: "emailInput",
        label: "Default email label",
        placeholder: "default email placeholder",
        required: false,
      };
      break;

    case "numberInput":
      fieldToAdd = {
        key: randomId,
        type: "numberInput",
        label: "Default number label",
        placeholder: "default number placeholder",
        required: false,
      };
      break;
  }

  //  NEW LABEL
  let labelToAdd = {
    key: randomId,
    label: fieldToAdd.label,
  };

  let newFieldData = {
    newLabel: labelToAdd,
    newField: fieldToAdd,
  };

  return newFieldData;
};
