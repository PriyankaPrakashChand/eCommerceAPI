var mongoose = require("mongoose");

var watchSchema = new mongoose.Schema({
  id: { type: String, required: true }, // purposelly chosen string to abide by the convention 00#
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  discountQty: { type: Number },
});

module.exports = mongoose.model("Watches", watchSchema);
