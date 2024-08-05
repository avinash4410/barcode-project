const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
let auth = require('../services/authentication');
let checkRole = require('../services/checkRole');

router.post('/signup', (req, res) => {
    let user = req.body;
    query = "select username,password,role from user where username = ?";
    connection.query(query, [user.username], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                // query = "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
                query = "insert into user(name,username,password,mobile,Address,city,dob,role,joindate) values(?,?,?,?,?,?,?,?,?);"
                connection.query(query, [user.name, user.username, user.password, user.mobile, user.Address, user.city, user.dob, user.role, user.joindate], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully Registered" })
                    }
                    else {
                        return res.status(500).json(err)
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Username Already Exist" })
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.post('/login', (req, res) => {
    const user = req.body;
    // console.log(user);
    // query = "select email,password,role,status from user where email = ?";
    query = "select oid,username,password,role from user where username = ?";
    connection.query(query, [user.username], (err, results) => {
        if (!err) {
            // console.log(results);
            if (results.length <= 0) {
                return res.status(401).json({ message: "Incorrect Username", isUsernameError: true })
            }
            else if (results[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect Password", isPasswordError: true })
            }
            // else if (results[0].status === 'false') {
            //     return res.status(401).json({ message: "Wait foe admin approval" })
            // }
            else if (results[0].password == user.password) {
                // const response = { email: results[0].email, role: results[0].role }
                // const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                // res.status(200).json({ token: accessToken });
                res.status(200).json({
                    message: "Login Successfully",
                    user: results[0],
                });
            }
            else {
                return res.status(400).json({ message: "Something went wrong. please try again later" })
            }
        }
        else {
            res.status(500).json(err)
        }
    })
})

//Get Al Users
router.get('/get', (req, res) => {
    console.log(req.query);
    const limit = +req.query.limit || 10;
    const offset = +req.query.offset;
    // let query = "select id,name,email,contactNumber,status from user where role ='user'";
    let query = "select * from user LIMIT ? offset ?";
    let query2 = "select count(oid) as totalusers from user";

    connection.query(query2, (err, results2) => {
        if (!err) {
            // console.log("results2",results2);
            connection.query(query, [limit, offset], (err, results) => {
                if (!err) {
                    let myResult = {
                        result: results,
                        count: results2
                    }
                    return res.status(200).json(myResult);
                }
                else {
                    console.log(err);
                    return res.status(500).json(err)
                }
            })
            // return res.status(200).json(results);
        }
        else {
            console.log("err :  ", err);
            return res.status(500).json(err)
        }
    })

})

// Gel all users
router.get('/', (req, res) => {
    let query = "select * from user";

    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            console.log("err : ", err);
            return res.status(500).json(err)
        }
    })

})

// Get rolewise Users
router.get('/getUserByRole', (req, res) => {
    // console.log(req.query);
    // const limit = +req.query.limit;
    // const offset = +req.query.offset;
    let role = req.query.role
    // let query = "select id,name,email,contactNumber,status from user where role ='user'";
    // let query = "select * from user where role = ?";
    // let query = "select * from user where role=? LIMIT ? offset ?";
    // let query2 = "select count(oid) as totalusers from user where role=?";
    let query3 = "select * from user where role=?";
    // if (limit) {
    //     console.log("Hii");
    //     connection.query(query2, [role], (err, results2) => {
    //         if (!err) {
    //             // console.log("results2",results2);
    //             connection.query(query, [role, limit, offset], (err, results) => {
    //                 if (!err) {
    //                     let myResult = {
    //                         result: results,
    //                         count: results2
    //                     }
    //                     return res.status(200).json(myResult);
    //                 }
    //                 else {
    //                     console.log(err);
    //                     return res.status(500).json(err)
    //                 }
    //             })
    //             // return res.status(200).json(results);
    //         }
    //         else {
    //             console.log("err :  ", err);
    //             return res.status(500).json(err)
    //         }
    //     })
    // }
    // else {
        connection.query(query3, [role], (err, results) => {
            if (!err) {
                return res.status(200).json(results);
            }
            else {
                console.log(err);
                return res.status(500).json(err)
            }
        })
    // }

})

router.put('/:id', (req, res) => {
    let oid = req.params.id
    let user = req.body;
    let query = "update user set name=?,username=?,password=?,mobile=?,Address=?,city=?,dob=?,role=?,joindate=? where oid='" + oid + "'";
    connection.query(query, [user.name, user.username, user.password, user.mobile, user.Address, user.city, new Date(user.dob), user.role, new Date(user.joindate)], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "User id does not exist" });
            }
            return res.status(200).json({ message: "User updated successfully" })
        }
        else {
            return res.status(500).json(err)
        }
    })
})

router.post('/checkToken', auth.authenticateToken, (req, res) => {
    return res.status(200).json({ message: "true" })
})

router.post('/changePassword', auth.authenticateToken, (req, res) => {
    const user = req.body;
    const username = res.locals.username;
    var query = 'select * from user where email=? and password=?';
    connection.query(query, [username, user.oldPassword], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(400).json({ message: "Incorrect Old password" });
            }
            else if (results[0].password == user.oldPassword) {
                query = "update user set password=? where username = ?";
                connection.query(query, [user.newPassword, username], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Password updated successfully." })
                    }
                    else {
                        return res.status(500).json(err)
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Something went wrong. Please try again later " });
            }
        }
        else return res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    //batchMadeBy,batchcode,batchweighed,custname,itemDesc,mcNo,modulingdate,mouldername,mouldingQty,oid,oname,shift
    query = "delete from user where oid='" + id + "'";
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
router.get('/:id', (req, res) => {
    let id = req.params.id;
    //batchMadeBy,batchcode,batchweighed,custname,itemDesc,mcNo,modulingdate,mouldername,mouldingQty,oid,oname,shift
    query = "select * from user where oid='" + id + "'";
    connection.query(query, (err, results) => {
        if (!err) {
            console.log(results)
            return res.status(200).json(results[0])
        }
        else {
            console.log("Error", err)
            return res.status(500).json(err)
        }
    })
})

module.exports = router;
