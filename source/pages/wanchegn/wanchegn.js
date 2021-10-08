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
    this.Base.needauth = true;
    this.Base.setMyData({
      mobile:'',password:''
    })

  }
  onMyShow() {
    var that = this;

    // 获取该用户的数据
    var memberApi = new MemberApi()
    memberApi.userinfo2({
      id:this.Base.options.id
    },(res)=>{
      if (res!=null) {
              var mobile=res.mobile
      var password=res.password
      this.Base.setMyData({
mobile,password
      })
      }


    })
  }
  denglu(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.denglu = content.denglu;

Page(body)