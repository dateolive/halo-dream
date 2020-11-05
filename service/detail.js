import request from '../service/network.js'
import { BASEURL } from './config.js'
export function getpostData(id){
  return  request({
    url:'posts/'+id,
  })
}
export function getComments(id,limit,page){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: BASEURL+'/wp-json/watch-life-net/v1/comment/getcomments',
      method: 'get',
      data:{
        postid:id,
        limit:limit,
        page:page
      },
      success:resolve,
      fail:reject
    })
  })
}
export function sendComment(datas){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: BASEURL+'/wp-json/watch-life-net/v1/comment/add',
      method: 'post',
      data:datas,
      success:resolve,
      fail:reject
    })
  })
}
export function PostLove(datas){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: BASEURL+'/wp-json/watch-life-net/v1/post/like',
      method: 'post',
      data:datas,
      success:resolve,
      fail:reject
    })
  })
}
export function PostMore(id,tags){
  return  request({
    url:'posts?per_page=5&&page=1',
    data:{
      exclude:id,
      tags
    }
  })
}