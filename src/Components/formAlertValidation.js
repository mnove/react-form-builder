// handler for displaying a validation error / success message status (for the whole form)

import { EuiCallOut, EuiLink, EuiSpacer } from "@elastic/eui";
import { ThumbUp } from "@styled-icons/remix-fill/ThumbUp";
import { ErrorWarning } from "@styled-icons/remix-fill/ErrorWarning";

export const formAlertValidation = ({ errors, touched }) => {
  if (Object.keys(errors).length === 0 && Object.keys(touched).length > 0) {
    return (
      <>
        <EuiCallOut title="All good!" color="success" iconType={ThumbUp}>
          <p>You can submit the form.</p>
        </EuiCallOut>
      </>
    );
  } else if (
    Object.keys(errors).length === 0 &&
    Object.keys(touched).length === 0
  ) {
    return null;
  } else if (Object.keys(errors).length !== 0) {
    return (
      <EuiCallOut
        title="Some form fields have errors"
        color="danger"
        iconType={ErrorWarning}
      >
        <p>Please fix the errors and try again. </p>
      </EuiCallOut>
    );
  }
};
