"use client";

import { selectUsers } from "../../redux/selectors";
import { useEffect } from "react";
import { getUsers } from "../../redux/operations";
import User from "../User/User";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

const UserList = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <User user={user} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserList;
