const express = require("express");
const mongoose = require("mongoose");
//importing patient model
const Patient = require("./models/patientModel");

const server = express();

//allowing server to use json
server.use(express.json());

//creating a new patient
server.post("/createPatient", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    console.log(error.message);
    res.status(503).json({ message: error.message });
  }
});

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
