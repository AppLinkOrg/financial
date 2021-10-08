// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MaritalstatusApi } from "../../apis/maritalstatus.api.js";
import { CitiesApi } from "../../apis/cities.api.js";
import { ProvincesApi } from "../../apis/provinces.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { AreasApi } from "../../apis/areas.api.js";

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
      title: '注册'
    })
    this.Base.setMyData({
      xinbie:[
        {id:0,name:'未知'},
        {id:1,name:'男'},
        {id:2,name:'女'}],
        xueli:['专科','本科','硕士研究生','博士研究生'],
        hanye:['私募','PE'],
        xinbieid:'',birth:'',graduationyears:'',marid:'',graduationschool:'',Industry:'',company:'',post:'',need:'',provide:'',interest:'',studentnumber:'',card:'',address:''
        ,enddata:'',xinbiename:'',marlist:[],maritalstatus:'',education:'',citieslist:[],bqshow:false,baiqian:'',bqlise:[],show:'A',areaslist:[]
        ,lianxi:'',
        city:'',area:'',wechat:'',
        multiArray: [],
        multiIndex: [0, 0],
        provinceslist:[],
citieslist:[],
provinceid:'',


    })
   

  }
  onMyShow() {
    var that = this;

    // 出生日期
    var data = new Date();
    var y = data.getFullYear();
    var yu=data.getMonth()+1;
    var ri=data.getDate();
    var enddata=y+"-"+yu+"-"+ri
    this.Base.setMyData({enddata})

    // 婚姻状况
    var maritalstatusApi = new MaritalstatusApi()
    maritalstatusApi.list({},(marlist)=>{
      this.Base.setMyData({marlist})
    })

    // 城市列表
    // var citiesApi = new CitiesApi()
    // citiesApi.citieslist({},(citieslist)=>{
    //   this.Base.setMyData({citieslist})
    // })

    // 双列表
    var provincesApi = new ProvincesApi()
    provincesApi.provinceslist({},(provinceslist)=>{
      this.Base.setMyData({provinceslist})
      var multiArray = this.Base.getMyData().multiArray
      for(let item of provinceslist){
        item.name=item.province
       }

      multiArray[0]=provinceslist
      // multiArray.push(provinceslist)
         // 城市列表
         var provinceid=provinceslist[0]['provinceid']
     var citiesApi = new CitiesApi()
     citiesApi.citieslist({
      provinceid
     },(citieslist)=>{
      for(let item of citieslist){
        item.name=item.city
       }
       
      multiArray[1]=citieslist
      // multiArray.push(citieslist)
       this.Base.setMyData({citieslist,multiArray,provinceid})
       console.log(multiArray,'multiArray')
     })


    })


   


 var mobile= AppBase.usmobile
 this.Base.setMyData({mobile})
console.log(mobile,'mobileddd')

  }
  changexb(e){
    // 选择性别
    var xinbie = this.Base.getMyData().xinbie
    var index=e.detail.value
    var xinbieid=xinbie[index].id
    var xinbiename=xinbie[index].name
    this.Base.setMyData({xinbiename,xinbieid})
    console.log(e.detail.value,'changexbhhh')

  }
  changecs(e){
      // 选择出生
      this.Base.setMyData({birth:e.detail.value})
      console.log(e,'changexbhhh')
  }
  nex(){
    var mobile = this.Base.getMyData().mobile
    if (mobile !=undefined) {
      this.Base.setMyData({wechat:mobile})
    }
   
    // 提交填写的信息
    var xinbieid = this.Base.getMyData().xinbieid
    var birth = this.Base.getMyData().birth
    var marid = this.Base.getMyData().marid
    var graduationyears = this.Base.getMyData().graduationyears
    var education = this.Base.getMyData().education
    var graduationschool = this.Base.getMyData().graduationschool
    var major = this.Base.getMyData().major
    var address = this.Base.getMyData().address

    var Industry = this.Base.getMyData().Industry
    var company = this.Base.getMyData().company
    var post = this.Base.getMyData().post
    var provide = this.Base.getMyData().provide
    var need = this.Base.getMyData().need
    var interest = this.Base.getMyData().interest
    var studentnumber = this.Base.getMyData().studentnumber
    var card = this.Base.getMyData().card
    var jurisdiction = this.Base.getMyData().show
    var id = this.Base.options.id
    var city = this.Base.getMyData().city
    var area = this.Base.getMyData().area

   

    var bqlise = this.Base.getMyData().bqlise
    var lianxi = this.Base.getMyData().lianxi
    var wechat = this.Base.getMyData().wechat
    
    console.log(city,area,'city',lianxi,wechat)

    // if (xinbieid=='') {
    //   wx.showToast({
    //     title: '请选择您的性别',
    //     icon:'none'
    //   })
    //   return
    // }
    if (birth=='') {
      wx.showToast({
        title: '选择或输入您的出生日期',
        icon:'none'
      })
      return
    }
    if (marid=='') {
      wx.showToast({
        title: '选择或输入您的婚姻状况',
        icon:'none'
      })
      return
    }
    if (graduationyears=='') {
      wx.showToast({
        title: '选择或输入您的毕业年限',
        icon:'none'
      })
      return
    }
    if (graduationyears=='') {
      wx.showToast({
        title: '选择或输入您的毕业年限',
        icon:'none'
      })
      return
    }
    if (graduationyears=='') {
      wx.showToast({
        title: '选择或输入您的毕业年限',
        icon:'none'
      })
      return
    }
    if (education=='') {
      wx.showToast({
        title: '选择您的学历',
        icon:'none'
      })
      return
    }
    if (graduationschool=='') {
      wx.showToast({
        title: '选择您的学历',
        icon:'none'
      })
      return
    }
    if (major=='') {
      wx.showToast({
        title: '请填写专业名称',
        icon:'none'
      })
      return
    }
    if (Industry=='') {
      wx.showToast({
        title: '选择或输入您的行业/方向',
        icon:'none'
      })
      return
    }
    if (company=='') {
      wx.showToast({
        title: '请输入您的单位名称',
        icon:'none'
      })
      return
    }
    if (post=='') {
      wx.showToast({
        title: '请输入您的职务',
        icon:'none'
      })
      return
    }
    if (post=='') {
      wx.showToast({
        title: '请输入您的职务',
        icon:'none'
      })
      return
    }
    if (provide=='') {
      wx.showToast({
        title: '请输入您能为协会和校友提供的资源、业务',
        icon:'none'
      })
      return
    }
    if (need=='') {
      wx.showToast({
        title: '请输入您自身需要的资源、业务',
        icon:'none'
      })
      return
    }
    if (interest=='') {
      wx.showToast({
        title: '请输入您的兴趣爱好',
        icon:'none'
      })
      return
    }
    if (bqlise.length==0) {
      wx.showToast({
        title: '请添加您的标签',
        icon:'none'
      })
      return
    }
    // if (lianxi=='') {
    //   wx.showToast({
    //     title: '请填写联系方式的手机号',
    //     icon:'none'
    //   })
    //   return
    // }
    if (lianxi=='') {
      wx.showToast({
        title: '请填写联系方式的手机号',
        icon:'none'
      })
      return
    }
    if (wechat=='') {
      wx.showToast({
        title: '请填写联系方式的微信',
        icon:'none'
      })
      return
    }
    if (card=='') {
      wx.showToast({
        title: '请上传校园卡、学生证、 毕业证',
        icon:'none'
      })
      return
    }
    if (studentnumber=='') {
      wx.showToast({
        title: '请输入您的学号',
        icon:'none'
      })
      return
    }
    if (city  =='') {
      wx.showToast({
        title: '选择或输入您的城市',
        icon:'none'
      })
      return
    }
    if (area  =='') {
      wx.showToast({
        title: '选择或输入您的区域',
        icon:'none'
      })
      return
    }
    var memberApi = new MemberApi()
    memberApi.addinfo({
      region:area,city,xinbieid,birth,marid,graduationyears,education,graduationschool,major,address,Industry,company,post,
      provide,need,interest,bqlise,studentnumber,card,jurisdiction,id:this.Base.options.id,type:2,wechat,lianxi
    },(res)=>{
      if(res.code==0){
        wx.showToast({
          title: '成功',
          icon:'none'
        })
        wx.navigateTo({
          url: '/pages/shenhe/shenhe',
        })

      }else{
        wx.showToast({
          title: '失败',
          icon:'none'
        })
      }

    })







 

  }
  changehy(e){
    var index=e.detail.value
    var marlist=this.Base.getMyData().marlist
    var marid=marlist[index].id
    var maritalstatus=marlist[index].name
    this.Base.setMyData({
      marid,maritalstatus
    })

  }
  bindDateChange(e){
    var graduationyears=e.detail.value+'级'

    this.Base.setMyData({graduationyears})

  }
  changexl(e){
    var xueli = this.Base.getMyData().xueli
    var education=xueli[e.detail.value]
    this.Base.setMyData({education})
  }
  changefx(e){
    var hanye = this.Base.getMyData().hanye
    var Industry=hanye[e.detail.value]
    this.Base.setMyData({Industry})
  }
  quxiao(){
    this.Base.setMyData({bqshow:false})

  }
  queren(){
    var baiqian = this.Base.getMyData().baiqian
    var bqlise = this.Base.getMyData().bqlise
    bqlise.push(baiqian)
    this.Base.setMyData({baiqian:'',bqlise,bqshow:false})


  }
  shanchu(e){
    var index = e.currentTarget.id
    var bqlise = this.Base.getMyData().bqlise
    bqlise.splice(index,1)
    this.Base.setMyData({bqlise})


  }
  tianjia(){
    this.Base.setMyData({bqshow:true})
  }
  upwximg(){
    var that = this;
    this.Base.uploadImage("member", (ret) => {
      var card = ret;
      that.Base.setMyData({
        card
      });
      console.log(card,999)
    }, 6, undefined);
  }
  select(e){
    console.log(e,'select')
    var id= e.currentTarget.id
    this.Base.setMyData({show:id})

  }
  changechen(e){
  var index=e.detail.value
  var citieslist = this.Base.getMyData().citieslist

  var cityid=citieslist[index].cityid
  var city=citieslist[index].city
  this.Base.setMyData({cityid,city,areaslist:[],area:''})
  this.quyu()
  }
  quyu(){
    var cityid= this.Base.getMyData().cityid
    var city= this.Base.getMyData().city
    if (cityid==''&&city=='') {
      return
    }
     // 区域列表
     var areasApi = new AreasApi()
     areasApi.areaslist({
      cityid,city
     },(areaslist)=>{
       this.Base.setMyData({areaslist})
     })

  }
  changequ(e){
    var index=e.detail.value
    var areaslist = this.Base.getMyData().areaslist

    var area= areaslist[index].area
    this.Base.setMyData({area})



  }
  tishi(){
    var city= this.Base.getMyData().city
    if (city!='') {
      return
    }
    wx.showToast({
      title: '请先选择城市',
      icon:'none'
    })
  }
  qingkong(e){
    var id = e.currentTarget.id
    if(id==1){
      this.Base.setMyData({lianxi:''})
    }
    if(id==2){
      this.Base.setMyData({wechat:''})
    }

  }
  cehnshi(){
    var provinceid = this.Base.getMyData().provinceid
    var multiArray = this.Base.getMyData().multiArray
    var citiesApi = new CitiesApi()
    citiesApi.citieslist({
     provinceid
    },(citieslist)=>{
     for(let item of citieslist){
       item.name=item.city
      }
      
     multiArray[1]=citieslist
     // multiArray.push(citieslist)
      this.Base.setMyData({citieslist,multiArray})
      console.log(multiArray,'multiArray')
    })
  }
  bindMultiPickerChange(e){
    //  最终改变的数

    var multiArray = this.Base.getMyData().multiArray
    var value = e.detail.value[1]


 
    var city=multiArray[1][value]['city']
    var cityid = multiArray[1][value]['cityid']
    this.Base.setMyData({city,cityid,area:''})
    this.quyu()
 
    console.log(e.detail,'detail')



   }
   bindMultiPickerColumnChange(e){
    //  列改变的变化
    var column = e.detail.column
    var value = e.detail.value
    var multiArray = this.Base.getMyData().multiArray


    if (column==0) {
      var provinceid =multiArray[0][value]['provinceid']
      this.Base.setMyData({
        provinceid
      })
      this.cehnshi()

      
    } 
     console.log(e,'ddddd',column,value)

   }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.bindMultiPickerChange = content.bindMultiPickerChange;
body.bindMultiPickerColumnChange = content.bindMultiPickerColumnChange;
body.cehnshi = content.cehnshi;
body.qingkong = content.qingkong;
body.tishi = content.tishi;
body.changequ = content.changequ;
body.quyu = content.quyu;
body.changechen = content.changechen;
body.select = content.select;
body.upwximg = content.upwximg;
body.tianjia = content.tianjia;
body.shanchu = content.shanchu;
body.queren = content.queren;
body.quxiao = content.quxiao;
body.changefx = content.changefx;
body.changexl = content.changexl;
body.bindDateChange = content.bindDateChange;
body.changehy = content.changehy;
body.changecs = content.changecs;
body.changexb = content.changexb;
body.nex = content.nex;
Page(body)