const express = require('express');
const router = express.Router();
const connection = require('../connection');
require('dotenv').config();

router.get('/getAllBatchCodes', (req, res)=>{
    let query = "select * from batchCode";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err)
        }
        
    })
})


router.post('/addBatchCode', (req, res) => {
    let data = req.body;
    query = "insert into batchCode(BATCH_CODE) values(?);"
    connection.query(query, [data.batchCode], (err, results) => {
        if (!err) {
            // console.log(results)
            return res.status(200).json({ message: "Successfully Registered" })
        }
        else {
            console.log("Error", err)
            return res.status(500).json(err)
        }
    })
})

router.patch('/updateBatchCode', (req, res) => {
    let data = req.body;
    query = "update batchCode set BATCH_CODE =?  where id =?;"
    connection.query(query, [data.batchCode,data.id], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Successfully Updated" })
        }
        else {
            console.log("Error", err)
            return res.status(500).json(err)
        }
    })
})

router.delete('/deleteBatchCode/:id', (req, res) => {
    let id = req.params.id;
    query = "delete from batchCode where id = ?";
    connection.query(query,[id], (err, results) => {
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