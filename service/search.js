import request from '../service/network.js'
export function searchDatas(keyword){
  return  request({
    url:'posts?search='+encodeURIComponent(keyword)
  })
}
