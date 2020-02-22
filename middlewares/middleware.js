module.exports.logger = function (req,res,next) {
    console.log(req.url,req.method)
    next()
}

module.exports.notFound = function (req,res,next) {
    res.status(404).send('Page Not Found')
}

module.exports.errHandler = function (err,req,res,next) {
    console.log("imn error middleware -->",err)
    res.status(500).send("something went wrong")
}