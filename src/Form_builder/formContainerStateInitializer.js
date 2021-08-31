// initialize the entire form container state

export const formContainerState = {
  modals: [],
  labels: [],
  requiredCheckboxes: [],
};

export const initializeFormContainerState = (formSchema) => {
  console.log(formSchema);

  let formContainerInitialData = [];

  formSchema.forEach((elem) => {
    let isRequired = false;
    if (elem.required) {
      isRequired = true;
    }

    let newElement = {
      key: elem.key,
      isModalOpened: false,
      isRequiredChecked: isRequired,
      labelValue: elem.label,
    };
    formContainerInitialData.push(newElement);
  });

  console.log(formContainerInitialData);

  return formContainerInitialData;
};

// export const initializeFormContainerState = (formSchema) => {
//   console.log(formSchema);

//   const formContainerState = {
//     modals: [],
//     labels: [],
//     requiredCheckboxes: [],
//   };

//   formSchema.forEach((elem) => {
//     // modals
//     let newModal = {
//       modalKey: elem.key,
//       isOpen: false,
//     };

//     let modalState = formContainerState.modals;
//     modalState.push(newModal);

//     // labels
//     let newLabel = {
//       labelKey: elem.key,
//       value: elem.label,
//     };

//     let labelState = formContainerState.labels;
//     labelState.push(newLabel);

//     let isRequired = false;
//     if (elem.required) {
//       isRequired = true;
//     }

//     // checkboxes
//     let newRequiredCheckbox = {
//       checkboxKey: elem.key,
//       checked: isRequired,
//     };

//     let requiredCheckboxState = formContainerState.requiredCheckboxes;
//     requiredCheckboxState.push(newRequiredCheckbox);
//   });

//   return formContainerState;
// };
