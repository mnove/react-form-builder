import React, { useState, useEffect } from "react";
import InlineEdit from "./InlineTextEdit/Components/inlineEdit";
import "./InlineTextEdit/styles.css";

export const OptionLabelInlineEdit = ({ labelText, ...rest }) => {
  const [storedText, setStoredText] = useState(labelText);

  // Keep track of labelText changes
  //so the child component's storedText updates properly
  useEffect(() => {
    setStoredText(labelText);
  }, [labelText]);

  return (
    <>
      <InlineEdit
        text={storedText}
        onSetText={(text) => setStoredText(text)}
        {...rest}
      />
    </>
  );
};
