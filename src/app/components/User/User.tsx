"use client";

import React from "react";
import { Users } from "../../redux/operations";

interface UserProps {
  user: Users;
}

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <li>
      <h2>{user.name}</h2>
    </li>
  );
};

export default User;
