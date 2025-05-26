import request from "../utils/axios"
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

