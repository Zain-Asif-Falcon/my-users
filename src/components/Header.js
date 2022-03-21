// Init
import React from "react";
import { Button } from "@mui/material";

// Component
export default function Header(props) {
  return (
    <div className="header-container">
      <div>
        <h1>My Users</h1>
      </div>
      <div>
        <Button variant="contained" onClick={props.handleModal}>
          Add User
        </Button>
      </div>
    </div>
  );
}
