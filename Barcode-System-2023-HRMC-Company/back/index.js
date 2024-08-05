const express = require('express')
let cors = require('cors')
const connection = require('./connection')
const userRoute = require('./routes/user')
const ItemRoute = require('./routes/item')
// const category = require('./routes/category')
// const opr_item = require('./routes/operator_item')
// const taskowrk = require('./routes/taskwork')
const supervisor = require('./routes/supervisor')
const custmer = require('./routes/custmer')
const dashboardRoute = require('./routes/dashboard')
const report = require('./routes/report')
const batchCode = require('./routes/batchCode')
const app = express();
 
app.use(cors())
// app.use(express.urlencoded({extends: true}))
app.use(express.json())
app.use('/user',userRoute);
app.use('/item',ItemRoute);
// app.use('/category',category);
// app.use('/opr_item',opr_item);
// app.use('/taskwork',taskowrk);
app.use('/supervisor',supervisor);
app.use('/customer',custmer);
app.use('/dashboard',dashboardRoute);
app.use('/report',report);
app.use('/batchCode',batchCode);

module.exports = app;