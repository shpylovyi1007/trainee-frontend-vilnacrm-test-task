"use client";

import { selectUsers } from "../../redux/selectors";
import { useEffect, useState } from "react";
import { getUsers, Users } from "../../redux/operations";
import User from "../User/User";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import css from "./UserList.module.css";
import { Button } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MyForm from "../Form/Form";

const UserList = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);

  const initialUserValues = {
    id: 0,
    name: "",
    username: "",
    email: "",
    phone: "",
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
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleClickOpen = (user: Users) => {
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
        {users.map((user) => (
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
        ))}
      </ul>

      <div className={css.modal}>
        <Dialog open={open} onClose={handleClose}>
          <DialogActions>
            <Button className={css.close} onClick={handleClose} color="primary">
              <IoClose className={css.close} />
            </Button>
          </DialogActions>
          <DialogContent>
            {selectedUser && (
              <MyForm initialValues={selectedUser} onClose={handleClose} />
            )}
            {!selectedUser && (
              <MyForm initialValues={initialUserValues} onClose={handleClose} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default UserList;
