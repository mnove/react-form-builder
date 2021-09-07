import logo from "./logo.svg";
import "./App.css";
import FormContainer from "./Components/FormContainer";
import FormContainerPlayer from "./Components/Player/player_formContainer";

import {
  StateMachineProvider,
  createStore,
  useStateMachine,
} from "little-state-machine";
import { FormBuilder } from "./Pages/FormBuilder";

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
        {/* <FormContainerPlayer /> */}
      </StateMachineProvider>
    </div>
  );
}

export default App;
