// import componenet and require files
import React from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import axios from "axios";
import { Link } from "react-router-dom";

class Registration extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      position: "",
      salary: "",
    },
    message: "",
    submitted: false,
  };
  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleSubmit = () => {
    axios
      .post("/api/employee/register", this.state.formData)
      .then((res) => {
        console.log(res);
        if (res.data.status === "failure") {
          this.setState({
            message: res.data.error_msg,
            submitted: false,
          });
        } else {
          window.appHistory.push("/DashBoard");
          }
      })
      .catch((error) => {
        console.log("error ===>", error);
        this.setState({
          message: "Failed to connect to server",
          submitted: false,
        });
      });
  this.setState({ submitted: true });
  };

  render() {
    const { formData, submitted } = this.state;
    const style1={
      "variant":"contained", 
      "color":"primery",
      "align":"center",
      
    }  
    return (
      <ValidatorForm align="center" ref="form" onSubmit={this.handleSubmit}>
      <AppBar position="static">
  <Toolbar>
    <Grid
      justify="space-between"
      container 
      spacing={24}
    >
      <Grid item>
      <Typography color="inherit" align="center" variant="h6">Employee Registration Form</Typography>
      </Grid>

      <Grid item>
        <div>
         
          <Button variant="contained" >
          <Link style={style1} to="/Dashboard">Employee List</Link>
          </Button>
        </div>
      </Grid>
    </Grid>
  </Toolbar>
</AppBar>
        <br />
        <br />
        <br />
        <br />
        <TextValidator
          label="FirstName"
          onChange={this.handleChange}
          name="firstName"
          value={formData.firstName}
          validators={["required"]}
          errorMessages={["FirstName is required"]}
        />
        <br />
        <TextValidator
          label="LastName"
          onChange={this.handleChange}
          name="lastName"
          value={formData.lastName}
          validators={["required"]}
          errorMessages={["LastName is required"]}
        />
        <br />
        <TextValidator
          label="Email"
          onChange={this.handleChange}
          name="email"
          value={formData.email}
          validators={["required", "isEmail"]}
          errorMessages={["Email is required", "email is not valid"]}
        />
        <br />
        <TextValidator
          label="Position"
          onChange={this.handleChange}
          name="position"
          
          validators={["required"]}
          errorMessages={["Position field is required"]}
          value={formData.position}
        />
        <br />
        <TextValidator
          label="Salary"
          onChange={this.handleChange}
          name="salary"
          type="number"
          validators={["required"]}
          errorMessages={["Salary field is required"]}
          value={formData.salary}
        />
        <br />
        <br />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={submitted}
        >
          {(submitted && "Your form is submitted!") || (!submitted && "Submit")}
        </Button>
        <br/>
        <br/>
        <div>{this.state.message}</div>
      </ValidatorForm>
    );
  }
}

export default Registration;
