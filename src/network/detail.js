import { request } from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params:{
      //iid:iid
      iid
    }
  })
}

//ES5 ---> 自定义对象的写法
// function Goods(itemInfo,columns,services){
//   this.title = itemInfo.title;
//   this.desc = itemInfo.desc;
//   this.newPrice = itemInfo.price;
//   this.oldPrice = itemInfo.oldPrice;
//   this.discount = itemInfo.discount;
//   this.columns = columns;
//   this.services = services;
//   this.realPrice = itemInfo.lowNowPrice;
// }
// var g = new Goods();

// 将数据整合到一个对象中
//ES6 ---> 自定义对象的写法
// class Goods{
//   constructor(itemInfo,columns,services) {
//     this.title = itemInfo.title;
//     this.desc = itemInfo.desc;
//     this.newPrice = itemInfo.price;
//     this.oldPrice = itemInfo.oldPrice;
//     this.discount = itemInfo.discount;
//     this.columns = columns;
//     this.services = services;
//     this.realPrice = itemInfo.lowNowPrice;
//   }
// }
// const g = new Goods();

export class Goods{
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

// const obj = {a:'a',b:'b',c:'c'};
//Object.keys() --- 将对象中的属性名返回一个数组
// console.log(Object.keys(obj)); //["a", "b", "c"]

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}