"use client";

import React from "react";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import css from "./Form.module.scss";

export interface FormValues {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: {
      city: string;
    };
  };
}

const initialValues: FormValues = {
  user: { id: 100, name: "", email: "", phone: "", address: { city: "" } },
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be longer than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .max(100, "Email is too long"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^(\+1)?[\s]?\(?[0-9]{3}\)?[\s]?[0-9]{3}[\s]?[0-9]{2}[\s]?[0-9]{2}$/,
      "Invalid phone number format"
    ),

  address: Yup.string()
    .optional()
    .max(200, "Address cannot be longer than 200 characters"),
});

const handleSubmit = (
  values: FormValues,
  actions: FormikHelpers<FormValues>
) => {
  const formDataWithId = {
    ...values,
    id: Date.now(),
  };

  console.log(formDataWithId);

  actions.resetForm();
};

const MyForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form className={css.form} onSubmit={handleSubmit}>
          <Field className={css.field} name="name">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Name"
                variant="standard"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error ? meta.error : undefined}
              />
            )}
          </Field>
          <Field className={css.field} name="email">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Email"
                variant="standard"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error ? meta.error : undefined}
              />
            )}
          </Field>
          <Field className={css.field} name="phone">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Phone"
                variant="standard"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error ? meta.error : undefined}
              />
            )}
          </Field>
          <Field className={css.field} name="address">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Address"
                variant="standard"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error ? meta.error : undefined}
              />
            )}
          </Field>
          <Button className={css.button} type="submit" variant="contained">
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
