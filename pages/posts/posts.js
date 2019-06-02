// pages/posts/posts.js
var localData=require("../../data/posts-data.js")

Page({

  data: {
  },
  onLoad: function(options) {
    this.setData({
      newsList: localData.newsList
    })
  },
  onPostTap:function(event){
    var postId=event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  }
})