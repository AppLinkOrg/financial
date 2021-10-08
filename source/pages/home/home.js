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
      title:'会员列表'
    })
    this.Base.setMyData({
      maxlime:7,list:[],neirong:''
    })


  }
  onMyShow() {
    var that = this;
    this.list()
  }
  list(){
    var maxlime = this.Base.getMyData().maxlime
var str = 0+','+maxlime

    var memberApi = new MemberApi()
    memberApi.list({
      limit:str,
      neirong:''
    },(list)=>{
      this.Base.setMyData({list})
    })

  }
  bottomscroll(e){
    var maxlime = this.Base.getMyData().maxlime
    maxlime=maxlime+7
    this.Base.setMyData({maxlime})
    this.list()

  }
  xianq(e){
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/huiyuaninfo/huiyuaninfo?id='+id,
    })

  }
  neirong(e){
    var neirong = e.detail.value
    var memberApi = new MemberApi()

    if(neirong==''){
      this.list()
    }else{
      memberApi.list({
        neirong
      },(list)=>{
        this.Base.setMyData({list,neirong})
      })

    }

    


    console.log(e.detail.value,'log')

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.neirong = content.neirong;
body.xianq = content.xianq;
body.list = content.list;
body.bottomscroll = content.bottomscroll;
Page(body)