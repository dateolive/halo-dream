// components/comments/comments.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    allcomments:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickcomments(){
      console.log(this.data.allcomments)
    }
  },
  options: {
    addGlobalClass: true
  }
})
