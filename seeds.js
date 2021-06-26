var Watches = require("./models/watchSchema");

var seed_watches = [
  {
    id: "001",
    name: "Rolex",
    price: 100,
    discountPrice: 200,
    discountQty: 3,
  },
  {
    id: "002",
    name: "Michael Kors",
    price: 80,
    discountPrice: 120,
    discountQty: 2,
  },
  {
    id: "003",
    name: "Swatch",
    price: 50,
  },
  {
    id: "004",
    name: "Casio",
    price: 30,
  },
];
async function seedDB() {
  try {
    await Watches.remove({});
    for (const seed of seed_watches) {
      let watch = await Watches.create(seed);
      watch.save();
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = seedDB;
