// require files
const mongoose = require("mongoose");

// create user schema
const EmploySchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model("Employ", EmploySchema);
