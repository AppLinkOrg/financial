// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ContentApi } from "../../apis/content.api.js";
import { MemberApi } from "../../apis/member.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.needauth = true;
    wx.hideHomeButton({})
    wx.setNavigationBarTitle({
      title: '登录'
    })
    this.Base.setMyData({
      contentlist:[], showModal:false,password:'',shoujihao:'',leix:'password',xzshow:true
    })


  }
  onMyShow() {
    var that = this;

    // 列表
    var contentApi = new ContentApi()
    contentApi.contentlist({},(contentlist)=>{
      this.Base.setMyData({
        contentlist
      })
    })



  }
  jiehsao(e){
    var index = e.currentTarget.id
    var contentlist = this.Base.getMyData().contentlist

    var name = contentlist[index].name
    var id =  contentlist[index].id

    wx.navigateTo({
      url: '/pages/jieshao/jieshao?id='+id+'&name='+name,
    })

  }
  yonghu(){
    var mobile = this.Base.getMyData().mobile
    if (mobile!='') {
      var memberApi = new MemberApi()
      memberApi.pandaun({
        mobile
      },(res)=>{
        if (res.code==0) {
          if (res.return==0) {
            wx.navigateTo({
      url: '/pages/register/register',
    })
        }
        if (res.return==1) {
          wx.navigateTo({
    url: '/pages/wansahn/wansahn?id='+res.result,
  })
      }
//       if (res.return==2) {
//         wx.navigateTo({
//   url: '/pages/wanchegn/wanchegn?id='+res.result,
// })
//     }
    if (res.return==3) {
      wx.navigateTo({
url: '/pages/shenhe/shenhe?id='+res.result,
})
  }
    if (res.return==2) {
      wx.navigateTo({
url: '/pages/wanchegn/wanchegn?id='+res.result,
})
  }
  if (res.return==4) {
    wx.showToast({
      title: '审核未通过',
      icon:'none'
    })

//     wx.navigateTo({
// url: '/pages/wanchegn/wanchegn?id='+res.result,
// })
}
        }else{
          wx.showToast({
            title: '数据错了',
            icon:'none'
          })
        }




      })

      
    }

  
  
  }
  getUserInfo2(e) {

    var that = this;
    var memberapi = new MemberApi();
  
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: userres => {
       
        var openid = AppBase.UserInfo.openid;
        var session_key = AppBase.UserInfo.session_key;
        AppBase.UserInfo = userres.userInfo;
        AppBase.UserInfo.openid = openid;
        AppBase.UserInfo.session_key = session_key;
        console.log("loginres4", userres);

        this.yonghu();

      },
      fail: userloginres => {
        console.log("auth fail");
        console.log(userloginres);
        console.log('denglu',444)
  
        
      }
    })
  }
  jishu(){
    this.Base.setMyData({showModal:true})

  }
  guanbi(){
    this.Base.setMyData({showModal:false})
  }
  denglu(){
    var shoujihao = this.Base.getMyData().shoujihao
    var password = this.Base.getMyData().password

    var memberApi = new MemberApi()
    memberApi.register2({
      mobile:shoujihao,password
    },(res)=>{
      if (res.code==0) {
        wx.showToast({
          title: '成功',
          icon:'none'
        }) 
        wx.setStorageSync('token', res.return);
        wx.redirectTo({
          url: '/pages/home/home',
        })
        // wx.switchTab({
        //   url: '../home/home'
        // })
      
        
      }else{
        wx.showToast({
          title: res.return,
          icon:'none'
        })
      }

    })



  }
  xuanze(){
    var xzshow = this.Base.getMyData().xzshow
    if (xzshow==true) {
      this.Base.setMyData({xzshow:false,leix:'number'})
    }else{
      this.Base.setMyData({xzshow:true,leix:'password'})
    }

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.xuanze = content.xuanze;
body.denglu = content.denglu;
body.guanbi = content.guanbi;
body.jishu = content.jishu;
body.getUserInfo2 = content.getUserInfo2;
body.yonghu = content.yonghu;
body.jiehsao = content.jiehsao;

Page(body)