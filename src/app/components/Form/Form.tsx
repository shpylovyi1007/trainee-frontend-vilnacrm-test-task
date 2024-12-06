"use client";

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";
import css from "./Form.module.css";
import { patchUser, Users } from "../../redux/operations";
import { useAppDispatch } from "../../hooks";

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
    city: Yup.string().required("City is required"),
  }),
});

interface MyFormProps {
  initialValues: Users; // Приймаємо initialValues як пропс
  onClose: () => void; // Метод для закриття модалки
}

const MyForm: React.FC<MyFormProps> = ({ initialValues, onClose }) => {
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState<Users>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormValues((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formValues, { abortEarly: false });

      dispatch(patchUser(formValues));

      setFormValues(initialValues);
      setErrors({});
      onClose();
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const formattedErrors = validationErrors.inner.reduce(
          (acc: Record<string, string>, error) => {
            if (error.path) {
              acc[error.path] = error.message;
            }
            return acc;
          },
          {}
        );

        setErrors(formattedErrors);
      }
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        variant="standard"
        fullWidth
        value={formValues.name}
        onChange={handleChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
      />

      <TextField
        name="username"
        label="Username"
        variant="standard"
        fullWidth
        value={formValues.username}
        onChange={handleChange}
        error={Boolean(errors.username)}
        helperText={errors.username}
      />

      <TextField
        name="email"
        label="Email"
        variant="standard"
        fullWidth
        value={formValues.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />

      <TextField
        name="phone"
        label="Phone"
        variant="standard"
        fullWidth
        value={formValues.phone}
        onChange={handleChange}
        error={Boolean(errors.phone)}
        helperText={errors.phone}
      />

      <TextField
        name="address.city"
        label="City"
        variant="standard"
        fullWidth
        value={formValues.address.city}
        onChange={handleChange}
        error={Boolean(errors.address?.city)}
        helperText={errors.address?.city}
      />

      <Button type="submit" variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </form>
  );
};

export default MyForm;
