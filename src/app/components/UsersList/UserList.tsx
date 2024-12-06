"use client";

import { selectUsers } from "../../redux/selectors";
import { useEffect, useState } from "react";
import { getUsers } from "../../redux/operations";
import User from "../User/User";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import css from "./UserList.module.css";
import { Button } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import Dialog from "@mui/material/Dialog"; // Імпорт модального вікна
import DialogTitle from "@mui/material/DialogTitle"; // Заголовок модального вікна
import DialogContent from "@mui/material/DialogContent"; // Контент модального вікна
import DialogActions from "@mui/material/DialogActions"; // Дії модального вікна
import MyForm from "../Form/Form";

const UserList = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <ul className={css.list}>
        {users.map((user) => {
          return (
            <li className={css.item} key={user.id}>
              <User user={user} />
              <Button
                className={css.button}
                variant="contained"
                onClick={() => handleClickOpen(user)}
              >
                <CiEdit className={css.icon} />
              </Button>
            </li>
          );
        })}
      </ul>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <MyForm initialValues={selectedUser} onClose={handleClose} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserList;
