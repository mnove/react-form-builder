import logo from "./logo.svg";
import "./App.css";
import FormContainer from "./Components/FormContainer";
import FormContainerPlayer from "./Components/Player/player_formContainer";

import {
  StateMachineProvider,
  createStore,
  useStateMachine,
} from "little-state-machine";

createStore({
  formSchemaState: [],
  formContainerState: [],
  formValuesState: [],
});

function App() {
  return (
    <div className="App">
      <StateMachineProvider>
        <FormContainer />
        {/* <FormContainerPlayer /> */}
      </StateMachineProvider>
    </div>
  );
}

export default App;
