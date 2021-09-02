export const sampleFormSchema = [
  {
    key: "abc1",
    type: "textInput",
    label: "Default Text Label",
    placeholder: "Enter text here",
    required: true,
  },

  {
    key: "abc2",
    type: "emailInput",
    label: "Default Email Label",
    placeholder: "Enter text here",
    required: true,
  },

  {
    key: "abc3",
    type: "numberInput",
    label: "Default Number Label",
    placeholder: "Enter text here",
    required: false,
  },

  {
    key: "abc4",
    type: "radioGroupInput",
    label: "Default Radio Label",
    placeholder: "",
    required: false,
    fieldData: {
      radioOptions: [
        {
          key: `radio_opt_1001`,
          label: "Opt 1",
        },
        {
          key: `radio_opt_1002`,
          label: "Opt 2",
        },
      ],
    },
    options: [
      {
        id: `1001`,
        value: "Opt one",
      },
      {
        id: `1002`,
        value: "Opt two",
      },
    ],
  },
];
