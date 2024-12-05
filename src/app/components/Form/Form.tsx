"use client";

import React from "react";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import css from "./Form.module.scss";
import { addUser, Users } from "../../redux/operations";
import { useAppDispatch } from "../../hooks";

const initialValues: Users = {
  id: Date.now(),
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be longer than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters"),

  username: Yup.string()
    .required("Username is required")
    .max(50, "Username cannot be longer than 50 characters"),

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

  address: Yup.object().shape({
    street: Yup.string().optional(),
    suite: Yup.string().optional(),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string().optional(),
    geo: Yup.object().shape({
      lat: Yup.string().optional(),
      lng: Yup.string().optional(),
    }),
  }),

  company: Yup.object().shape({
    name: Yup.string().optional(),
    catchPhrase: Yup.string().optional(),
    bs: Yup.string().optional(),
  }),
});

const MyForm = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: Users, actions: FormikHelpers<Users>) => {
    console.log(values);

    dispatch(addUser(values));

    actions.resetForm();
  };
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
          <Field className={css.field} name="username">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Username"
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
          <Field className={css.field} name="address.city">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="City"
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
