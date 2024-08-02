//imports

const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require('path')
const port = 3000 || 8000;
const { mySqlConnection } = require("./config/db");
const router = require("./routers/StudentRouter");
const cors = require("cors");

//always use this at the top
app.use(express.json()); //parses the incoming json request body
//cors
app.use(cors())
//to serve static files like css, images, js
app.use(express.static(path.join(__dirname, 'public')))

//api routing
app.use("/api/v1/student", router);

//starting server
app.get("/", (req, res) => {
  res.send("Hello World");
});

//connecting to mysql

app.use(morgan("dev"));

mySqlConnection
  .query("SELECT 1")
  .then(() => {
    console.log("connected to database");
    //listening to port
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
