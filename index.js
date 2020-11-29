/*
Authored By : @Santhoshkumar S
Contact : santhosh21051998@gmail.com
*/

//nodemon index dev purpose used on package.json
const express = require('express');
const bodyParser = require('body-parser');
var controller = require('./customer.controller');
// create express app
const app = express();
// Setup server port
const port = 5000;
var cors = require('cors')
app.use(cors())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});
app.post('/createcustomer', controller.create_customer);
app.post('/createcustomerbill', controller.create_customer_bill);
app.post('/getcustomer',controller.get_customer);
app.post('/getcustomerbill',controller.get_customer_bill);
app.post('/updatecustomer',controller.update_customer);
app.post('/updatecustomerbill',controller.update_customer_bill);
app.post('/deletecustomer',controller.delete_customer);
app.post('/deletecustomerbill',controller.delete_customer_bill);
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});