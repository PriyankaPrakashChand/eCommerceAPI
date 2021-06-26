# eCommerceAPI
Coding Challenge:
We would like you to build a simplified e-commerce API with a single endpoint that performs a
checkout action. The single endpoint should take a list of watches and return the total cost.
In terms of programming language, we work with Kotlin and Java 8+, if you feel that you have the
experience to build a solution in any of those languages then please do. Otherwise, we are happy for
you to build a solution using a language and framework that you feel best showcases your ability.
Watch catalogue
Below is a catalogue of four watches and their associated prices:
There are a few requirements worth noting here:
* The first two products have a possible discount. As an example, if the user attempts to
checkout three or six Rolex watches then they will receive the discount price once or twice,
respectively.
* There is no limit to the number of items or combinations of watches a user can checkout.
* There is no limit to the number of times a discount can be used.
* Similarly, a user can checkout a single item if they wish.
Endpoint reference
Watch ID Watch Name Unit Price Discount
001 Rolex 100 3 for 200
002 Michael Kors 80 2 for 120
003 Swatch 50
004 Casio 30
As a further guideline here's an endpoint definition that you can use to design your API endpoint.
Request
POST http://localhost:8080/checkout
# Headers
Accept: application/json
Content-Type: application/json
# Body
[
"001",
"002",
"001",
"004",
"003"
]
Response
# Headers
Content-Type: application/json
# Body
{ "price": 360 }

___________________________

# Solution:

## How to setup and run the application:
This application is programmed using NodeJS 
### Installation Requirements:
*  NodeJS
* MongoDB
* Postman Tool 
### In Brief: 
* Install NodeJS by following the tutorial in the link below:
    https://www.freecodecamp.org/news/how-to-install-node-in-your-machines-macos-linux-windows/
* Install MongoDB by following the tutorial in the link below:
    https://docs.mongodb.com/manual/administration/install-community/
For postman:DONOT use POSTMAN for WEB as this is a locally hosted webapi so ensure that you install postman on your local machine by following the link below:
https://learning.postman.com/docs/getting-started/installation-and-updates/#:~:text=Postman%20is%20available%20as%20a,click%20Download%20for%20your%20platform.
* include package.json in the file structure 
* use the command **npm app.js** in the command prompt to start the application server on port 8080 [if port 8080 is in use then automatically another port will be assigned to the server and the port number will be mentioned in command response on the CLI]
* use postman tool for testing the post request (E2E testing).
* personally I used VS Code to develop this application.
* For Testing I have used the mocha framework and the postman tool. 
  * End-to-end testing: In postman tool, click on the runner tab and run the complete eCommerceAPI collection to see that all 8 tests are passing. Click on the button below to get access the e2e tests in postman tool. Ensure that the app server has been started before these tests are run by using the commond **node app.js** from the project directory location.
  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/47b3c7ba1d43bfe4f35c)
  *  For mongoDB testing, simply run the command **npm run test** from the project directory location to ensure that all 3 tests are passing. These mongo commands were tested and then added to application logic. 
## My approach to the problem:
### Problem BreakDown : 
This problem was broken down into 3 stages and each stage was followed by unit testing. 
* Creating and Seeding the Database with a watch catalogue details as mentioned in the table above.
* setting up an express server for creating the server side web app that provides the required endpoint.
* Application Logic to calculate the final price that needs to be returned in the http response.

### DataBase:
I have used a nosql database[MongoDB].
The 
### Application Logic: 
The application logic is very simple:
* We will need a variable to accumulate the final_price that needs to be returned.
* Since a watchId can be selected multiple times and there is a discount based on the qty selected by the customer, the first step is find the qty selected for each watch id. This is programmed in the  count_duplicates function which returns and array objects each storing a unique selected watchID and its qty.
* The final Price will be calculated by iterating in a for loop (For each selected watch, add price to the final price
* If no discount is associated with a watch_id then simply add the original price multiplied 
* If discount is associated then find the quaotient and remainder for qtyBought by the customer divided by the discountQty. the price to be added is given by (quotient x discountPrice) + (remainder x originalPrice).
## Aspects that I would improve on:
* Stronger exception handling by adding try-catch blocks to avoid loop holes
* More Robust testing before deployment- try for 100% unit test coverage
* For the readWatchTest: ideally I should save a test watch instance to the database in a beforeEach async function and I should then read it in the it function but since I was facing some mocha errors and I was not able to fix it in a proper way but for now I used a hack. So I am saving the instance into the dB in the it function itself and using the then function to read the instance. This is a hack and not the ideal way of doing the test, however it doesnot impact the correctness of the assertion in any way so it is an acceptable technique. I would improve this issue by learning more deeply about the mocha testing framwork, the use of asynchronous it/beforeEach functions and the done call back function.



