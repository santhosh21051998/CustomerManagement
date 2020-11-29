/*
Authored By : @Santhoshkumar S
Contact : santhosh21051998@gmail.com
*/

var dbConn = require('./config/db.config');
var Customer = function (jsondata) {
    //console.log('model created successfully');
    this.owner_id = jsondata.owner_id;
    this.name = jsondata.name;
    this.phone = jsondata.phone;
    this.address = jsondata.address;
    this.active = "Y";
    this.created_by = jsondata.created_by;
    this.updated_by = jsondata.updated_by;
    this.created_date  = new Date();
    this.updated_date = new Date();
}
    Customer.create = function (newCus, result) {
        console.log("before insert");
    dbConn.query("INSERT INTO BARBER_CUSTOMER set ?", newCus, function (err, res) {
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

       Customer.get_customer = function (exisCus, result) {
        var query = dbConn.query(`SELECT BARBER_CUSTOMER.BARBER_CUSTOMER_ID AS "barber_customer_id", BARBER_CUSTOMER.OWNER_ID AS "owner_id", BARBER_CUSTOMER.NAME AS "name", 
        BARBER_CUSTOMER.PHONE AS "phone", 
		BARBER_CUSTOMER.ADDRESS AS "address",
		BARBER_CUSTOMER.CREATED_DATE AS "created_date",
		BARBER_CUSTOMER.UPDATED_DATE AS "updated_date"
		FROM BARBER_CUSTOMER 
        WHERE IF( "${exisCus.barber_customer_id}" <> "null", BARBER_CUSTOMER.BARBER_CUSTOMER_ID = ${exisCus.barber_customer_id}, 1=1) 
        AND IF("${exisCus.name}" <> "null", BARBER_CUSTOMER.NAME LIKE "%${exisCus.name}%", 1=1) 
        AND IF("${exisCus.phone}" <> "null", BARBER_CUSTOMER.PHONE LIKE "%${exisCus.phone}%", 1=1) 
        AND IF("${exisCus.address}" <> "null", BARBER_CUSTOMER.ADDRESS LIKE "%${exisCus.address}%", 1=1) 
        AND IF( "${exisCus.owner_id}" <> "null", BARBER_CUSTOMER.OWNER_ID = ${exisCus.owner_id}, 1=1) 
        AND BARBER_CUSTOMER.ACTIVE = "Y"`, function (err, res) {
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

        Customer.update_customer = function (exisCus, result) {
          var query = dbConn.query(`UPDATE BARBER_CUSTOMER SET
          NAME = "${exisCus.name}",
          PHONE = "${exisCus.phone}", 
          ADDRESS = "${exisCus.address}",
          UPDATED_BY = "${exisCus.updated_by}",
          UPDATED_DATE = NOW()
          WHERE BARBER_CUSTOMER_ID = ${exisCus.barber_customer_id}
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
  
          Customer.delete_customer = function (exisCus, result) {
            var query = dbConn.query(`UPDATE BARBER_CUSTOMER SET
            ACTIVE = "D",
            UPDATED_BY = "${exisCus.updated_by}",
            UPDATED_DATE = NOW()
            WHERE BARBER_CUSTOMER_ID = ${exisCus.barber_customer_id}
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

module.exports = Customer;