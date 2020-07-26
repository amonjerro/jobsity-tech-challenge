import { read, del } from './Cookie.js'

export const post = (url,params,callback,auth)=>{
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.status === 401 && this.readyState === 4){
        callback({ok:false,error:401})
    }
    if (this.readyState === 4 && this.status === 200){
      // console.log(this.responseText)
      let data = JSON.parse(this.responseText);
      if (data.code === 420){
        del('backend-token')
      }
      callback(data)
    }
  }
  xhttp.open('POST',url,true);
  xhttp.setRequestHeader('Content-type',"application/json");
  if (auth) {
      xhttp.setRequestHeader("Authorization", read("backend-token"));
    }

  xhttp.send(JSON.stringify(params));
}


export const get = (url,params,callback,auth)=>{
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if (this.status === 401 && this.readyState === 4){
        callback({ok:false,error:401})
      }
      if (this.readyState === 4 && this.status === 200){
        let data = JSON.parse(this.responseText);
        if (data.code === 420){
          del('backend-token')
        }
        callback(data)
      }
    }
    if (params){
      let oKeys = Object.keys(params)
      url += '?'
      for (let i = 0; i < oKeys.length; i++){
        if (i > 0){
          url += '&'
        }
        url += oKeys[i]+'='+params[oKeys[i]]
      }
    }
    xhttp.open('GET',url,true);
  if (auth) {
      xhttp.setRequestHeader("Authorization", read("backend-token"));
    }

    xhttp.send(params);
}