# Docs - Form Builder POC

A simple POC (proof of concept) for a dynamic form builder built with React, Formik and Yup.

## General Goals of the project

- create a VERY simple form that can be edited entirely by the end user from the UI.
- User (Form Editor) should be able to add form fields, edit field labels, set fields as required or not etc.. without writing a single line of React code.
- Users (Form Users) should be able to fill-in the form and submit it
- Form schema should be "ready" to be saved on a DB, so it can be stored and retrieved.

## Technologies Used

- React (with hooks)
- Formik (form library)
- Yup (form schema validation library)
- React Modals

## General Architecture

### Form Schema

The entire form content can be described by a `formSchema`. The form schema should contain all the necessary information to render a fully functional form for the end user.

Example of a form schema:

```javascript
const formSchema = [
  {
    key: "1001", // each field gets a unique identifier
    type: "textInput", // the field type
    label: "Full Name", // the form field label
    placeholder: "Enter your full name", // the form field placeholder
    required: true, // boolean, indicating wheather the field is required or not
  },
  {
    key: "1002",
    type: "emailInput",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
  },

  // ...more fields...
];
```

`formSchema` above is described as an _Array of Objects_. Each _object_ contains properties that describe each individual form field. As form fields get added, removed or edited, `formSchema` is modified to reflect the changes.

### Validation Schema

In conjuction with `formSchema` the form is _also_ described by `validationSchema`. The validation schema describes the current validation rules (e.g. is the field required?) associated to each form field.

Currently, the validation schema is implemented using the `Yup` library from npm. Each time the form gets initialized, a Yup Object is generated. Such object, contains all the necessary information needed for the validation schema to be implemented.

### Form Container (UI)

FormContainer component is the main React component in charge of correctly creating the form builder and its form fields.

Among many other things, there are 3 key core goals of the `FormContainer` component:

1. To initialize and implement component state(s) using React Hooks (e.g. useState)
2. To map the content of `formSchema` and to render the correct form field value
3. To provide an ultra-basic UI for the Editor to alter the form schema and its validation rules.

Here's a (ultra-simplified) example of the `FormContainer` component:

```Javascript
import React, { useState, useEffect } from "react";
// all other imports...

const formSchema = [
    {
    // ...form schema data
    },
];

function FormContainer() {
    // COMPONENT STATE
    const [formSchemaState, setFormSchemaState] = useState(formSchema);
    const [validationSchema, setValidationSchema] = useState({});
    // ...more states and function handlers
    // ...

    return (
        <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        >

        {(formik) => {
        return (
          <Form>

            {formSchemaState.map((elem, index) => {
              const key = elem.key;
              return (
                <div>
                  {getFormElement(key, elem)}
                </div>
              );
            })}

            <div className="add-field-control">
                <!-- JSX to render the form builders controls... -->   
            </div>

            <button type="submit">Submit</button>
          </Form>
        );
      }}
      >
    )
}

export default FormContainer;

```
