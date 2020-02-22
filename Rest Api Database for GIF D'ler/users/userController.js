const userService = require('./userService')

module.exports.insertUser = function (req,res) {
    let body = req.body;
    console.log("i came herr ti controller",body)
    userService.create(body)
        .then(data => {
            res.status(201).json({'msg':'User Created successfully',data:data})
        })
        .catch(err => res.json({"error":err}))
}

module.exports.findUser = function (req,res) {
    let body = req.body;
    userService.search(body)
        .then(data => {
            if(body.password == data.password){
                console.log(data)
                res.json({'msg':'User Fetched successfully',data:data})
            }else{
                res.json({'error':'Email/Password entered is wrong'})
            }
        })
        .catch(err => res.json({"error":"Email/Password entered is wrong"}))
}