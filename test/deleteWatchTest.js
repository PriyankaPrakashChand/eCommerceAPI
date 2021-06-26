// const Watch = require("../models/watchSchema");
// const assert = require("assert");

// describe("Deleting a Watch", (done) => {
//   let watch;
//   beforeEach(done, () => {
//     // watch is an instance of Watch Model
//     watch = new Watch({
//       id: "test_id",
//       name: "test_name",
//       price: 100,
//       discountPrice: 200,
//       discountQty: 3,
//     });
//     watch.save().then(() => done());
//   });
//   it("Removes all Watches", (done) => {
//     Watch.remove({})
//       // Checking if the watch was deleted from DB or not
//       .then(() => Watch.findOne({ id: "test_id" }))
//       .then((watch) => {
//         console.log("delete= " + watch);
//         assert(watch === null);
//         done();
//       });
//   });
// });

const Watch = require("../models/watchSchema");
const assert = require("assert");

describe("Deleting a Watch", (done) => {
  let watch;
  beforeEach(done, () => {
    // watch is an instance of Watch Model
    watch = new Watch({
      id: "test_id",
      name: "test_name",
      price: 100,
      discountPrice: 200,
      discountQty: 3,
    });
    watch.save().then(() => done());
  });
  it("Removes all Watches", (done) => {
    Watch.remove({})
      // Checking if the watch was deleted from DB or not
      .then(() => Watch.findOne({ id: "test_id" }))
      .then((watch) => {
        console.log("delete= " + watch);
        assert(watch === null);
        done();
      });
  });
});
