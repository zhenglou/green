import request from '../utils/request';
const baseUrl = "/recOrd/"
export function insert(data: object) {
  return request({
    url: baseUrl + 'insert',
    method: 'post',
    data: data
  })
}
export function deleteOne(data: number) {
  console.log(data);
  return request({
    url: baseUrl + 'delete?id=' + data,
    method: 'post'
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
    data: {
      page: data
    }
  })
}

export function selectOne(data: number) {
  return request({
    url: baseUrl + 'selectById',
    method: 'get',
    data: {
      id: data
    }
  })
}
export function selectByUserOne(data: number) {
  return request({
    url: baseUrl + 'selectByUserId',
    method: 'get',
    data: {
      id: data
    }
  })
}
export function selectByIdAndStatus(data:object) {
  return request({
    url: baseUrl + 'selectByIdAndStatus',
    method: 'get',
    data: data
  })
}



