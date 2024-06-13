import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import toast from "react-hot-toast";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const mailFieldId = useId();
  const passwordFieldId = useId();

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={FeedbackSchema}
      onSubmit={(values, actions) => {
        const newUser = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        dispatch(register(newUser))
          .unwrap()
          .then(() => {
            toast.success("Success!", { position: "top-center" });
          })
          .catch(() => {
            toast.error("Error, input correct data", {
              position: "top-center",
            });
          });
        actions.resetForm();
      }}
    >
      <Form className={css.formContainer}>
        <label htmlFor={nameFieldId} className={css.label}>
          Name
        </label>
        <Field
          type="text"
          name="name"
          id={nameFieldId}
          className={css.inputField}
        />
        <ErrorMessage
          name="name"
          component="span"
          className={css.errorMessage}
        />

        <label htmlFor={mailFieldId} className={css.label}>
          Email
        </label>
        <Field
          type="email"
          name="email"
          id={mailFieldId}
          className={css.inputField}
        />
        <ErrorMessage
          name="email"
          component="span"
          className={css.errorMessage}
        />

        <label htmlFor={passwordFieldId} className={css.label}>
          Password
        </label>
        <Field
          type="password"
          name="password"
          id={passwordFieldId}
          className={css.inputField}
        />
        <ErrorMessage
          name="password"
          component="span"
          className={css.errorMessage}
        />

        <button type="submit" className={css.submitButton}>
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
