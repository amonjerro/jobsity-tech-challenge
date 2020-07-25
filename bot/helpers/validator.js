const validateStockRequest = (req) =>{
    const { stock_code } = req.body
    if (!stock_code){
        return false
    }
    return true
}

module.exports = {
    validateStockRequest
}