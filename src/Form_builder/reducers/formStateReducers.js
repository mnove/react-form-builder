// ADD NEW FIELD to the Form Container state (when adding a new field in the Form Schema)
// this "reducer" takes in the previous form container state and a unique key field value
// and  return the updated state
export const addNewField = (prevFormContainerState, key) => {
  //default new state field to add to the form container state
  let newFieldElementState = {
    newCheckbox: {
      checkboxKey: key,
      checked: false,
    },
    newLabel: {
      labelKey: key,
      value: "Default Label",
    },
    newModal: {
      modalKey: key,
      isOpen: false,
    },
  };

  // spreading the existing data and updating each state element
  return {
    ...prevFormContainerState,
    requiredCheckboxes: [
      ...prevFormContainerState.requiredCheckboxes,
      newFieldElementState.newCheckbox,
    ],
    labels: [...prevFormContainerState.labels, newFieldElementState.newLabel],
    modals: [...prevFormContainerState.modals, newFieldElementState.newModal],
  };
};

// REMOVE FIELD to the Form Container state (when removing a new field in the Form Schema)
// this "reducer" takes in the previous form container state and a unique key field value
// and  return the updated state
export const removeField = (prevFormContainerState, key) => {
  return {
    ...prevFormContainerState,
    requiredCheckboxes: prevFormContainerState.requiredCheckboxes.filter(
      (item, index) => {
        if (item.checkboxKey === key) {
          return false;
        }
        return true;
      }
    ),

    labels: prevFormContainerState.labels.filter((item, index) => {
      if (item.labelKey === key) {
        return false;
      }
      return true;
    }),

    modals: prevFormContainerState.modals.filter((item, index) => {
      if (item.modalKey === key) {
        return false;
      }
      return true;
    }),
  };
};

// SET target requiredCheckbox checked or unchecked (depending on value passed in)
export const setRequiredCheckboxes = (
  prevFormContainerState,
  checkboxValue,
  key
) => {
  return {
    ...prevFormContainerState,
    requiredCheckboxes: prevFormContainerState.requiredCheckboxes.map(
      (item, index) => {
        if (item.checkboxKey === key) {
          return {
            ...item,
            checked: checkboxValue,
          };
        }
        return item;
      }
    ),
  };
};


export const getCheckboxValue = (prevFormContainerState, key) => {
    let newArray = [...prevFormContainerState.requiredCheckboxes];
    let index = newArray.findIndex((el) => el.checkboxKey === key);
    let checkboxStatus = newArray[index].checked;
    return checkboxStatus;
}


// MODALS ------------------------------------------------------------

/** Set the target modal state as "open"
 * @param {object} prevFormContainerState Previous form container state
 * @param {string} key  The key value of the targeted modal
 */
export const setModalOpen = (prevFormContainerState, key) => {
  return {
    ...prevFormContainerState,
    modals: prevFormContainerState.modals.map((item, index) => {
      if (item.modalKey === key) {
        return {
          ...item,
          isOpen: true,
        };
      }
      return item;
    }),
  };
};

/** Set the target modal state as "close"
 * @param {object} prevFormContainerState Previous form container state
 * @param {string} key  The key value of the targeted modal
 */
export const setModalClose = (prevFormContainerState, key) => {
  return {
    ...prevFormContainerState,
    modals: prevFormContainerState.modals.map((item, index) => {
      if (item.modalKey === key) {
        return {
          ...item,
          isOpen: false,
        };
      }
      return item;
    }),
  };
};

/** Get the "open" or "close" value of the target modal
 * @param {object} prevFormContainerState Previous form container state
 * @param {string} key  The key value of the targeted modal
 */

export const getModalValue = (prevFormContainerState, key) => {
  let newArray = [...prevFormContainerState.modals];
  let index = newArray.findIndex((el) => el.modalKey === key);
  let modalStatus = newArray[index].isOpen;
  return modalStatus;
};


// TODO 

// this label should be read from the form schema not the form container state (which is just UI state)
export const getLabelValue = (prevFormContainerState, key) => {
    let newArray = [...prevFormContainerState.labels];
    let index = newArray.findIndex((el) => el.labelKey === key);
  let modalStatus = newArray[index].value;
  return modalStatus;
}


export const setLabelValue = (prevFormContainerState, key, value) => {
    return {
        ...prevFormContainerState,
        labels: prevFormContainerState.labels.map((item, index) => {
          if (item.labelKey === key) {
            return {
              ...item,
              value: value,
            };
          }
          return item;
        }),
      };    
}