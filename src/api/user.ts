import request from "../utils/axios"
export function userLogin(userInfo:object) {
  return request({
    url: '/login',
    method: 'post',
    data:{...userInfo}
  })
}
export function getTokenAvailable(token:String) {
  return request({
    url: '/getTokenAvailable',
    method: 'post',
    data:token
  })
}
export function getUserInfoByToken(token:String) {
  return request({
    url: '/getUserInfoByToken',
    method: 'get',
    params:{
      token:token
    }
  })
}
export function getAllUserInfo() {
  return request({
    url: '/getAllUserInfo',
    method: 'get',
  })
}
export function increaseUserByUser(data:object) {
  return request({
    url: '/increaseUserByUser',
    method: 'post',
    data:data
  })
}

export function update(data:object) {
  return request({
    url: '/update',
    method: 'post',
    data:data
  })
}

export function deleteOne(data:number){
  return request({
    url: '/delete',
    method: 'post',
    data:"id="+ data
  })
}
export function selectOne(data:number) {
  return request({
    url: '/selectOne',
    method: 'get',
    params:{
      id:data
    }
  })
}
export function selectByPage(data:number) {
  return request({
    url: '/selectByPage',
    method: 'get',
    params:{
      page:data
    }
  })
}
export function selectByName(data:string) {
  return request({
    url: '/selectByName',
    method: 'get',
    params:{
      name:data
    }
  })
}




