import "./App.css";

import { StateMachineProvider, createStore } from "little-state-machine";
import { FormBuilder } from "./Pages/FormBuilder";
import { useFormState } from "./Hooks/useFormState";

createStore({
  formSchemaState: [],
  formContainerState: [],
  formValuesState: [],
  formBuilder: {
    status: {
      isEditingMode: false,
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
