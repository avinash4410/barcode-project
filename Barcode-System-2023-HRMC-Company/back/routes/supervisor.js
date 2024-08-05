const express = require('express');
const connection = require('../connection');
const router = express.Router();
require('dotenv').config();

router.post('/add', (req, res) => {
    let data = req.body;
    console.log("Add superwisor data", data);
    //batchMadeBy,batchcode,batchweighed,custname,itemDesc,mcNo,modulingdate,mouldername,mouldingQty,oid,oname,shift
    query = "insert into supervisor(cardNo,cid,custName,city,itemName,itemDesc,batchcode,batchweighed,batchMadeBy,mouldingQty,modulingDate,boxQty,moulderName,shift,mcNo,operatorId,inspectorId,inspectorName,inspectedDate,rejectorId,rejectorName,inspectedQty,oid,otsDate,totalRejectedQty,totalOkQty,totalSortedQty,finishingQty,RejectorSubmitDate,RejectorRemark,RejectorReson) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    connection.query(query, [data.cardNo, data.cid, data.custName, data.city, data.itemName, data.itemDesc, data.batchCode,
    data.batchWeighed, data.batchMadeBy, data.mouldingQty, data.modulingDate, data.boxQty, data.moulderName, data.shift, data.mcNo, data.operatorId, data.inspectorId, data.inspectorName, data.inspectedDate, data.rejectorId, data.rejectorName, data.inspectedQty, data.oid, data.otsDate, data.totalRejectedQty, data.totalOkQty, data.totalSortedQty, data.finishingQty, data.RejectorSubmitDate, data.RejectorRemark, data.RejectorReson], (err, results) => {
        // cardNo,partNo,custmerName,itemName,itemDesc,custName,itemDesc,batchcode,batchweighed,batchMadeBy,mouldingQty,modulingDate,boxQty,moulderName,shift,mcNo,inspectorName,rejectorName,inspectedQty,otsDate,totalRejectedQty,totalOkQty,totalSortedQty,finishingQty,RejectorSubmitDate,RejectorRemark,RejectorReson

        if (!err) {
            // console.log(results)
            setTimeout(() => {
                return res.status(200).json({ message: "Successfully Registered" })
            }, 6000);
            // return res.status(200).json({ message: "Successfully Registered" })
        }
        else {
            console.log("Error", err)
            return res.status(500).json(err)
        }
    })
})


// router.delete('/:cardNo', (req, res) => {
//     let cardNO = req.params.cardNo;
//     //batchMadeBy,batchcode,batchweighed,custname,itemDesc,mcNo,modulingdate,mouldername,mouldingQty,oid,oname,shift
//     query = "delete from supervisor where cardNo='" + cardNO + "'";
//     connection.query(query, (err, results) => {
//         if (!err) {
//             console.log(results)
//             return res.status(200).json({ message: "Successfully Deleted" })
//         }
//         else {
//             console.log("Error", err)
//             return res.status(500).json(err)
//         }
//     })
// })


router.delete('/:cardNo', (req, res) => {
    let cardNO = req.params.cardNo;

    // Delete from supervisor table
    let querySupervisor = "DELETE FROM supervisor WHERE cardNo='" + cardNO + "'";
    connection.query(querySupervisor, (errSupervisor, resultsSupervisor) => {
        if (!errSupervisor) {
            console.log(resultsSupervisor);

            // Delete from other_table_name
            let queryOtherTable = "DELETE FROM barcode WHERE cardNo='" + cardNO + "'";
            connection.query(queryOtherTable, (errOtherTable, resultsOtherTable) => {
                if (!errOtherTable) {
                    console.log(resultsOtherTable);
                    return res.status(200).json({ message: "Successfully Deleted from both tables" });
                } else {
                    console.log("Error in deleting from other_table_name", errOtherTable);
                    return res.status(500).json(errOtherTable);
                }
            });
        } else {
            console.log("Error in deleting from supervisor", errSupervisor);
            return res.status(500).json(errSupervisor);
        }
    });
});



