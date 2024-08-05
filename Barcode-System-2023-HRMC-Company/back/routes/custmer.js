const express = require('express');
const connection = require('../connection');
const router = express.Router();
require('dotenv').config();

router.post('/add', (req, res) => {
    let data = req.body;
    //batchMadeBy,batchcode,batchweighed,custname,itemDesc,mcNo,modulingdate,mouldername,mouldingQty,oid,oname,shift
    query = "insert into customer(C_ID,CUSTOMER_NAME ,MOBILE_NUMBER,EMAIL,CITY) values(?,?,?,?,?);"
    connection.query(query, [data.cid, data.customerName, data.moblieNo, data.email, data.city], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Successfully Registered" })
        }
        else {
            console.log("Error", err)
            return res.status(500).json(err)
        }
    })
})

router.patch('/updateData', (req, res) => {
    let data = req.body;
    //batchMadeBy,batchcode,batchweighed,custname,itemDesc,mcNo,modulingdate,mouldername,mouldingQty,oid,oname,shift
    query = "update customer set CUSTOMER_NAME =? ,MOBILE_NUMBER = ?,EMAIL =?,CITY =? where C_ID =?;"
    connection.query(query, [data.customerName, data.moblieNo, data.email, data.city,data.cid], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Successfully Updated" })
        }
        else {
            console.log("Error", err)
            return res.status(500).json(err)
        }
    })
})

router.get('/get', (req, res) => {
    let query = "select * from customer Order By C_ID desc";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err)
        }
    })
})

router.delete('/:cid', (req, res) => {
    let cid = req.params.cid;
    query = "delete from customer where C_ID = ?";
    connection.query(query,[cid], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Successfully Deleted" })
        }
        else {
            console.log("Error", err)
            return res.status(500).json(err)
        }
    })
})


module.exports = router;