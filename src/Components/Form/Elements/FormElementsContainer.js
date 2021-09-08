import React from "react";

// import { initializeForm } from "../Form_builder/initializeForm";
import { FormFieldPanel } from "../../styled-components/formStyles";
import { useStateMachine } from "little-state-machine";
import { motion, AnimateSharedLayout } from "framer-motion";
import { FormElementsContainerButtons } from "./FormElementsContainerButtons";
import { getFormElement } from "../../../Form_builder";

export const FormElementsContainer = ({ formik, isEditingMode }) => {
  const { state } = useStateMachine();

  // global FORM SCHEMA (little state machine)
  const LSMFormSchemaState = state.formSchemaState;

  return (
    <>
      <AnimateSharedLayout>
        <motion.div layout>
          {LSMFormSchemaState.map((elem, index) => {
            const key = elem.key;
            return (
              <>
                <motion.div layout>
                  <FormFieldPanel
                    hasShadow={false}
                    hasBorder={true}
                    key={index}
                  >
                    <motion.div layout>
                      {isEditingMode && (
                        <FormElementsContainerButtons
                          elemKey={key}
                          formik={formik}
                        />
                      )}
                    </motion.div>
                    <motion.div layout>
                      {getFormElement(key, elem, isEditingMode)}
                    </motion.div>
                  </FormFieldPanel>
                </motion.div>
              </>
            );
          })}
        </motion.div>
      </AnimateSharedLayout>
    </>
  );
};
