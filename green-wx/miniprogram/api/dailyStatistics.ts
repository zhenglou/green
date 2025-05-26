import request from '../utils/request';
const baseUrl = "/statistics/"
export function selectAll() {
  return request({
    url: baseUrl + 'last7days',
    method: 'get',
  })
}

export function totals() {
  return request({
    url: baseUrl + 'totals',
    method: 'get',
  })
}
export function increment(data:Object) {
  return request({
    url: baseUrl + 'increment',
    method: 'post',
    data:data
  })
}
