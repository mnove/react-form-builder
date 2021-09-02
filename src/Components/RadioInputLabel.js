import React, { useState } from "react";
import InlineEdit from "./InlineTextEdit/Components/inlineEdit";
import "./InlineTextEdit/styles.css";
export const RadioInputLabel = ({ labelText, ...rest }) => {
  const [storedText, setStoredText] = useState(labelText);

  return (
    <p>
      <InlineEdit
        text={storedText}
        onSetText={(text) => setStoredText(text)}
        {...rest}
      />
    </p>
  );
};
