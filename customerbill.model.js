/*
Authored By : @Santhoshkumar S
Contact : santhosh21051998@gmail.com
*/

var dbConn = require('./config/db.config');
var CustomerBill = function (jsondata) {
    //console.log('model created successfully');
    this.barber_customer_id = jsondata.barber_customer_id;
    this.owner_id = jsondata.owner_id;
    this.service = jsondata.service;
    this.service_description = jsondata.service_description;
    this.total_amount = jsondata.total_amount;
    this.active = "Y";
    this.created_by = jsondata.created_by;
    this.updated_by = jsondata.updated_by;
    this.created_date  = new Date();
    this.updated_date = new Date();
}
     CustomerBill.create = function (newBill, result) {
        console.log("before bill insert");
    dbConn.query("INSERT INTO BARBER_CUSTOMER_BILL set ?", newBill, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      console.log(res.insertId);
      result(null, res.insertId);
    }
    //dbConn.end();
    });
    };

      CustomerBill.get_customer_bill = function (exisCus, result) {
      var query = dbConn.query(`SELECT BARBER_CUSTOMER_BILL.BARBER_CUSTOMER_BILL_ID AS "barber_customer_bill_id", 
      BARBER_CUSTOMER_BILL.BARBER_CUSTOMER_ID AS "barber_customer_id", 
	  BARBER_CUSTOMER_BILL.OWNER_ID AS "owner_id", 
      BARBER_CUSTOMER_BILL.SERVICE AS "service", 
	  BARBER_CUSTOMER_BILL.SERVICE_DESCRIPTION AS "service_description",
      BARBER_CUSTOMER_BILL.TOTAL_AMOUNT AS "total_amount",
	  BARBER_CUSTOMER_BILL.CREATED_DATE AS "created_date",
	  BARBER_CUSTOMER_BILL.UPDATED_DATE AS "updated_date"
      FROM BARBER_CUSTOMER_BILL 
      WHERE IF( "${exisCus.barber_customer_id}" <> "null", BARBER_CUSTOMER_BILL.BARBER_CUSTOMER_ID = ${exisCus.barber_customer_id}, 1=1) \
      AND IF( "${exisCus.owner_id}" <> "null", BARBER_CUSTOMER_BILL.OWNER_ID = ${exisCus.owner_id}, 1=1) \
      AND BARBER_CUSTOMER_BILL.ACTIVE = "Y"`, function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(err, null);  
      }
      else{
        result(null, res);
      }
       //dbConn.end(); 
      });
      console.log(`executed query : ${query.sql}`);
      };
      CustomerBill.update_customer_bill = function (exisCus, result) {
        var query = dbConn.query(`UPDATE BARBER_CUSTOMER_BILL SET
        SERVICE = "${exisCus.service}",
        SERVICE_DESCRIPTION = "${exisCus.service_description}", 
        TOTAL_AMOUNT = "${exisCus.total_amount}",
        UPDATED_BY = "${exisCus.updated_by}",
        UPDATED_DATE = NOW()
        WHERE BARBER_CUSTOMER_BILL_ID = ${exisCus.barber_customer_bill_id}
        AND OWNER_ID = ${exisCus.owner_id} 
        AND ACTIVE = "Y"`, function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(err, null);  
        }
        else{
          result(null, res);
        }
         //dbConn.end(); 
        });
        console.log(`executed query : ${query.sql}`);
        };
 
        CustomerBill.delete_customer_bill = function (exisCusBill, result) {
          var query = dbConn.query(`UPDATE BARBER_CUSTOMER_BILL SET
          ACTIVE = "D",
          UPDATED_BY = "${exisCusBill.updated_by}",
          UPDATED_DATE = NOW()
          WHERE BARBER_CUSTOMER_BILL_ID = ${exisCusBill.barber_customer_bill_id}
          AND BARBER_CUSTOMER_ID = ${exisCusBill.barber_customer_id}
          AND OWNER_ID = ${exisCusBill.owner_id} 
          AND ACTIVE = "Y"`, function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(err, null);  
          }
          else{
            result(null, res);
          }
           //dbConn.end(); 
          });
          console.log(`executed query : ${query.sql}`);
          };


module.exports = CustomerBill;