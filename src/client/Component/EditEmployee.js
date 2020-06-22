import React, { Component } from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class EditEmployee extends Component {
    constructor(props) {
    super(props);
    this.state = {
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    salary:'',
    message: "",
    submitted: false,
    }
    }
    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
      }
    componentDidMount = () => {
     this.getEmployeeById();
        }
       
 getEmployeeById() {
  
  
    axios.get('/api/employee/editEmployee/' + this.props.match.params.id)
  .then((response) => {
    
    this.setState({
    firstName: response.data.employ.firstName,
    lastName: response.data.employ.lastName,
    email: response.data.employ.email,
    position: response.data.employ.position,
    salary:response.data.employ.salary
    });
    console.log(response);
    })
    .catch((error) => {
    console.log(error);
    })
    }
    


handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, position,salary } = this.state;
    axios.post('/api/employee/updateEmployee/' + this.props.match.params.id, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    position: position,
    salary:salary
    })
    .then((response) => {
    console.log(response);
    this.props.history.push('/Dashboard');
    })
    .catch((error) => {
    console.log(error);
    this.setState({
      message: "Email is already Exist",
      submitted: false,
    });
    });
    
    }
    render() {
        const { formData, submitted } = this.state;
    
        return (
          <ValidatorForm align="center" ref="form" onSubmit={this.handleSubmit}>
            <AppBar>
              <ToolBar>
                <Typography variant="h6">Update Employee Information</Typography>
              </ToolBar>
            </AppBar>
            <br />
            <br />
            <br />
            <br />
            <TextValidator
              label="FirstName"
              onChange={this.handleChange}
              name="firstName"
              value={this.state.firstName}
              validators={["required"]}
              errorMessages={["FirstName is required"]}
            />
            <br />
            <TextValidator
              label="LastName"
              onChange={this.handleChange}
              name="lastName"
              value={this.state.lastName}
              validators={["required"]}
              errorMessages={["LastName is required"]}
            />
            <br />
            <TextValidator
              label="Email"
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
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
              value={this.state.position}
            />
            <br />
            <TextValidator
              label="Salary"
              onChange={this.handleChange}
              name="salary"
              type="number"
              validators={["required"]}
              errorMessages={["Salary field is required"]}
              value={this.state.salary}
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
    export default EditEmployee;    



