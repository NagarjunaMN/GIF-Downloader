const request = require('request')

module.exports.doRequest = function (body,looper) {
    return new Promise((resolve,reject) =>{
        let value = body.search

        try {
            value = value.split(' ').join('+')
            // console.log("the value after giving the changing the name is",value)
            // console.log(looper)
        } catch (error) {
            
        }
        let url=`https://api.giphy.com/v1/gifs/search?api_key=nVtFbk00fNXnP0lwMAu0Q7DQTRpJKBiX&q=${value}&limit=28&offset=${looper}&lang=en`
        console.log("complete url",url)
    
        request(url,function (err,response,body) {
            // console.log(body)
            bd = JSON.parse(body)
            // console.log(bd.data)
            if(bd.data.length != 0){
                resolve(bd)
            }else{
                reject(`No data available on ${value}`)
            }

        })
    })
    
}