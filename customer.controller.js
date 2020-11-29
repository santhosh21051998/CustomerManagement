/*
Authored By : @Santhoshkumar S
Contact : santhosh21051998@gmail.com
*/

var Customer = require('./customer.model');
var CustomerBill = require('./customerbill.model');
exports.create_customer = function(req, res) {
	console.log(` customer backend request ${JSON.stringify(req.body)}`);
    const new_customer = new Customer(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Customer.create(new_customer, function(err, customer) {
      if (err)
      res.send(err);
      res.json({error:false,message:"Customer added successfully!",data:customer});
    });
    }
    };

    exports.create_customer_bill = function(req, res) {
        const new_customerbill = new CustomerBill(req.body);
        //handles null error
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
          res.status(400).send({ error:true, message: 'Please provide all required field' });
        }else{
            CustomerBill.create(new_customerbill, function(err, customerbill) {
          if (err)
          res.send(err);
          res.json({error:false,message:"CustomerBill added successfully!",data:customerbill});
        });
        }
        };    

        exports.get_customer = function(req, res) {
          console.log(`customer : ${req.body}`);
            Customer.get_customer(req.body, function(err, result) {
              if (err)
              res.send(err);
              res.json(result);
            });
            }; 

            exports.get_customer_bill = function(req, res) {
              console.log(`customer : ${req.body}`);
              CustomerBill.get_customer_bill(req.body, function(err, result) {
                  if (err)
                  res.send(err);
                  res.json(result);
                });
                }; 

                exports.update_customer = function(req, res) {
                  console.log(`customer : ${req.body}`);
                  Customer.update_customer(req.body, function(err, result) {
                      if (err)
                      res.send(err);
                      res.json(result);
                    });
                    }; 
                 exports.update_customer_bill = function(req, res) {
                      console.log(`update_customer_bill : ${req.body}`);
                      CustomerBill.update_customer_bill(req.body, function(err, result) {
                          if (err)
                          res.send(err);
                          res.json(result);
                        });
                        }; 
                        exports.delete_customer = function(req, res) {
                          console.log(`delete_customer : ${req.body}`);
                          Customer.delete_customer(req.body, function(err, result) {
                              if (err)
                              res.send(err);
                              res.json(result);
                            });
                            }; 
                            exports.update_customer_bill = function(req, res) {
                              console.log(`update_customer_bill : ${req.body}`);
                              CustomerBill.update_customer_bill(req.body, function(err, result) {
                                  if (err)
                                  res.send(err);
                                  res.json(result);
                                });
                                }; 
                                exports.delete_customer_bill = function(req, res) {
                                  console.log(`delete_customer : ${req.body}`);
                                  CustomerBill.delete_customer_bill(req.body, function(err, result) {
                                      if (err)
                                      res.send(err);
                                      res.json(result);
                                    });
                                    }; 