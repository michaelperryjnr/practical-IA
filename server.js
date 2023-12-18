const express = require("express");
const mongoose = require("mongoose");
//importing patient model
const Patient = require("./models/patientModel");
//importing encounter model

const Encounter = require("./models/encounterModel");

const server = express();

//allowing server to use json
server.use(express.json());

//excluding _id and __v from the json response
const exclude = '{ "_id": 0 , "__v": 0}';
const excludejson = JSON.parse(exclude);

//creating a new patient
server.post("/createPatient", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    const showPatient = await Patient.find(patient, excludejson);
    res.status(201).json(showPatient);
  } catch (error) {
    console.log(error.message);
    res.status(503).json({ message: error.message });
  }
});

//get all patients
server.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find({}, excludejson);
    res.status(200).json(patients);
  } catch (error) {
    console.log(error.message);
    res.status(503).json({ message: error.message });
  }
});

// router.get("/encounters", (req, res) => {
//   Encounter.find()
//     .populate("patient")
//     .exec(function (err, encounters) {
//       if (err) return res.status(500).send(err);
//       res.status(200).send(encounters);
//     });
// });

//create a encounter for a patient
server.post("/encounter/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);
    const encounter = await Encounter.create(req.body);
    patient.encounters.push(encounter);
    await patient.save();
    res.status(201).json(patient, excludejson);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
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
