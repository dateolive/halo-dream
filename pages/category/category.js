// pages/category/category.js
import { 
  categoryData
 } from '../../service/category.js'
Page({

  data: {
    categorys:[],
    id:0,
    cnt:20,  //分类显示最多数目
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cnt=this.data.cnt
    this._categoryData(cnt)
  },
 _categoryData(cnt){
 categoryData(cnt).then(res=>{
  const categorys=res.data
  const per_page=res.data.count
  this.setData({
    categorys,
    per_page
  })
 }).catch(err=>{
   console.log(err)
 })
 },
 clickcategory(e){
   const index=e.currentTarget.dataset.index
   const id=this.data.categorys[index].id
   const count=this.data.categorys[index].count
   const name=this.data.categorys[index].name
   wx.navigateTo({
     url: '/pages/list/list?id='+id+'&count='+count+'&name='+name,
   })
 }

})