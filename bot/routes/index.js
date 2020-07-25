const express = require("express");
const route = express();
const { stockQuery } = require('../controller/StockQuerier')

route.post('/stock_lookup', (req, res)=>{
    stockQuery(req,res)
})

module.exports = route