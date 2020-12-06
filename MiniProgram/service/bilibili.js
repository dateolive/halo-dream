export function bilibili(type){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: 'https://imapi.datealive.top/api/bilibili.php',
      method: 'get',
      data:{
        type:type
      },
      success:resolve,
      fail:reject
    })
  })
}