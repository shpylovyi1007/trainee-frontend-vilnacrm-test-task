"use client";

import React from "react";
import { Users } from "../../redux/operations";
import css from "./User.module.css";

interface UserProps {
  user: Users;
}

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <div className={css.item}>
      <h2 className={css.title}>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.address.city}</p>
    </div>
  );
};

export default User;
