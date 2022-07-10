const { Schema, model } = require("mongoose");

const rentalSchema = new Schema({
  cityName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  descr: {
    type: String,
    required: true,
    minLength: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  rentalImg: {
    type: String,
  }
});

const Rental = model("Rental", rentalSchema);

module.exports = Rental;
