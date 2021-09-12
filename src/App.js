//import "./App.css";

import { StateMachineProvider, createStore } from "little-state-machine";
import { FormBuilder } from "./Pages/FormBuilder";

createStore({
  formSchemaState: [],
  formContainerState: [],
  formValuesState: [],
  formBuilder: {
    status: {
      isEditingMode: false,
    },
    meta: {
      formTitle: "Untitled Form",
      formDescription: "lorem ipsum siet",
    },
  },
});

function App() {
  return (
    <div className="App">
      <StateMachineProvider>
        <FormBuilder />
      </StateMachineProvider>
    </div>
  );
}

export default App;
