import request from '../service/network.js'
export function tagsData(){
  return  request({
    url:'tags?per_page=20'
  })
}