router.get('/get', (req, res) => {
    let query = "select * from supervisor ORDER BY cardNo desc ";
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
    let cardNo = req.params.cardNo
    let query = "select * from supervisor where cardNo = ?";
    connection.query(query, [cardNo], (err, results) => {
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
// router.patch('/updateData', (req, res) => {
//     let updateData = req.body;
//     //batchMadeBy,batchcode,batchweighed,custname,itemDesc,mcNo,modulingdate,mouldername,mouldingQty,oid,oname,shift
//     query = "update item set ITEM_NO =? ,ITEM_NAME = ?,ITEM_DESCRIPTION =?,boxQty=? where ITEM_NO =?;"
//     connection.query(query, [ data.itemName, data.itemDesc, data.boxQty,data.itemNo], (err, results) => {
//         if (!err) {
//             console.log(results)
//             return res.status(200).json({ message: "Successfully Updated" })
//         }
//         else {
//             console.log("Error", err)
//             return res.status(500).json(err)
//         }
//     })
// })


router.patch('/UpdateData/:id', (req, res) => {

    let id = req.params.id;
    let data = req.body;
    console.log("ID:", id);
    console.log(data);
    //batchMadeBy,batchcode,batchweighed,custname,itemDesc,mcNo,modulingdate,mouldername,mouldingQty,oid,oname,shift
    query = "update supervisor set custName = ?,city =?, itemName =?,itemDesc =?,batchcode=?,batchweighed =?,batchMadeBy =?,mouldingQty=?,modulingDate =?,boxQty =?,moulderName =?,shift =?,mcNo =?,inspectorName =?,rejectorId=?, rejectorName =? where cardNo =?;"
    connection.query(query, [data.custName, data.city, data.itemName, data.itemDesc, data.batchCode, data.batchWeighed, data.batchMadeBy, data.mouldingQty, data.modulingDate, data.boxQty, data.moulderName, data.shift, data.mcNo, data.inspectorName, data.rejectorId, data.rejectorName, data.cardNo], (err, results) => {
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
router.patch('/updateCheck/:id', (req, res) => {
    let id = req.params.id;
    let isChecked = req.body.isChecked;
    console.log("DATA", id);
    console.log("DATA", isChecked);
    query = "update supervisor set supervisor.isChecked = ? where supervisor.cardNo = ?";
    connection.query(query, [isChecked, id], (err, results) => {
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

router.patch('/updateOperatorTask', (req, res) => {
    let data = req.body;
    console.log("Data", data);
    let query = "update supervisor set otsDate=?, finishingQty=?, sortQty=?, remark=? where cardNo=?";
    connection.query(query, [data.otsDate, data.finishingQty, data.sortQty, data.remark, data.cardNo], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "CardNo " + data.cardNo + " does not exist" });
            }
            return res.status(200).json({ message: "data updated successfully" })
        }
        else {
            console.log(err);
            return res.status(500).json(err)
        }
    })
})
router.patch('/updateOperatorTask', (req, res) => {
    let data = req.body;
    console.log("Data", data);
    let query = "update supervisor set otsDate=?, finishingQty=?, sortQty=?, remark=? where cardNo=?";
    connection.query(query, [data.otsDate, data.finishingQty, data.sortQty, data.remark, data.cardNo], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "User id does not exist" });
            }
            return res.status(200).json({ message: "data updated successfully" })
        }
        else {
            console.log(err);
            return res.status(500).json(err)
        }
    })
})

router.patch('/updateInspectorTask', (req, res) => {
    let data = req.body;
    console.log("Inspector Data", data);
    let query = "update supervisor set inspectedQty=?, inspectorRejectedQty=?, inspectedDate=?,otsDate=?, inspectorStartDate = ?, inspectorEndDate = ? where cardNo=?";
    connection.query(query, [data.inspectedQty, data.inspectorRejectedQty, data.inspectedDate, data.otsDate, data.inspectorStartDate, data.inspectorEndDate, data.cardNo], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "CardNo does not exist" });
            }
            return res.status(200).json({ message: "data updated successfully" })
        }
        else {
            console.log(err);
            return res.status(500).json(err)
        }
    })
})
router.patch('/updateRejectorTask', (req, res) => {
    let data = req.body;
    console.log("Data", data);
    let query = "update supervisor set totalOkQty=?, totalRejectedQty=?,RejectorRemark=?,totalSortedQty=?,RejectorReson=?,RejectorSubmitDate=?,finishingQty=?,totalOkQty = ?, RejectorStartTime =? ,RejectorEndTime = ? where cardNo=?";
    connection.query(query, [data.totalOkQty, data.totalRejectedQty, data.RejectorRemark, data.totalSortedQty, data.RejectorReson, data.RejectorSubmitDate, data.finishingQty, data.totalOkQty, data.RejectorStartTime, data.RejectorEndTime, data.cardNo], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "CardNo does not exist" });
            }
            return res.status(200).json({ message: "data updated successfully" })
        }
        else {
            console.log(err);
            return res.status(500).json(err)
        }
    })
})

