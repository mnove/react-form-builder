// handler for displaying a validation error / success message status (for the whole form)
export const formAlertValidation = ({ errors, touched }) => {
    if (Object.keys(errors).length === 0 && Object.keys(touched).length > 0) {
      return <p className="success">All good! 👍</p>;
    } else if (
      Object.keys(errors).length === 0 &&
      Object.keys(touched).length === 0
    ) {
      return null;
    } else if (Object.keys(errors).length !== 0) {
      return <p className="error">Please fill in the form!</p>;
    }
  };