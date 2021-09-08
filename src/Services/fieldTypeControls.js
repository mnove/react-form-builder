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
        fieldData: {},
      };

      break;

    case "emailInput":
      fieldToAdd = {
        key: randomId,
        type: "emailInput",
        label: "Default email label",
        placeholder: "default email placeholder",
        required: false,
        fieldData: {},
      };
      break;

    case "numberInput":
      fieldToAdd = {
        key: randomId,
        type: "numberInput",
        label: "Default number label",
        placeholder: "default number placeholder",
        required: false,
        fieldData: {},
      };
      break;

    case "radioGroupInput":
      fieldToAdd = {
        key: randomId,
        type: "radioGroupInput",
        label: "Default radio label",
        placeholder: "default radio placeholder",
        required: false,
        fieldData: {
          radioOptions: [
            {
              key: `radio_opt_${nanoid()}`,
              label: "Opt 1",
            },
            {
              key: `radio_opt_${nanoid()}`,
              label: "Opt 2",
            },
          ],
        },
      };
      break;
    case "checkboxGroupInput":
      fieldToAdd = {
        key: randomId,
        type: "checkboxGroupInput",
        label: "Default Checkbox Label",
        placeholder: "default checkbox placeholder",
        required: false,
        fieldData: {
          checkboxOptions: [
            {
              key: `check_opt_${nanoid()}`,
              label: "Opt 1",
            },
            {
              key: `check_opt_${nanoid()}`,
              label: "Opt 2",
            },
          ],
        },
      };
      break;

    default:
      fieldToAdd = {};
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
