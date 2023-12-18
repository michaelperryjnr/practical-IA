const express = require("express");
const mongoose = require("mongoose");

const server = express();

mongoose
  .connect(
    "mongodb+srv://ugmc:ugmcadmin@practical-ia.fipt1nu.mongodb.net/Patients-DB?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to UGMC databse");
  })
  .then(() => {
    server.listen(3000, () => {
      console.log(`Sever started at https://localhost:3000`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
