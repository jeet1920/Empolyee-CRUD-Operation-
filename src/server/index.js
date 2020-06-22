// require file
const express = require("express");
// const os = require("io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const EmployRoute = require("./routes/Employs"); // for use the user route
const app = express();
// const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static("dist"));
// app.get("/api/getUsername", (req, res) =>
//   res.send({ email: os.this.state.email })
// );
app.use("/api/employee", EmployRoute);

// conneted to db
mongoose.connect(
  "mongodb://localhost:27017/new",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (!error) {
      console.log("sucessful");
    } else {
      console.log("error");
    }
  }
);
// listen port
app.listen(process.env.PORT || 8081, () =>
  console.log(`Listening on port ${process.env.PORT || 8081}!`)
);