router.post('/generateBarcode', (req, res) => {
    try {
        let data = req.body;
        let max_barcode = 1000000001;
        console.log("barcode data", data);
    
        let query = "select max(barcode) as max_barcode from barcode";
        let query2 = "insert into barcode(barcode, cardNo, oid) values (?, ?, ?);"
    
        connection.query(query, (err, results) => {
            if (!err) {
                console.log("Result..", results);
    
                if (results && results.length > 0 && results[0].max_barcode) {
                    max_barcode = parseInt(results[0].max_barcode);
                }
    
                const barcodesToInsert = Array.from({ length: data.qty }, (_, i) => max_barcode + i + 1);
    
                barcodesToInsert.forEach(barcode => {
                    connection.query(query2, [barcode, data.cardNo, data.oid], (err, results) => {
                        if (!err) {
                            console.log(barcode);
                        } else {
                            console.log("Error", err);
                        }
                    });
                });
    
                return res.status(200).json({ message: "Successfully Generated" });
            }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})


router.get('/getBarcodes/:id', (req, res) => {
    console.log("All Barcodes");
    let id = req.params.id
    console.log(id);
    let query = "select * from barcode where cardNo = ?";
    connection.query(query, [id], (err, results) => {
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


router.patch('/updateBarcodeStatus', (req, res) => {
    let data = req.body;
    console.log("Data", data);

    let query1 = "select barcode, status from barcode where barcode = ?"
    let query2 = "update barcode set status=?, SCAN_DATE=? where barcode=?";
    connection.query(query1, [data.barcode], (err, results) => {
        if (!err) {
            console.log("result", results);
            if (results.length > 0) {
                if (!results[0].status) {
                    connection.query(query2, [data.status, data.scanDate, data.barcode], (err, results) => {
                        if (!err) {
                            if (results.affectedRows == 0) {
                                return res.status(404).json({ message: "barcode does not exist..." });
                            }
                            else
                                return res.status(200).json({ message: "barcode updated successfully" })
                        }
                        else {
                            console.log(err);
                            return res.status(500).json(err)
                        }
                    })
                } else {
                    return res.status(404).json({ message: "Barcode already verified..", status: results[0].status });
                }
            }
            else {
                return res.status(404).json({ message: "Barcode does not exist" });
            }
            // return res.status(200).json({ message: "data updated successfully" })
        }
        else {
            return res.status(404).json({ message: "Barcode does not exist" });
        }
    })
})


router.get('/getAllById/:id', (req, res) => {
    console.log("GetRolewise");
    let id = req.params.id
    console.log(id);
    // let query = "select id,name,email,contactNumber,status from user where id ='user'";
    let query = "select * from supervisor where oid = ?";
    connection.query(query, [id], (err, results) => {
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

router.get('/getAllOperatorTaskById/:id', (req, res) => {
    console.log("GetRolewise");
    let id = req.params.id
    console.log(id);
    // let query = "select id,name,email,contactNumber,status from user where id ='user'";
    let query = "select * from supervisor where operatorId = ?";
    connection.query(query, [id], (err, results) => {
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
router.get('/getAllTaskByInspectorId/:id', (req, res) => {
    console.log("GetRolewise");
    let id = req.params.id
    console.log(id);
    // let query = "select id,name,email,contactNumber,status from user where id ='user'";
    let query = "select * from supervisor where inspectorId = ?";
    connection.query(query, [id], (err, results) => {
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
router.get('/getAllTaskByRejectorId/:id', (req, res) => {
    console.log("GetRolewise");
    let id = req.params.id
    console.log(id);
    // let query = "select id,name,email,contactNumber,status from user where id ='user'";
    let query = "select * from supervisor where rejectorId = ?";
    connection.query(query, [id], (err, results) => {
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

router.get('/get', (req, res) => {
    // let query = "select id,name,email,contactNumber,status from user where role ='user'";
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

router.get('/:id', (req, res) => {
    let id = req.params.id
    console.log(id);
    // let query = "select id,name,email,contactNumber,status from user where id ='user'";
    let query = "select * from supervisor where cardNo = ?";
    connection.query(query, [id], (err, results) => {
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


module.exports = router;