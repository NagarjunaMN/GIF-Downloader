const request = require('request')

module.exports.login = function (req,res) {
    res.render('LoginPage')
}

module.exports.doLogin = function (req,res) {
    let bodyData = req.body
    let head = {
        method:"POST",
        uri:"http://localhost:3002/api/users/signin",
        body:bodyData,
        json:true
    }
    request(head,function (err,response,body) {
        if(body.error){
            res.render('LoginPage',{
                err:true,
                error:body.error
            })
        }else{
            req.session.user = body.data;
            req.session.isLoggedIn = true
            console.log("session user...>",req.session.user)
            res.render('gifFind',{
                layout:"displayLayout",
                user:true,
                userName:req.session.user,
                loginned:true
            })
        }
        
        
    })

}

module.exports.signup = function (req,res) {
    res.render('SignupPage')
}

module.exports.doSignup = function(req,res){
    let body = req.body;
    console.log(body)
    let head = {
        method:"POST",
        uri:"http://localhost:3002/api/users/signup",
        body:body,
        json:true
    }
    request(head,function (err,response,body) {
        if(body.error){
            res.render('SignupPage',{
                err:true,
                error:body.error
            })
        }else{
            res.redirect('/gif/login')
        }
        console.log("error",err)
        console.log("body -->",body)
    })
    
}

module.exports.logout = function (req,res) {
    req.session.searchinput = '';
    req.session.isLoggedIn = false;
    req.session.user = ''
    res.redirect('/gif/login')
}