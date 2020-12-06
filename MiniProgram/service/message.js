export function showmessage(index){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: 'https://imapi.datealive.top/liuyan/api/showmessage.php',
      method: 'get',
      data:{
        index:index
      },
      success:resolve,
      fail:reject
    })
  })
}
export function sendmessage(data){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: 'https://imapi.datealive.top/liuyan/api/sendmessage.php',
      method: 'get',
      data:{
        data:data,
        token:'datealive'
      },
      success:resolve,
      fail:reject
    })
  })
}