import * as Yup from "yup";

export const initializeForm = (formSchema) => {
  let _formData = {};
  let _schemaData = {};

  formSchema.forEach((elem) => {
    _formData[elem.key] = "";

    if (elem.type === "textInput") {
      _schemaData[elem.key] = Yup.string();
    }

    if (elem.type === "emailInput") {
      _schemaData[elem.key] = Yup.string().email("Insert a valid email");
    }

    if (elem.type === "numberInput") {
      _schemaData[elem.key] = Yup.number()
        .integer("please enter an integer")
        .nullable(true);
    }

    // if (elem.type === "radioGroupInput") {
    //   _schemaData[elem.key] = Yup.string().oneOf(
    //     elem.options,
    //     "Select one of the options"
    //   );
    // }

    if (elem.type === "radioGroupInput") {
      _schemaData[elem.key] = Yup.string();
    }

    if (elem.type === "checkboxGroupInput") {
      _schemaData[elem.key] = Yup.array();
    }

    if (elem.required) {
      _schemaData[elem.key] = _schemaData[elem.key].required("Required");
    }
  });

  let intializedData = {
    schemaData: _schemaData,
    formData: _formData,
  };

  return intializedData;
};

/** Parse initial form values to formik format (so <Formik> can be initialized properly)
 * @param {Array<Object>} valuesToParse
 */
export const parseToFormikInitialValues = (valuesToParse) => {
  let newArray = {};
  valuesToParse.forEach((element) => {
    newArray[element.key] = element.fieldValue;
  });
  return newArray;
};
