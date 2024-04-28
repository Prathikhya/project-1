const mongoose = require("mongoose");
const initdata = require("./basic.js");
const Listing = require("../models/Listing");

// Connect to database
main()
    .then(() => {console.log("connect connected");
})
     .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Project1');
}


const initDt = async () => {
    await Listing.deleteMany({}); // delete all listings in the DB
    initdata.data = initdata.data.map((obj) => ({
      ...obj,
      owner: "662398901c21ddc5c0c5b608",
    }));
    let g = await Listing.insertMany(initdata.data); // add data from basic.js file to index.js
    console.log("data installized");
}

initDt();
