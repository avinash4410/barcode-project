/* const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/add', (req, res) => {
    let opr_item = req.body;
    console.log(item)
    // query = "select username,password,role from user where username = ?";
    // connection.query(query, [user.username], (err, results) => {
    //     if (!err) {
            // if (results.length <= 0) {
                query =  "INSERT INTO opr_item(oname, custname, itemDesc, batchcode, batchweighed, batchMadeBy, modulingdate, mouldername, shift, mcNo, mouldingQty ) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
              // query = "insert into opr_item(custname,  itemDesc, batchcode, batchweighed, batchMadeBy, modulingdate, mouldername, shift, mcNo, mouldingQty, rejectionQry1, finishingqtybaydone, rejectionQry2, rejectionQty3, okQty,reworkqty, totalokqty, totalRejectionQty, date, remark, shortby, reson) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); "
                connection.query(query, [opr_item.oname,opr_item.custname,opr_item.itemDesc,opr_item.batchcode,opr_item.batchweighed,opr_item.batchMadeBy,opr_item.modulingdate,opr_item.mouldername,opr_item.shift,opr_item.mcNo,opr_item.mouldingQty],(err,results)=> {
                    if (!err) {
                        console.log(results)
                        return res.status(200).json({ message: "Successfully Registered" })
                    }
                    else {
                        console.log("Error",err)
                        return res.status(500).json(err)
                    }
                })
            // }
            // else {
            //     return res.status(400).json({ message: "Username Already Exist" })
            // }
        // }
        // else {
        //     return res.status(500).json(err);
        // }
    // })
})


router.get('/get', (req, res) => {
    // let query = "select id,name,email,contactNumber,status from user where role ='user'";
    let query = "select * from opr_item";
    connection.query(query, (err, results) => {

        
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err)
        }
    })
})


module.exports = router; */