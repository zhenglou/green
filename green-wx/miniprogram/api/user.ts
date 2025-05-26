import request from '../utils/request';
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
    data:{
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
export function getAllUserInfoOrderByExperience() {
  return request({
    url: '/getAllUserInfoOrderByExperience',
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
export function update2(data:object) {
  return request({
    url: '/update2',
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
    data:{
      id:data
    }
  })
}
export function selectByPage(data:number) {
  return request({
    url: '/selectByPage',
    method: 'get',
    data:{
      page:data
    }
  })
}
export function selectByName(data:string) {
  return request({
    url: '/selectByName',
    method: 'get',
    data:{
      name:data
    }
  })
}




