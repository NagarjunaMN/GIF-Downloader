const userModel = require('./userModel');

module.exports.create = function (body) {
    return new Promise((resolve,reject) => {
        let user = new userModel(body)
        user.save()
            .then(data =>{ 
                resolve(data)
            })
            .catch(err => reject("Email/Mobile number already exists"))
    })
}

module.exports.search = function (body) {
    return new Promise((resolve,reject) => {
        let email = body.email
        userModel.findOne({email:email})
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}