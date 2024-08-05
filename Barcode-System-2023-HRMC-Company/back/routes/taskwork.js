/* const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/add', (req, res) => {
    let taskwork = req.body;
    console.log(item)
    // query = "select username,password,role from user where username = ?";
    // connection.query(query, [user.username], (err, results) => {
    //     if (!err) {
            // if (results.length <= 0) {
                query = "INSERT INTO taskwork (moulder_name, item_description, batch_code, batch_weighed_by, batch_made_by, moulding_date, shift, machine_number, moulding_quantity) VALUES (?,?,?,?,?,?,?,?,?);"
                   connection.query(query, [
                    taskwork.oname,
                    taskwork.moulder_name,
                    taskwork.item_desc,
                    taskwork.batchcode,
                    taskwork.batchweighed,
                    taskwork.batchMadeBy,
                    taskwork.modulingdate,
                    taskwork.mouldername,
                    taskwork.shift,
                    taskwork.mcNo,
                    taskwork.mouldingQty],(err,results)=> {
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