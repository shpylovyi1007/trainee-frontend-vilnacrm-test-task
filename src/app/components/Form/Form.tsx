"use client";

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";
import css from "./Form.module.css";
import {
  patchUser,
  PatchUserParams,
  Users,
  Address,
} from "../../redux/operations";
import { useAppDispatch } from "../../hooks";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be longer than 50 characters"),

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
      /^(\+?1[-\s]?)?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/,
      "Invalid phone number format"
    ),

  address: Yup.object().shape({
    city: Yup.string()
      .required("City is required")
      .max(50, "City name is too long"),
  }),
});

interface MyFormProps {
  initialValues: Users;
  onClose?: () => void;
}

const MyForm: React.FC<MyFormProps> = ({
  initialValues,
  onClose = () => {},
}) => {
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState<Users>({
    ...initialValues,
    address: initialValues.address || {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" },
    },
  });

  const [errors, setErrors] = useState<{
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
    address?: {
      city?: string;
    };
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => {
      if (name.startsWith("address.")) {
        const addressField = name.split(".")[1];
        return {
          ...prev,
          address: {
            ...prev.address,
            [addressField]: value,
          } as Address,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formValues, { abortEarly: false });

      const patchParams: PatchUserParams = {
        id: formValues.id,
        userChange: formValues,
      };

      dispatch(patchUser(patchParams));

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
        error={Boolean(errors.address && errors.address.city)}
        helperText={errors.address?.city || ""}
      />

      <Button
        className={css.button}
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </form>
  );
};

export default MyForm;
