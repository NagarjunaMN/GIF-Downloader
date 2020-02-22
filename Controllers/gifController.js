const fs = require('fs')
const path = require('path')
const gifSerivice = require('../services/gifService')
const request = require('request')
// const fileDownload = require('download-file')


module.exports.home = function(req,res){
    res.render('gifFind',{
        layout:"displayLayout"
    })    
}

module.exports.getGif = function (req,res) {
    let body = req.body;
    console.log(body.search);
    if(req.session.isLoggedIn){
        req.session.searchinput = body
        gifSerivice.doRequest(body,0)
            .then(data => {
                // console.log("the respolved data is ---->",data.data)
                res.render('gifFind',{
                    layout:"displayLayout",
                    gif:data.data,
                    err:false,
                    user:true,
                    userName:req.session.user,
                    loginned:true,
                    btn:true
                })
            })
            .catch(err => {
                console.log(err)
                res.render('gifFind',{
                    layout:"displayLayout",
                    err:true,
                    user:true,
                    userName:req.session.user,
                    loginned:true,
                    data:err
                })
            })
        }else{
            res.redirect('/gif/login')
        }
}

module.exports.getOneGif = function (req,res) {
    let alias = req.params.alias
    let name = req.params.name
    if(req.session.isLoggedIn){
        console.log("im coming to the individual gif page",alias)
        res.render("displayImage",{
            layout:"displayLayout",
            data:alias,
            loginned:true,
            name:name
        })
    }else{
        req.redirect('/gif/login')
    }
}

let counter = 0;
let looper = 28;
module.exports.nextGif = function (req,res) {
    let body = req.session.searchinput
    let count = (++counter)*looper
    if(req.session.isLoggedIn){
            gifSerivice.doRequest(body,count)    
            .then(data => {
                // console.log("the respolved data is ---->",data)
                res.render('gifFind',{
                    layout:"displayLayout",
                    gif:data.data,
                    err:false,
                    user:true,
                    userName:req.session.user,
                    loginned:true,
                    btn:true
                })
            })
            .catch(err => {
                console.log(err)
                res.render('gifFind',{
                    layout:"displayLayout",
                    err:true,
                    user:true,
                    userName:req.session.user,
                    loginned:true,
                    data:err
                })
            })
        }else{
            req.redirect('/gif/login')
        }
}

module.exports.download = function (req,res) {
    let alias = req.params.alias;
    let name = req.params.name;
    let url = `https://media3.giphy.com/media/${alias}/giphy.gif?&rid=giphy-downsized-small.mp4`
    pathfl = path.join(__dirname,'../static/images')
    let file = fs.createWriteStream(pathfl+'/file.gif');
    
    let str = request(url).pipe(file)
    pathfile = pathfl+'/file.gif'
    setTimeout(function () {
        res.download(pathfile,name+'.gif',function (err) {
            if(err){
                console.log("error",err)
            }else{
                file.end()
                // res.redirect(`/gif/image/${alias}/${name}`)
            }
        })    
        
    },13000)
 
    
}