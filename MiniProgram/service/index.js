import request from '../service/network.js'
import { BASEURL } from './config.js'
export function bannersData(){
  return  request({
    url:'posts?filter[orderby]=rand'
  })
}
export function articleDatas(page){
  return  request({
    url:'posts',
    data:{
      page:page
    }
  })
}
export function ratingarticles(){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: BASEURL+'/wp-json/watch-life-net/v1/post/pageviewsthisyear',
      method: 'get',
      success:resolve,
      fail:reject
    })
  })
}