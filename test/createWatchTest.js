//import the Watch model
const Watch = require("../models/watchSchema");
const assert = require("assert");

describe("Creating documents in MongoDB", (done) => {
  it("Creates a New Watch", (done) => {
    const newWatch = new Watch({
      id: "test_id",
      name: "test_name",
      price: 100,
      discountPrice: 200,
      discountQty: 3,
    });
    newWatch
      .save() // returns a promise after some time
      .then(() => {
        //if the newWatch is saved in db and it is not new
        assert(!newWatch.isNew);
      })
      .then(() => done(), done);
  });
});
