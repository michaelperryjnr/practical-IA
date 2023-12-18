const mongoose = require("mongoose");

const Patient = require("./patientModel");

const encounterSchema = mongoose.Schema({
  encounter_ID: {
    type: String,
    required: true,
    unique: true,
  },
  date_and_time: {
    type: String,
    required: true,
  },
  encounter_type: {
    type: String,
    required: [true, "Emergency/OPD/Specialist Care"],
  },
});
const Encounter = mongoose.model("Encounter", encounterSchema);

module.exports = Encounter;
