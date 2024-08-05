const express = require('express');
const connection = require('../connection');
const router = express.Router();
require('dotenv').config();

router.get('/get', (req, res) => {
    let query = "select * from supervisor";
    connection.query(query, (err, results) => {

        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err)
        }
    })
})

router.get('/:cardNo', (req, res) => {
    let id = req.params.cardNo
    console.log(id);
    let query = "select * from supervisor where cardNo = ?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            console.log(results[0]);
            return res.status(200).json(results);
        }
        else {
            console.log(err);
            return res.status(500).json(err)
        }
    })
})

router.post('/filter', (req, res) => {
    let data = req.body
    console.log(data);
    let query = "select * from supervisor where "+data.colName+" BETWEEN '"+data.dateFrom+"' AND '"+data.dateTo+"'";
    console.log("Query :",query);
    connection.query(query, (err, results) => {
        if (!err) {
            console.log(results);
            return res.status(200).json(results);
        }
        else {
            console.log(err);
            return res.status(500).json(err)
        }
    })
})

// router.get('/getByUser/:', (req, res) => {
//     let id = req.params.cardNo
//     console.log(id);
//     // let query = "select id,name,email,contactNumber,status from user where id ='user'";
//     let query = "select * from supervisor where cardNo = ?";
//     connection.query(query, [id], (err, results) => {
//         if (!err) {
//             console.log(results);
//             return res.status(200).json(results);
//         }
//         else {
//             console.log(err);
//             return res.status(500).json(err)
//         }
//     })
// })


// router.post('/rejectorReport', (req, res) => {
//     try {
//         query = "select * from supervisor where rejectorId IN (select oid from user where role = 'rejector')"
//         connection.query(query, (err, results) => {
//             if (!err) {
//                 console.log("Result..", results);
//             }
//         })
//         return res.status(200).json({ message: "Successfully Generated" })
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json(err)
//     }
// })

module.exports = router;