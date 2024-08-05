const express = require('express');
const connection = require('../connection');
const router = express.Router();

/* router.get('/allCounts', (req, res, next) => {
    try {
        // let category = req.body;
        var categoryCount;
        var userCount;
        var barcodeCount;
        var query1 = "select count (ITEM_NO) as ItemCount from item";
        let err
        connection.query(query1, (err, results) => {
            if (!err) {
                ItemCount = results[0].ItemCount;
                var query2 = "select count(oid) as userCount from user";
                connection.query(query2, (err, results) => {
                    if (!err) {
                        userCount = results[0].userCount;
                        var query3 = "select count(id) as barcodeCount from barcode";
                        connection.query(query3, (err, results) => {
                            if (!err) {
                                barcodeCount = results[0].barcodeCount;
                                var data = {

                                    "ItemCount": ItemCount,
                                    "userCount": userCount,
                                    "barcodeCount": barcodeCount
                                }
                                return res.status(200).json(data);
                            }
                            else {
                                if (err) {
                                    console.log(" Err 3 :", err);
                                    return res.status(500).json(err);
                                }
                            }
                        })
                    }
                    else {
                        console.log("Err 2 :", err);
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                console.log("err1 :", err);
                return res.status(500).json(err);
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
}) */

router.get('/allCounts', (req, res, next) => {
    try {
        // let category = req.body;
        var ItemCount;
        var userCount;
        var barcodeCount;
        var query1 = "select count (ITEM_NO) as ItemCount from item";
        let err
        connection.query(query1, (err, results) => {
            if (!err) {
                ItemCount = results[0].ItemCount
            }
            else {
                console.log("err1 :", err);
                err = err
                // return res.status(500).json(err);
            }
        })
        var query2 = "select count(oid) as userCount from user";
        connection.query(query2, (err, results) => {
            if (!err) {
                userCount = results[0].userCount;
            }
            else {
                console.log("Err 2 :", err);
                err = err
                // return res.status(500).json(err);
            }
        })
        var query3 = "select count(id) as barcodeCount from barcode";
        connection.query(query3, (err, results) => {
            if (!err) {
                barcodeCount = results[0].barcodeCount;
                var data = {

                    "ItemCount": ItemCount,
                    "userCount": userCount,
                    "barcodeCount": barcodeCount
                }
                return res.status(200).json(data);
            }
            else {
                if (err) {
                    console.log(" Err 3 :", err);
                    return res.status(500).json(err);
                }
            }
        })
        if (err) {
            return res.status(500).json(err);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

router.get('/allInspectorCount/:id', (req, res, next) => {
    try {
        let id = req.params.id;
        let mouldingQty = 0;
        let boxQty = 0;
        let inspectedQty = 0;
        let inspectorRejectedQty = 0;
        let totalRejectedQty = 0;
        let totalOkQty = 0;
        let totalSortedQty = 0;
        let finishingQty = 0;
        let pendingTask = 0;
        let inProgressTask = 0;
        let completedTasks = 0;
        let totalTasks = 0;
        var query1 = "select * from supervisor where inspectorId = " + id;
        let err
        connection.query(query1, (err, results) => {
            if (!err) {
                results.forEach(element => {
                    if (element.mouldingQty)
                        mouldingQty = mouldingQty + parseInt(element.mouldingQty)
                    if (element.boxQty)
                        boxQty = boxQty + parseInt(element.boxQty)
                    if (element.inspectedQty)
                        inspectedQty = inspectedQty + parseInt(element.inspectedQty)
                    if (element.inspectorRejectedQty)
                        inspectorRejectedQty = inspectorRejectedQty + parseInt(element.inspectorRejectedQty)
                    if (element.totalRejectedQty)
                        totalRejectedQty = totalRejectedQty + parseInt(element.totalRejectedQty)
                    if (element.totalOkQty)
                        totalOkQty = totalOkQty + parseInt(element.totalOkQty)
                    if (element.totalSortedQty)
                        totalSortedQty = totalSortedQty + parseInt(element.totalSortedQty)
                    if (element.finishingQty)
                        finishingQty = finishingQty + parseInt(element.finishingQty)
                    if (!element.inspectorStartDate)
                        pendingTask++
                    if (element.inspectorStartDate && !element.inspectorEndDate)
                        inProgressTask++
                    if (element.inspectorStartDate && element.inspectorEndDate)
                        completedTasks++

                        totalTasks++
                });
                var data = {
                    mouldingQty: mouldingQty,
                    boxQty: boxQty,
                    inspectedQty: inspectedQty,
                    inspectorRejectedQty: inspectorRejectedQty,
                    totalRejectedQty: totalRejectedQty,
                    totalOkQty: totalOkQty,
                    totalSortedQty: totalSortedQty,
                    finishingQty: finishingQty,
                    pendingTask: pendingTask,
                    inProgressTask: inProgressTask,
                    completedTasks: completedTasks,
                    totalTasks : totalTasks
                }
                return res.status(200).json(data);
                // ItemCount = results[0].ItemCount
            }
            else {
                console.log("err1 :", err);
                err = err
                // return res.status(500).json(err);
            }
        })

        if (err) {
            return res.status(500).json(err);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

router.get('/allRejectorCount/:id', (req, res, next) => {
    try {
        let id = req.params.id;
        let mouldingQty = 0;
        let boxQty = 0;
        let inspectedQty = 0;
        let inspectorRejectedQty = 0;
        let totalRejectedQty = 0;
        let totalOkQty = 0;
        let totalSortedQty = 0;
        let finishingQty = 0;
        let pendingTask = 0;
        let inProgressTask = 0;
        let completedTasks = 0;
        let totalTasks = 0;
        var query1 = "select * from supervisor where rejectorId = " + id;
        let err
        connection.query(query1, (err, results) => {
            if (!err) {
                results.forEach(element => {
                    if (element.mouldingQty)
                        mouldingQty = mouldingQty + parseInt(element.mouldingQty)
                    if (element.boxQty)
                        boxQty = boxQty + parseInt(element.boxQty)
                    if (element.inspectedQty)
                        inspectedQty = inspectedQty + parseInt(element.inspectedQty)
                    if (element.inspectorRejectedQty)
                        inspectorRejectedQty = inspectorRejectedQty + parseInt(element.inspectorRejectedQty)
                    if (element.totalRejectedQty)
                        totalRejectedQty = totalRejectedQty + parseInt(element.totalRejectedQty)
                    if (element.totalOkQty)
                        totalOkQty = totalOkQty + parseInt(element.totalOkQty)
                    if (element.totalSortedQty)
                        totalSortedQty = totalSortedQty + parseInt(element.totalSortedQty)
                    if (element.finishingQty)
                        finishingQty = finishingQty + parseInt(element.finishingQty)
                    if (!element.RejectorStartTime)
                        pendingTask++
                    if (element.RejectorStartTime && !element.RejectorEndTime)
                        inProgressTask++
                    if (element.RejectorStartTime && element.RejectorEndTime)
                        completedTasks++

                        totalTasks++

                });
                var data = {
                    mouldingQty: mouldingQty,
                    boxQty: boxQty,
                    inspectedQty: inspectedQty,
                    inspectorRejectedQty: inspectorRejectedQty,
                    totalRejectedQty: totalRejectedQty,
                    totalOkQty: totalOkQty,
                    totalSortedQty: totalSortedQty,
                    finishingQty: finishingQty,
                    pendingTask: pendingTask,
                    inProgressTask: inProgressTask,
                    completedTasks: completedTasks,
                    totalTasks:totalTasks
                }
                return res.status(200).json(data);
                // ItemCount = results[0].ItemCount
            }
            else {
                console.log("err1 :", err);
                err = err
                // return res.status(500).json(err);
            }
        })

        if (err) {
            return res.status(500).json(err);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

module.exports = router;