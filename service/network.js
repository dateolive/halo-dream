import {
  BASEURL
}from '../service/config.js'
export default function(options){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: BASEURL +'/wp-json/wp/v2/'+ options.url,
      method:options.method || 'get',
      data:options.data || {},
      success:resolve,
      fail:reject
    })
  })
}