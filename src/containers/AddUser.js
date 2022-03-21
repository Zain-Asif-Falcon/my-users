// init
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

// Add User component
const AddUserModal = (props) => {
  // jsx
  return (
    <form onSubmit={props.handleSubmit}>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              onChange={(e) =>
                props.handleChange(e.target.name, e.target.value)
              }
              value={props.userForm.values.username}
              variant="outlined"
              sx={{ width: "100%" }}
              error={
                props.userForm.touched.username &&
                props.userForm.errors.username
              }
              helperText={
                props.userForm.touched.username &&
                props.userForm.errors.username
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="FirstName"
              name="firstname"
              onChange={(e) =>
                props.handleChange(e.target.name, e.target.value)
              }
              value={props.userForm.values.firstname}
              variant="outlined"
              sx={{ width: "100%" }}
              error={
                props.userForm.touched.firstname &&
                props.userForm.errors.firstname
              }
              helperText={
                props.userForm.touched.firstname &&
                props.userForm.errors.firstname
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="LastName"
              name="lastname"
              onChange={(e) =>
                props.handleChange(e.target.name, e.target.value)
              }
              value={props.userForm.values.lastname}
              variant="outlined"
              sx={{ width: "100%" }}
              error={
                props.userForm.touched.lastname &&
                props.userForm.errors.lastname
              }
              helperText={
                props.userForm.touched.lastname &&
                props.userForm.errors.lastname
              }
            />
          </Grid>
        </Grid>
        <FormControl sx={{ mt: 2 }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Enabled</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="enabled"
            value={props.userForm.values.enabled}
            onChange={(e) => props.handleChange(e.target.name, e.target.value)}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          disabled={
            props.userForm.errors.firstname ||
            props.userForm.errors.lastname ||
            props.userForm.errors.username
          }
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddUserModal;
