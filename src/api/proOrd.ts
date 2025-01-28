import request from "../utils/axios"
const baseUrl = "/proOrd/"
export function insert(data: object) {
  return request({
    url: baseUrl + 'insert',
    method: 'post',
    data: data
  })
}
export function deleteOne(data: number) {
  return request({
    url: baseUrl + 'delete',
    method: 'post',
    data: "id="+ data
  })
}
export function update(data: object) {
  return request({
    url: baseUrl + 'update',
    method: 'post',
    data: data
  })
}

export function selectAll() {
  return request({
    url: baseUrl + 'selectAll',
    method: 'get',
  })
}
export function selectByPage(data: number) {
  return request({
    url: baseUrl + 'selectByPage',
    method: 'get',
    params: {
      page: data
    }
  })
}
export function selectOne(data: number) {
  return request({
    url: baseUrl + 'selectById',
    method: 'get',
    params: {
      id: data
    }
  })
}

export function selectByUserOne(data: number) {
  return request({
    url: baseUrl + 'selectByUserId',
    method: 'get',
    params: {
      id: data
    }
  })
}






