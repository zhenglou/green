// 将 token 存储到系统缓存日志的api
export function setStorage(key:string, value:string) {
  // console.log(key,value);
  if( typeof(value)==="object" && value != null){
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value);
}

// 获取缓存日志
export function getStorage(key:string) {
  let data = window.localStorage.getItem(key);
  try{
    if(data == null) return null;
    return JSON.parse(data);
  }
  catch(err){
    return data;
  }
}


export function removeStorge(key:string){
  window.localStorage.removeItem(key);
}


export function clearStorge(){
  window.localStorage.clear();
}