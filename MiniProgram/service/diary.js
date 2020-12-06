export function diaries(){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: 'https://imapi.datealive.top/api/diary.php',
      method: 'get',
      success:resolve,
      fail:reject
    })
  })
}