const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
  {
    patient_Id: {
      type: String,
      required: true,
      unique: true,
    },
    surname: {
      type: String,
      required: true,
    },
    other_names: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    residential_address: {
      type: String,
      required: true,
    },
    emergency_name: {
      type: String,
      required: true,
    },
    emergency_contact: {
      type: String,
      required: true,
    },
    relationship_with_emergency_contact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
