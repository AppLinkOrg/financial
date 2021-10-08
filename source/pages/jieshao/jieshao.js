// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ContentApi } from "../../apis/content.api.js";
import { WechatApi } from "../../apis/wechat.api.js";
var WxParse = require('../../wxParse/wxParse');


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: this.Base.options.name
    })
    this.Base.setMyData({
      contentdetail:[]
    })


  }
  onMyShow() {
    var that = this;

    // 详情
    var contentApi = new ContentApi()
    contentApi.contentdetail({
      id:this.Base.options.id
    },(contentdetail)=>{
      contentdetail.content = that.Base.util.HtmlDecode(contentdetail.content);
      WxParse.wxParse('content', 'html', contentdetail.content, that, 10);

      this.Base.setMyData({contentdetail})
    })



  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
Page(body)