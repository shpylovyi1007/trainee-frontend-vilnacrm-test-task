import React from "react";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { TextField, Button } from "@mui/material";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const handleSubmit = (
  values: FormValues,
  actions: FormikHelpers<FormValues>
) => {
  console.log(values);
  actions.resetForm();
};

const MyForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      //   validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field name="name">
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
          <Field name="email">
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
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
