import React, { Component } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Toolbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

class DashBoard extends React.Component {
    state = {
    employee: [],
    
}

componentDidMount(){
    axios.get("/api/employee/list")
        .then(response => {
            const employee = response.data.employs;
            this.setState({employee})
           console.log(employee);
        })
        .catch(error => {
          console.log(error);
        });
      }
      delete(id){
          axios.delete(`/api/employee/delete/${id}`,)
      .then(()=>{
          this.componentDidMount()
      })
        }
    render() {
      const style1={
        "variant":"contained", 
        "color":"primery",
        "align":"center",
        
      }  
       return( 
        <TableContainer component={Paper}>
        <AppBar position="static">
        <Toolbar>
          <Grid
            justify="space-between" 
            container 
            spacing={24}
          >
            <Grid item>
            <Typography color="inherit" align="center" variant="h6">Employee List</Typography>
            </Grid>
      
            <Grid item>
              <div>
               
                <Button variant="contained" >
                <Link style={style1} to="/">Add Employee</Link>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
<Table  aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Employee Email</TableCell>
          <TableCell align="right">FirstName</TableCell>
          <TableCell align="right">LastName</TableCell>
          <TableCell align="right">Position</TableCell>
          <TableCell align="right">Salary</TableCell>
          <TableCell align="right"> </TableCell>
          <TableCell align="right"> </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {this.state.employee.map((employs) => (
            <TableRow key={employs._id}>
            <TableCell component="th" scope="row">{employs.email}</TableCell>
            <TableCell align="right">{employs.firstName}</TableCell>
            <TableCell align="right">{employs.lastName}</TableCell>
            <TableCell align="right">{employs.position}</TableCell>
            <TableCell align="right">{employs.salary}</TableCell>
            <TableCell align="right"> <Button onClick={(e) => this.delete(employs._id)} color="secondary">Delete</Button></TableCell>
            <TableCell align="right"> <Button color="primary"><Link to={"editemployee/" + employs._id} >Update</Link></Button></TableCell>
            </TableRow>
                  ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}
}
export default DashBoard;
