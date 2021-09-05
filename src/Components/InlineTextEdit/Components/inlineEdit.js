// CREDITS TO Joel M. Turner  https://joelmturner.com/blog/inline-text-edit-react-hooks/

import React, { useState, useEffect, useRef, useCallback } from "react";
import useKeypress from "../hooks/useKeypress";
import useOnClickOutside from "../hooks/useOnClickOutside";
import DOMPurify from "dompurify";
import { EuiText } from "@elastic/eui";

function InlineEdit({
  onSetText,
  fieldKey,
  optionKey,
  text,
  stateActions = null,
  stateActionType = "",
}) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);
  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  // Payload for LSM reducer - to set/update the label value inside the form schema
  const payload = {
    fieldKey,
    optionKey,
    labelValue: inputValue,
  };

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      onSetText(inputValue);
      setIsInputActive(false);

      // If stateActions is passed as prop, then dispatch the state update
      if (stateActions) {
        stateActions[stateActionType](payload);
      }
    }
  });

  const onEnter = useCallback(() => {
    if (enter) {
      onSetText(inputValue);
      setIsInputActive(false);

      // If stateActions is passed as prop, then dispatch the state update
      if (stateActions) {
        stateActions[stateActionType](payload);
      }

      // event.stopPropagation();
    }
  }, [enter, inputValue, onSetText]);

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(text);
      setIsInputActive(false);
    }
  }, [esc, text]);

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and close the editor
      onEnter();
      // if Escape is pressed, revert the text and close the editor
      onEsc();
    }
  }, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

  const handleInputChange = useCallback(
    (event) => {
      // sanitize the input a little
      setInputValue(DOMPurify.sanitize(event.target.value));
    },
    [setInputValue]
  );

  const handleSpanClick = useCallback(
    () => setIsInputActive(true),
    [setIsInputActive]
  );

  const handleClick = (e) => {
    e.stopPropagation();
    handleSpanClick();
  };

  return (
    <EuiText>
      <span className="inline-text" ref={wrapperRef}>
        <span
          ref={textRef}
          onClick={(e) => handleClick(e)}
          className={`inline-text_copy inline-text_copy--${
            !isInputActive ? "active" : "hidden"
          }`}
        >
          {text}
        </span>
        <input
          ref={inputRef}
          // set the width to the input length multiplied by the x height
          style={{ minWidth: Math.ceil(inputValue.length) + "ch" }}
          value={inputValue}
          onChange={handleInputChange}
          className={`inline-text_input inline-text_input--${
            isInputActive ? "active" : "hidden"
          }`}
        />
      </span>
    </EuiText>
  );
}

export default InlineEdit;
