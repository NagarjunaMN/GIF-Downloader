let form = document.querySelector('#searchform')
let pasteimg = document.querySelector('.myclass')
function SearchHandler(e) {
    e.preventDefault()
    pasteimg.innerHTML = ''
    let value = document.querySelector('#search').value
    console.log(value)

    let url=`https://api.giphy.com/v1/gifs/search?api_key=nVtFbk00fNXnP0lwMAu0Q7DQTRpJKBiX&q=${value}&limit=24&offset=0&rating=G&lang=en`
    try {
        value = value.split(' ').join('+')
        console.log("the value after giving the changing the name is",value)
    } catch (error) {
        
    }

    console.log("url hittig is",url)

    fetch(url)
    .then(function (data) { 
        data = data.json() 
        return data;
    })
    .then(resdata => {console.log(resdata)
        if(resdata.data.length != 0){
            resdata.data.forEach(ele => {
                let a = document.createElement('a');
                a.href = ele.id;
                pasteimg.appendChild(a)
                let url = ele.images.downsized_medium.url
                let img = document.createElement('img');
                img.src = url; 
                a.appendChild(img)   
            });
        }else{
            console.log("i came in the else part")
                let h3 = document.createElement('h3');
                h3.innerText = "No data available";
                h3.style.color = "red";
                pasteimg.appendChild(h3)
            
    }
    })
    .catch(err => {console.log("error",err)})
}





form.addEventListener('submit',SearchHandler)