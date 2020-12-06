import request from '../service/network.js'
export function categoryData(cnt){
  return  request({
    url:'categories?per_page='+cnt
  })
}
export function categoryatticles(per_page,id){
  return  request({
    url:'posts',
    data:{
      per_page:per_page,
      categories:id
    }
  })
}