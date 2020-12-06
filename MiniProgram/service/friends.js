export function friendlinks(){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: 'https://imapi.datealive.top/api/apifriends.php',
      method: 'get',
      success:resolve,
      fail:reject
    })
  })
}