// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    wx.setNavigationBarTitle({
      title:'会员信息'
    })
    this.Base.setMyData({
      userinfo2:[]
    })


  }
  onMyShow() {
    var that = this;

    // 获取用户信息
    var memberApi = new MemberApi()
    memberApi.userinfo2({
      id:this.Base.options.id
    },(userinfo2)=>{
      this.Base.setMyData({
        userinfo2
      })
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
Page(body)