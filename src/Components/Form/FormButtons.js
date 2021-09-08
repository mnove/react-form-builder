import React from "react";

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
} from "@elastic/eui";

export const FormButtons = ({ LSMFormSchemaState }) => {
  // Get the current form schema as JSON
  // const getFormSchema = () => {
  //   let JSONFormSchema = JSON.stringify(LSMFormSchemaState);
  //   console.log("JSON FORM SCHEMA", JSONFormSchema);
  //   window.alert(JSONFormSchema);
  //   return JSONFormSchema;
  // };

  return (
    <>
      <EuiHorizontalRule></EuiHorizontalRule>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiButton color="text" type="reset">
            Clear form
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton type="submit" color="secondary">
            Submit
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiHorizontalRule></EuiHorizontalRule>
      <EuiFlexGroup>
        {/* <EuiFlexItem>
          <EuiButton
            type="submit"
            color="text"
            size="s"
            onClick={() => getFormSchema()}
          >
            Print Schema to console
          </EuiButton>
        </EuiFlexItem> */}
      </EuiFlexGroup>
    </>
  );
};
