// Init
import React, { useEffect, useState } from "react";
import api from "../api";
import moment from "moment";
import validate from "validate.js";
import FileOpenIcon from "@mui/icons-material/FileOpen";

// Importing Components
import Header from "../components/Header";
import DatatablePage from "../components/Tabel";
import Modal from "../components/Modal";
import AddUserModal from "./AddUser";
import UserInfo from "./UserInfo";
import { toast } from "react-toastify";

// validation schema
const schema = {
  username: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 15,
    },
  },
  firstname: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 25,
    },
  },
  lastname: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 25,
    },
  },
};

// Home Component
export default function Home() {
  // states
  const [data, setData] = useState();
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [userForm, setUserForm] = useState({
    values: {
      username: "",
      firstname: "",
      lastname: "",
      enabled: "No",
    },
    error: {},
    touched: {},
  });

  // useEfftct to get user
  useEffect(() => {
    getUsers();
  }, []);

  // useEffect to set data for table
  useEffect(() => {
    let tempData = {
      columns: [
        {
          label: "Username",
          field: "username",
          sort: "asc",
        },
        {
          label: "FullName",
          field: "fullname",
          sort: "asc",
        },
        {
          label: "LastLogin",
          field: "lastLogin",
          sort: "asc",
        },
        {
          label: "Enabled",
          field: "enabled",
          sort: "asc",
        },
        {
          label: "action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: users,
    };
    setData(tempData);
  }, [users]);

  // useEffect for validation on values change
  useEffect(() => {
    const errors = validate(userForm.values, schema);
    setUserForm((formState) => ({
      ...formState,
      errors: errors || {},
    }));
  }, [userForm.values]);

  // func to get user
  const getUsers = async () => {
    let res = await api("get", "/users");
    let tempUsers = [];
    res.data.map((item, index) => {
      let dateTime = moment(randomDate()).format("YYYY-MM-DD HH:mm:ss");
      let enabled = Math.random() < 0.5 ? "Yes" : "No";
      let obj = {
        username: item.username,
        fullname: item.name,
        lastLogin: dateTime,
        enabled: (
          <div style={{ color: enabled === "No" && "red" }}>{enabled}</div>
        ),
        action: (
          <FileOpenIcon
            size="sm"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setUserForm((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  username: item.username,
                  firstname: item.name.split(" ")[0],
                  lastname: item.name.split(" ")[1],
                  enabled: enabled,
                },
              }));
              setSelectedUser(item.username);
              handleEditModal();
            }}
          />
        ),
      };
      tempUsers.push(obj);
    });
    setUsers(tempUsers);
  };

  // func to generate random date between past 10 days
  const randomDate = () => {
    let start = startDate();
    let end = new Date();
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

  // func to get start date for our random date
  const startDate = () => {
    let today = new Date();
    let nextweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 10
    );
    return nextweek;
  };

  // handle add user modal
  const handleModal = () => {
    setUserForm({
      values: {
        username: "",
        firstname: "",
        lastname: "",
        enabled: "No",
      },
      error: {},
      touched: {},
    });
    setOpenModal(!openModal);
  };

  // handle edit user
  const handleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  // handle state change
  const handleChange = (name, value) => {
    setUserForm((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [name]: value,
      },
      touched: {
        ...formState.touched,
        [name]: true,
      },
    }));
  };

  // handle submit for add user
  const handleSubmit = (e) => {
    e.preventDefault();
    let userExist = -1;
    users.map((item, index) => {
      if (userForm.values.username === item.username) {
        userExist = index;
      }
    });
    if (userExist != -1) {
      toast.error("User already exist!");
    } else if (
      `${userForm.values.firstname} ${userForm.values.lastname}`.length > 40
    ) {
      toast.error("length of fullname can't exceed 40!");
    } else {
      let tempUsers = users;
      let dateTime = moment(randomDate()).format("YYYY-MM-DD HH:mm:ss");
      let obj = {
        username: userForm.values.username,
        fullname: `${userForm.values.firstname} ${userForm.values.lastname}`,
        lastLogin: dateTime,
        enabled: (
          <div style={{ color: userForm.values.enabled === "No" && "red" }}>
            {userForm.values.enabled}
          </div>
        ),
        action: (
          <FileOpenIcon
            size="sm"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setUserForm((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  username: userForm.values.username,
                  firstname: userForm.values.firstname,
                  lastname: userForm.values.lastname,
                  enabled: userForm.values.enabled,
                },
              }));
              setSelectedUser(userForm.values.username);
              handleEditModal();
            }}
          />
        ),
      };
      tempUsers.unshift(obj);

      let tempData = {
        columns: [
          {
            label: "Username",
            field: "username",
            sort: "asc",
          },
          {
            label: "FullName",
            field: "fullname",
            sort: "asc",
          },
          {
            label: "LastLogin",
            field: "lastLogin",
            sort: "asc",
          },
          {
            label: "Enabled",
            field: "enabled",
            sort: "asc",
          },
          {
            label: "action",
            field: "action",
            sort: "asc",
          },
        ],
        rows: tempUsers,
      };
      setData(tempData);
      handleModal();
    }
  };

  // handle update for edit user
  const handleUpdate = (e) => {
    e.preventDefault();
    let userExist = -1;
    users.map((item, index) => {
      if (
        userForm.values.username !== selectedUser &&
        userForm.values.username === item.username
      ) {
        userExist = index;
      }
    });
    if (userExist != -1) {
      toast.error("User already exist!");
    } else if (
      `${userForm.values.firstname} ${userForm.values.lastname}`.length > 40
    ) {
      toast.error("length of fullname can't exceed 40!");
    } else {
      let userIndex;
      users.map((item, index) => {
        if (selectedUser === item.username) {
          userIndex = index;
        }
      });
      let tempUsers = users;
      let dateTime = moment(randomDate()).format("YYYY-MM-DD HH:mm:ss");
      let obj = {
        username: userForm.values.username,
        fullname: `${userForm.values.firstname} ${userForm.values.lastname}`,
        lastLogin: dateTime,
        enabled: (
          <div style={{ color: userForm.values.enabled === "No" && "red" }}>
            {userForm.values.enabled}
          </div>
        ),
        action: (
          <FileOpenIcon
            size="sm"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setUserForm((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  username: userForm.values.username,
                  firstname: userForm.values.firstname,
                  lastname: userForm.values.lastname,
                  enabled: userForm.values.enabled,
                },
              }));
              setSelectedUser(userForm.values.username);
              setOpenEditModal(true);
            }}
          />
        ),
      };
      tempUsers[userIndex] = obj;

      let tempData = {
        columns: [
          {
            label: "Username",
            field: "username",
            sort: "asc",
          },
          {
            label: "FullName",
            field: "fullname",
            sort: "asc",
          },
          {
            label: "LastLogin",
            field: "lastLogin",
            sort: "asc",
          },
          {
            label: "Enabled",
            field: "enabled",
            sort: "asc",
          },
          {
            label: "action",
            field: "action",
            sort: "asc",
          },
        ],
        rows: tempUsers,
      };
      setData(tempData);
      handleEditModal();
    }
  };

  // jsx
  return (
    <div style={{ padding: "4rem" }}>
      <Modal
        title="Add User"
        width="60vw"
        open={openModal}
        onClose={handleModal}
        component={
          <AddUserModal
            userForm={userForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        }
      />
      <Modal
        width="100vw"
        height="100vh"
        open={openEditModal}
        onClose={handleEditModal}
        component={
          <UserInfo
            userForm={userForm}
            handleChange={handleChange}
            handleSubmit={handleUpdate}
            handleback={handleEditModal}
          />
        }
      />
      <Header handleModal={handleModal} />
      <div>
        <DatatablePage data={data} />
      </div>
    </div>
  );
}
