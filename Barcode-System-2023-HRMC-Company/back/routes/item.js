const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Add new Item 
router.post('/add', (req, res) => {
    let item = req.body;
    console.log(item, "Items");
    query = "insert into item(ITEM_NO,  ITEM_NAME, ITEM_DESCRIPTION,BOX_QTY,CUSTOMER_NAME ) values(?,?,?,?,?); "
    connection.query(query, [item.itemNo, item.itemName, item.itemDesc, item.boxQty, item.customerName], (err, results) => {
        if (!err) {
            console.log(results)
            return res.status(200).json({ message: "Successfully Registered" })
        }
        else {
            console.log("Error", err)
            return res.status(500).json(err)
        }
    })
})

//Delete Single Item
router.delete('/:itemNo', (req, res) => {
    let itemNo = req.params.itemNo;
    //batchMadeBy,batchcode,batchweighed,custname,itemDesc,mcNo,modulingdate,mouldername,mouldingQty,oid,oname,shift
    query = "delete from item where ITEM_NO='" + itemNo + "'";
    connection.query(query, (err, results) => {
        if (!err) {
            console.log(results)
            return res.status(200).json({ message: "Successfully Deleted" })
        }
        else {
            console.log("Error", err)
            return res.status(500).json(err)
        }
    })
})

router.get('/itemNameSingel', (req, res) => {

    //batchMadeBy,batchcode,batchweighed,custname,itemDesc,mcNo,modulingdate,mouldername,mouldingQty,oid,oname,shift
    query = " select ITEM_NAME from item";
    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error occurred' });
        }
        else {
            const item1 = results.map((row) => row.ITEM_NAME);
            res.send({
                status: true,
                 data: item1
            })

        }
    })
})

//get All Items
router.get('/get', (req, res) => {
    let query = "select * from item Order By ITEM_NO";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err)
        }
    })
})

//get Single Item
router.get('/:itemNo', (req, res) => {
    let itemNo = req.params.itemNo
    let query = "select * from item where ITEM_NO = ?";
    connection.query(query, [itemNo], (err, results) => {
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

// update Item
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    console.log("Id :::::::::::::::", id);
    let data = req.body;
    console.log("Updating Data", data);
    //batchMadeBy,batchcode,batchweighed,custname,itemDesc,mcNo,modulingdate,mouldername,mouldingQty,oid,oname,shift
    query = "update item set ITEM_NAME = ?,ITEM_DESCRIPTION =?,BOX_QTY=?,CUSTOMER_NAME=? where ITEM_NO =?;"
    connection.query(query, [data.itemName, data.itemDesc, data.boxQty, data.customerName, id], (err, results) => {
        if (!err) {
            console.log(results)
            return res.status(200).json({ message: "Successfully Updated" })
        }
        else {
            console.log("Error", err)
            return res.status(500).json(err)
        }
    })
})





module.exports = router;


