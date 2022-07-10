const db = require("../config/connection");
const { Rental, User } = require("../models");

const rentalSeeds = require("./rentalSeeds.json");

db.once("open", async () => {
  // clean database
  try {
    await User.deleteMany({});
    await Rental.deleteMany({});

    // bulk create each model
    const rentals = await Rental.insertMany(rentalSeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});