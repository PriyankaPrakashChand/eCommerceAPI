const Watch = require("../models/watchSchema");
const assert = require("assert");

describe("Reading Details of test Watch", (done) => {
  let watch;

  it("Finds watch with the id", (done) => {
    watch = new Watch({
      id: "test_id",
      name: "test_name",
      price: 100,
      discountPrice: 200,
      discountQty: 3,
    });
    watch
      .save()
      .then(
        Watch.findOne({ id: "test_id" }).then((watch) => {
          console.log("found " + watch);
          assert(watch.name === "test_name");
        })
      )
      .then(() => done(), done);
  });
});
