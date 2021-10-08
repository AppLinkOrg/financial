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
    wx.setNavigationBarTitle({
      title: '注册',
    })
    this.Base.setMyData({
      logoimg:'',shouji:'',name:'',email:'',password:''
    })


  }
  onMyShow() {
    var that = this;
  }
  tupian(){
    var that = this;
    this.Base.uploadImage("member2", (ret) => {
      var logoimg = ret;
      that.Base.setMyData({
        logoimg
      });
      console.log(logoimg,999)
    }, 6, undefined);
  }
  nex(){
    // 填写用户信息
    var name = this.Base.getMyData().name
    var email = this.Base.getMyData().email
    var shouji = this.Base.getMyData().shouji
    var password = this.Base.getMyData().password
    var logoimg = this.Base.getMyData().logoimg
    if(logoimg==''){
      wx.showToast({
        title: '请上传头像',
        icon:'none'
      })
      return
    }
    
    if (name=='') {
      wx.showToast({
        title: '请输入您的真实姓名',
        icon:'none'
      })
      return
    }
    if(shouji==''){
      wx.showToast({
        title: '请输入您的手机号',
        icon:'none'
      })
      return
    }
    if(password==''){
      wx.showToast({
        title: '请输入您的密码',
        icon:'none'
      })
      return
    }
    if(email==''){
      wx.showToast({
        title: '请输入您的邮箱',
        icon:'none'
      })
      return
    }

    if (shouji.length!=11 || shouji[0]!=1) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon:'none'
      })
      return
    }
    var memberapi = new MemberApi();
    memberapi.addinfo({
      email,shouji,password,name,type:1,logoimg
    },(res)=>{
      if (res.code==0) {
        wx.navigateTo({
          url: '/pages/wansahn/wansahn?id='+res.return,
        })
      }

    })


    
   
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.tupian = content.tupian;
body.nex = content.nex;

Page(body)