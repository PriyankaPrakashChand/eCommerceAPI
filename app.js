var express = require("express"),
  app = express();
app.set("port", process.env.PORT || 8080);
(bodyParser = require("body-parser")),
  (mongoose = require("mongoose")),
  (querystring = require("querystring")),
  (Watches = require("./models/watchSchema")),
  (seedDb = require("./seeds"));

var bodyParser = require("body-parser");
const { query } = require("express");
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect("mongodb://localhost:27017/watchCatalogue", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// add watch catalogue to db- for development purpose only
seedDb();

/**
 *
 * takes an array of all watch selections from user and counts the duplicates
 * returns an array of unique_selected ids by the customer
 *
 **/

function countDuplicates(list) {
  let counts = {};

  for (let i = 0; i < list.length; i++) {
    if (counts[list[i]]) {
      counts[list[i]] += 1;
    } else {
      counts[list[i]] = 1;
    }
  }
  return counts;
}

/**
 *
 * takes the list of unique_selected ids by the customer
 * returns final price
 *
 **/
async function getFinalPrice(uniqueIdsQty) {
  var finalPrice = 0;
  for (const [key, value] of Object.entries(uniqueIdsQty)) {
    watchId = `${key}`;
    qtyBought = `${value}`;
    console.log(watchId + ":" + qtyBought);
    // retrieve the essential price and discount details
    let watch = await Watches.findOne({ id: watchId });
    console.log(await watch);
    var discountQty = watch.discountQty;
    var discountPrice = watch.discountPrice;
    var originalPrice = watch.price;
    //for each qty in list if discount available then
    if (discountQty) {
      // int (qtyBought / discountQty) = quotient
      var quotient = (qtyBought / discountQty) | 0; //or with 0 to get the integer value only
      // int (qtyBought % discountQty) = remainder
      var remainder = qtyBought % discountQty;
      // price+= quotient *discountprice + remainder*price
      finalPrice += quotient * discountPrice + remainder * originalPrice;
    } else {
      finalPrice += qtyBought * originalPrice;
    }
  }

  console.log("finalPrice= " + finalPrice);
  return finalPrice;
}

app.post("/checkout", urlencodedParser, function (req, res) {
  console.log("Rcvd: " + JSON.stringify(req.body));
  // for single watches only -fix structure of the request
  if (typeof req.body[""] === "string") {
    req.body[""] = new Array(req.body[""]);
    console.log(req.body[""]);
  }
  // application logic:
  uniqueIdsQty = countDuplicates(req.body[""]);
  getFinalPrice(uniqueIdsQty).then((finalPrice) => {
    res.status(200).send(JSON.stringify({ price: finalPrice }));
  });
});

// custom 404 page
app.use(function (req, res) {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not Found");
});

// custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});
//start server
app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
