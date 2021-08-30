import * as Yup from "yup";

export const initializeForm = (formSchema) => {
  console.log(formSchema);

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

    if (elem.required) {
      _schemaData[elem.key] = _schemaData[elem.key].required("Required");
    }
  });

  let intializedData = {
    schemaData: _schemaData,
    formData: _formData,
  };

  console.log(intializedData);

  return intializedData;
};
