// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ProvincesApi } from "../../apis/provinces.api.js";
import { CitiesApi } from "../../apis/cities.api.js";

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
      showModal:false,
      multiArray: [],
        multiIndex: [0, 0],
multiIds: [],
newArr: [],
provinceslist:[],
citieslist:[],
provinceid:'',
citiname:''

    })
  }
  onMyShow() {
    var that = this;
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
       this.Base.setMyData({citieslist,multiArray})
       console.log(multiArray,'multiArray')
     })


    })

  


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

  go() { 
    this.setData({
    showModal: false
    })
   }
   submit() {
    this.Base.setMyData({
    showModal: true
    })
   }
   bindMultiPickerChange(e){
    //  最终改变的数

    var multiArray = this.Base.getMyData().multiArray
    var value = e.detail.value[1]


 
    var citiname=multiArray[1][value]['city']
    this.Base.setMyData({citiname})
 
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

body.bindMultiPickerColumnChange = content.bindMultiPickerColumnChange;
body.bindMultiPickerChange = content.bindMultiPickerChange;
body.cehnshi = content.cehnshi;
body.go = content.go;
body.submit = content.submit;
Page(body)