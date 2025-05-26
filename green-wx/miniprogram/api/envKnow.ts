import request from '../utils/request';
const baseUrl = "/envKnow/"
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
    data: "id=" + data
  })
}
export function update(data: object) {
  return request({
    url: baseUrl + 'update',
    method: 'post',
    data: data
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
export function selectAll() {
  return request({
    url: baseUrl + 'selectAll',
    method: 'get',
  })
}

export function selectOne(data: string) {
  return request({
    url: baseUrl + 'selectOne',
    method: 'get',
    data: {
      title: data
    }
  })
}


