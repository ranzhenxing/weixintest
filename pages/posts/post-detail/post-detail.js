// pages/posts/post-detail/post-detail.js
var localData=require("../../../data/posts-data.js") 
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected:false,
    isPlayingMusic:false,
    isShare:false,
    detailId:-1,
    new:{

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.detailId=options.id;
    console.log("传过来的id是" + this.data.detailId)
    var postsCollected = wx.getStorageSync("postCollected")
    for (var i = 0; i < localData.newsList.length;i++){
     var detail= localData.newsList[i];
      if (detail.postId == this.data.detailId){
        if (postsCollected){
          this.setData({ isCollected: postsCollected[this.data.detailId] })
        }else{
          var postsCollected = {};
          this.setData({ isCollected: false })
          postsCollected[this.data.detailId]=false
          wx.setStorageSync("postCollected", postsCollected)
        }
       
        this.setData({ new: detail })
     }
    }
    
    
  },
  OnCollection:function(){
    var postsCollected = wx.getStorageSync("postCollected")
    postsCollected[this.data.detailId] = !this.data.isCollected;
    wx.setStorageSync("postCollected", postsCollected)
    this.setData({ isCollected: !this.data.isCollected})
    wx.showToast({
      title: this.data.isCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  OnShare: function () {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: "用户 " + itemList[res.tapIndex],
          content: "现在无法实现分享功能，什么时候能支持呢"
        })
      }
    });
  },
  onMusicTap: function (event) {
    this.data.isPlayingMusic = app.globalData.g_isPlayingMusic;
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      // app.globalData.g_currentMusicPostId = null;
      app.globalData.g_isPlayingMusic = false;
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: this.data. new.music.url,
        title: this.data.new.music.title,
        coverImgUrl: this.data.new.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_currentMusicPostId = this.data.detailId;
      app.globalData.g_isPlayingMusic = true;
    }
  }
})