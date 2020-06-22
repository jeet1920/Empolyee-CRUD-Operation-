// require file
const express = require("express");
const router = express.Router();
const employs = require("../models/Employ");

let resObj = {
  status: "",
  status_code: "",
  error_code: "",
  error_msg: "",
  result: "",
  
};
//  register route
router.post("/register", (req, res) => {
  console.log(req.body);
  const employ = new employs({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    position: req.body.position,
    salary: req.body.salary
  });
  employ
    .save()
    .then((data) => {
      res.send(data); //optinal---{ user: user._id }
    })
    .catch((err) => {
      let obj = Object.assign(resObj, {});
      obj.status = "failure";
      obj.status_code = 401;
      obj.error_msg = "Employ &  his Email already registered";
      res.json(obj);
    });
});
// To Get List Of Employees
router.get('/list',(req, res) =>{
  employs.find(function (err, employs) {
  if (err) {
  console.log(err);
  }
  else {
  res.json({employs});
  }
  });
  });

// To Delete The Employee
router.delete('/delete/:id' ,(req, res)=> {
  employs.findByIdAndRemove({ _id: req.params.id }, function (err, employ) {
  if (err) res.json(err);
  else res.json('Employee Deleted Successfully');
  });
  });
  
// To Get Employee Details By Employee ID
router.get('/editEmployee/:id',(req,res)=>{
   let id = req.params.id;
  employs.findById(id, function (err, employ) {
  res.json({employ});
  });
  });
  
  // To Update The Employee Details
  router.post('/updateEmployee/:id',(req,res)=>{
  
  employs.findById(req.params.id, function (err, employ) {
  if (!employ)
  return next(new Error('Unable To Find Employee With This Id'));
  else {
  employ.firstName = req.body.firstName;
  employ.lastName = req.body.lastName;
  employ.email = req.body.email;
  employ.position = req.body.position;
  employ.salary = req.body.salary;
  
  
  employ.save()
  .then(employ => {
  res.json('Employee Updated Successfully');
  })
  .catch(err => {
  res.status(400).send("Unable To Update Employee");
  });
  }
  });
  });
  module.exports = router;
