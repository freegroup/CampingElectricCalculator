(function(e){function n(n){for(var r,o,u=n[0],s=n[1],p=n[2],c=0,l=[];c<u.length;c++)o=u[c],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&l.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);m&&m(n);while(l.length)l.shift()();return i.push.apply(i,p||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],r=!0,o=1;o<t.length;o++){var u=t[o];0!==a[u]&&(r=!1)}r&&(i.splice(n--,1),e=s(s.s=t[0]))}return e}var r={},o={app:0},a={app:0},i=[];function u(e){return s.p+"js/"+({about:"about","diameter~list~map~overview":"diameter~list~map~overview","diameter~map":"diameter~map",diameter:"diameter","list~map~overview":"list~map~overview",map:"map",list:"list",overview:"overview"}[e]||e)+"."+{about:"6da54251","diameter~list~map~overview":"ef778a48","diameter~map":"62fc60a2",diameter:"1269163c","list~map~overview":"7785320f",map:"65436f2a",list:"529e04b4",overview:"aac33ac3"}[e]+".js"}function s(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.e=function(e){var n=[],t={"diameter~list~map~overview":1,"diameter~map":1,diameter:1,"list~map~overview":1,map:1,list:1,overview:1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise((function(n,t){for(var r="css/"+({about:"about","diameter~list~map~overview":"diameter~list~map~overview","diameter~map":"diameter~map",diameter:"diameter","list~map~overview":"list~map~overview",map:"map",list:"list",overview:"overview"}[e]||e)+"."+{about:"31d6cfe0","diameter~list~map~overview":"108abd57","diameter~map":"85cb7c6b",diameter:"5c8076a7","list~map~overview":"29c51e76",map:"d4a98c2f",list:"2e7e1613",overview:"0f01f21e"}[e]+".css",a=s.p+r,i=document.getElementsByTagName("link"),u=0;u<i.length;u++){var p=i[u],c=p.getAttribute("data-href")||p.getAttribute("href");if("stylesheet"===p.rel&&(c===r||c===a))return n()}var l=document.getElementsByTagName("style");for(u=0;u<l.length;u++){p=l[u],c=p.getAttribute("data-href");if(c===r||c===a)return n()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=n,m.onerror=function(n){var r=n&&n.target&&n.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],m.parentNode.removeChild(m),t(i)},m.href=a;var d=document.getElementsByTagName("head")[0];d.appendChild(m)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)n.push(r[2]);else{var i=new Promise((function(n,t){r=a[e]=[n,t]}));n.push(r[2]=i);var p,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=u(e);var l=new Error;p=function(n){c.onerror=c.onload=null,clearTimeout(m);var t=a[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,t[1](l)}a[e]=void 0}};var m=setTimeout((function(){p({type:"timeout",target:c})}),12e4);c.onerror=c.onload=p,document.head.appendChild(c)}return Promise.all(n)},s.m=e,s.c=r,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)s.d(t,r,function(n){return e[n]}.bind(null,r));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="/CampingElectricCalculator/",s.oe=function(e){throw console.error(e),e};var p=window["webpackJsonp"]=window["webpackJsonp"]||[],c=p.push.bind(p);p.push=n,p=p.slice();for(var l=0;l<p.length;l++)n(p[l]);var m=c;i.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"05b3":function(e,n,t){var r={"./trennschalter_1_2_both_off.png":"dfb1"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="05b3"},1083:function(e,n,t){var r={"./bluesolar_75_10.png":"7e79","./bluesolar_75_15.png":"6b51","./buettner_mpp_170.png":"bdae","./buettner_mpp_260.png":"3896","./buettner_mpp_440.png":"844a","./thlevel_30A_pwm.png":"e8ca"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="1083"},"110e":function(e,n,t){e.exports=t.p+"img/redwulf-100A.b049eb50.png"},"1d79":function(e,n,t){e.exports=t.p+"img/ectivemsp100.0d8a10d4.png"},"1fd7":function(e,n,t){var r={"./usb.png":"299f"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="1fd7"},"238c":function(e){e.exports=JSON.parse('{"center":{"uuid":"6473ECD0-5189-4DB0-8E31-480975998729","type":"accu"},"left":[],"right":[]}')},"299f":function(e,n,t){e.exports=t.p+"img/usb.7cf0eb70.png"},"29a9":function(e,n,t){e.exports=t.p+"img/mictuning_12.8e560e52.png"},"2ee5":function(e,n,t){var r={"./lilie_lp4142.png":"90a9"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="2ee5"},3778:function(e,n,t){e.exports=t.p+"img/liotron_200ah.0841693f.png"},"37f3":function(e,n,t){e.exports=t.p+"img/ectivemsp80.0d8a10d4.png"},3829:function(e,n,t){e.exports=t.p+"img/htronic_03A.c29fc50b.png"},"383e":function(e,n,t){e.exports=t.p+"img/engel_ck100.5397c491.png"},3896:function(e,n,t){e.exports=t.p+"img/buettner_mpp_260.53484e40.png"},4098:function(e,n,t){e.exports=t.p+"img/phone_charge.bdb814cd.png"},"41ac":function(e,n,t){e.exports=t.p+"img/schaudt_wa121525.f3766d71.png"},"47a6":function(e,n,t){var r={"./schaudt_wa121525.png":"41ac"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="47a6"},"502c":function(e){e.exports=JSON.parse('{"center":{"uuid":"6473ECD0-5189-4DB0-8E31-480975998729","type":"accu"},"left":[{"uuid":"FBB6A004-FDC3-4937-A08C-30DED8119B66","type":"fuse","operationHours":24,"children":[{"uuid":"E9C5518A-B503-4C00-94F6-F16929A6DFDE","type":"solarBooster","operationHours":4.5,"children":[{"uuid":"22C85112-E95E-4185-B2E7-EB2CB2D35BA1","type":"solarPanel","operationHours":24,"children":[]}]}]},{"uuid":"FBB6A004-FDC3-4937-A08C-30DED8119B66","type":"fuse","operationHours":24,"children":[{"uuid":"6","type":"starterBooster","operationHours":1,"children":[{"uuid":"1w3453245","type":"starterAccu","operationHours":24,"children":[{"uuid":"1w345iuiouh3245","type":"alternator","operationHours":24,"children":[]}]}]}]}],"right":[{"uuid":"C9A6897A-A19C-4CBD-A05B-F93ED56CF65A","type":"fuse","operationHours":24,"children":[{"uuid":"7asdf","type":"fuseBox","operationHours":24,"children":[{"uuid":"1w3453lk245","type":"fridge","operationHours":24,"children":[]},{"uuid":"1w312343lk2454x","type":"usb","operationHours":24,"children":[{"uuid":"1w312343lk245phone","type":"usbConsumer","operationHours":1.5,"children":[]}]}]}]}]}')},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("4de4"),t("d3b7"),t("ac1f"),t("5319"),t("b680");var r=t("2b0e"),o=t("f309");r["a"].use(o["a"]);var a={},i=new o["a"](a),u=t("a925"),s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("router-view")},p=[],c={name:"App"},l=c,m=t("2877"),d=Object(m["a"])(l,s,p,!1,null,null,null),g=d.exports,f=(t("3ca3"),t("ddb0"),t("8c4f"));r["a"].use(f["a"]);var h=[{path:"/",name:"Overview",component:function(){return Promise.all([t.e("diameter~list~map~overview"),t.e("list~map~overview"),t.e("overview")]).then(t.bind(null,"2226"))}},{path:"/map",name:"DefaultMap",component:function(){return Promise.all([t.e("diameter~list~map~overview"),t.e("list~map~overview"),t.e("diameter~map"),t.e("map")]).then(t.bind(null,"4bb4"))}},{path:"/map/:configuration",name:"Map",component:function(){return Promise.all([t.e("diameter~list~map~overview"),t.e("list~map~overview"),t.e("diameter~map"),t.e("map")]).then(t.bind(null,"4bb4"))}},{path:"/list/:configuration",name:"ShoppingList",component:function(){return Promise.all([t.e("diameter~list~map~overview"),t.e("list~map~overview"),t.e("list")]).then(t.bind(null,"697f"))}},{path:"/diameter",name:"WireDiameter",component:function(){return Promise.all([t.e("diameter~list~map~overview"),t.e("diameter~map"),t.e("diameter")]).then(t.bind(null,"cd69"))}},{path:"/about",name:"About",component:function(){return t.e("about").then(t.bind(null,"f820"))}}],A=new f["a"]({routes:h}),b=A,w=t("2f62"),y=(t("7db0"),t("b8ac")),v=[{uuid:"1w345iuiouh3245",type:"alternator",name:"Alternator",imageSrc:y("./alternator.png"),operationHours:24,exportable:!1,shopping:[],data:{spannung:12,strom:80}}],B={namespaced:!0,state:{components:v},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}}},E=(t("4e82"),t("1fd7")),C=[{uuid:"1w312343lk245",type:"usb",name:"USB 3.6A",imageSrc:E("./usb.png"),operationHours:24,exportable:!0,shopping:[],data:{spannung:12,strom:3.6,watt:43.2,buchsen:1}},{uuid:"1w312343lk2452x",type:"usb",name:"2x USB 3.6A",imageSrc:E("./usb.png"),operationHours:24,exportable:!0,shopping:[],data:{spannung:12,strom:7.2,watt:86.4,buchsen:2}},{uuid:"1w312343lk2454x",type:"usb",name:"4x USB 3.6A",imageSrc:E("./usb.png"),operationHours:24,exportable:!0,shopping:[],data:{spannung:12,strom:14.4,watt:172.8,buchsen:4}}];function S(e){return e.sort((function(e,n){return e.data.strom-n.data.strom}))}var _={namespaced:!0,state:{components:S(C)},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}}},O=t("892f"),F=[{uuid:"1w312343lk245phone",type:"usbConsumer",name:"SmartPhone",imageSrc:O("./phone_charge.png"),operationHours:2,runningMode:"loading",exportable:!1,shopping:[],data:{spannung:5,strom:1.5,watt:7.5}},{uuid:"4D17FAB4-DA63-4ED0-879F-DF34EF6BDFFA",type:"usbConsumer",name:"15inch Mac Book Pro",imageSrc:O("./macbook_charge.png"),operationHours:2,runningMode:"loading",exportable:!1,shopping:[],data:{spannung:5,strom:17.4,watt:87}},{uuid:"51EA546A-AF25-4C1C-8019-EC1DA24C697B",type:"usbConsumer",name:"13inch Mac Book Pro",imageSrc:O("./macbook_charge.png"),operationHours:2,runningMode:"loading",exportable:!1,shopping:[],data:{spannung:5,strom:12.2,watt:61}},{uuid:"901D2C87-35EE-4EBD-96AE-A890F62DF45A",type:"usbConsumer",name:"12inch Mac Book Pro",imageSrc:O("./macbook_charge.png"),operationHours:2,runningMode:"loading",exportable:!1,shopping:[],data:{spannung:5,strom:6,watt:30}},{uuid:"6F5314FF-D1B5-448F-AD82-9CE2C20B25ED",type:"usbConsumer",name:"Mac Book Air",imageSrc:O("./macbook_charge.png"),operationHours:2,runningMode:"loading",exportable:!1,shopping:[],data:{spannung:5,strom:6,watt:30}}];function k(e){return e.sort((function(e,n){return e.data.strom-n.data.strom}))}var D={namespaced:!0,state:{components:k(F)},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}}},x=t("f709"),P=[{uuid:"1w3453lk245",type:"fridge",name:"Engel CK100",imageSrc:x("./engel_ck100.png"),operationHours:24,exportable:!0,shopping:[],data:{spannung:12,strom:32/12,watt:32}}],T={namespaced:!0,state:{components:P},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}}},M=t("dad7"),N=[{uuid:"FBB6A004-FDC3-4937-A08C-30DED8119B66",type:"fuse",name:"Red Wulf Fuse 40A",description:"Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",imageSrc:M("./redwulf-40A.png"),exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3zuCba8",label:"Red Wulf Fuse Switch 40A"}],data:{type:"Automatic",strom:40,spannung:12}},{uuid:"C9A6897A-A19C-4CBD-A05B-F93ED56CF65A",type:"fuse",name:"Red Wulf Fuse 50A",description:"Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",imageSrc:M("./redwulf-50A.png"),shopping:[{shop:"Amazon",link:"https://amzn.to/3mZ6yAi",label:"Red Wulf Fuse Switch 50A"}],data:{type:"Automatic",strom:50,spannung:12}},{uuid:"0441223A-0331-4490-AA30-49C180F5323F",type:"fuse",name:"Red Wulf Fuse 70A",description:"Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",imageSrc:M("./redwulf-70A.png"),exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3EYBpmy",label:"Red Wulf Fuse Switch 70A"}],data:{type:"Automatic",strom:70,spannung:12}},{uuid:"EAB2F71E-4DD7-4DAF-9E64-34E746E495C5",type:"fuse",name:"Red Wulf Fuse 100A",description:"Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",imageSrc:M("./redwulf-100A.png"),exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3zpOh4d",label:"Red Wulf Fuse Switch 100A"}],data:{type:"Automatic",strom:100,spannung:12}},{uuid:"1943CC13-AC53-4EA3-9014-D936170FD203",type:"fuse",name:"Red Wulf Fuse 200A",description:"Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",imageSrc:M("./redwulf-200A.png"),operationHours:24,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3mXGeGQ",label:"Red Wulf Fuse Switch 200A"}],data:{type:"Automatic",strom:200,spannung:12}}];function L(e){return e.sort((function(e,n){return e.data.strom-n.data.strom}))}var U={namespaced:!0,state:{components:L(N)},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}}},z=t("e8fe"),V=[{uuid:"7asdf",type:"fuseBox",name:"Sicherungsbox 12",imageSrc:z("./mictuning_12.png"),operationHours:24,exportable:!0,shopping:[],data:{strom:100,spannung:12,strom_je_anschluss:15,anschluesse:12}}];function H(e){return e.sort((function(e,n){return e.data.strom-n.data.strom}))}var I={namespaced:!0,state:{components:H(V)},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}}},j=t("5d8c"),W=[{uuid:"6473ECD0-5189-4DB0-8E31-480975998729",type:"accu",name:"LIONTRON 100Ah",description:"LIONTRON LiFePO4 12,8V 100Ah LX Smart BMS mit Bluetooth",imageSrc:j("./liotron_100ah.png"),shopping:[{shop:"Amazon",link:"https://amzn.to/3t0bMQc",label:"LIONTRON LiFePO4 12,8V 100Ah"}],data:{amperestunden:100,spannung:12,type:"LiFePO4"}},{uuid:"BD79BE1F-AEF9-467E-A0B7-7270080AF600",type:"accu",name:"LIONTRON 200Ah",description:"LIONTRON LiFePO4 12,8V 200Ah LX Smart BMS mit Bluetooth",imageSrc:j("./liotron_200ah.png"),shopping:[{shop:"Amazon",link:"https://amzn.to/3mUKjeY",label:"LIONTRON LiFePO4 12,8V 200Ah"}],data:{amperestunden:200,spannung:12,type:"LiFePO4"}},{uuid:"FFF2A576-2AB2-4C0D-8982-C2053E83DC73",type:"accu",name:"LIONTRON 150Ah",description:"LIONTRON LiFePO4 12,8V 150Ah LX Smart BMS mit Bluetooth",imageSrc:j("./liotron_150ah.png"),shopping:[{shop:"Amazon",link:"https://amzn.to/3sX9xNx",label:"LIONTRON LiFePO4 12,8V 150Ah"}],data:{amperestunden:150,spannung:12,type:"LiFePO4"}}];function R(e){return e.sort((function(e,n){return e.data.amperestunden-n.data.amperestunden}))}var G={namespaced:!0,state:{components:R(W)},actions:{},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}},mutations:{}},K=t("05b3"),J=[{uuid:"CE4E06EA-2E15-4938-AFC5-0C7DA036E876",type:"killSwitch",name:"Kill Switch 300A",description:"Battery Switch Disconnect 12V 24V 48V Battery Switch 1-2-Both-OFF, 300A Main Switch Waterproof Power Switch Battery Disconnect Master for Car Truck Boat Yacht...",imageSrc:K("./trennschalter_1_2_both_off.png"),exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3JVQVTX",label:"Battery Switch Disconnect 12V 24V 48V, Switch 1-2-Both-OFF, 300A"}],data:{strom:300,spannung:12}}];function Y(e){return e.sort((function(e,n){return e.data.strom-n.data.strom}))}var Q={namespaced:!0,state:{components:Y(J)},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}}},X=t("73f9"),q=[{uuid:"C574D3F2-0164-46DF-BC2F-C558BA54599D",type:"shoreBooster",name:"Victron Energy 20A",imageSrc:X("./victron_20A.png"),operationHours:1,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3zJaNVC",label:"Victron Energy Blue Smart IP22 Lader 12/20(1) 230V",lastKnownPrice:160}],data:{chargeSupport:["LiFePO4"],eingangsspannung:230,spannung:12,strom:20,watt:240}},{uuid:"C7950C31-70F6-48C2-BE4A-95D856276FFC",type:"shoreBooster",name:"Victron Energy 30A",imageSrc:X("./victron_30A.png"),operationHours:1,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3tgWV3Q",label:"Victron Energy Blue Smart IP22 Lader 12/30(1) 230V",lastKnownPrice:190}],data:{chargeSupport:["LiFePO4"],eingangsspannung:230,spannung:12,strom:30,watt:360}},{uuid:"E74C9F12-B3A1-4654-9F83-04077138DECA",type:"shoreBooster",name:"H-TronicAutomatic 0.3A",imageSrc:X("./htronic_03A.png"),operationHours:1,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3qbQ9ui",label:"H-TronicAutomatic lead-acid battery wall socket charger",lastKnownPrice:16.9}],data:{chargeSupport:["Blei"],eingangsspannung:230,spannung:12,strom:.3,watt:12*.3}}];function Z(e){return e.sort((function(e,n){return e.data.strom-n.data.strom}))}var $={namespaced:!0,state:{components:Z(q)},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}}},ee=t("1083"),ne=[{uuid:"17302EE5-08AC-4E2C-882B-F30EA9536B07",type:"solarBooster",name:"BlueSolar 75|15",imageSrc:ee("./bluesolar_75_15.png"),operationHours:4.5,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/32PDkgo",label:"Victron Energy BlueSolar MPPT 75/15 12V 24V 15A"}],data:{type:"MPPT",chargeSupport:["LiFePO4","Blei","AGM"],nennladestrom:15,spannung:12,eingangsspannung:75,eingangswatt:200,kurzschlussstrom:15}},{uuid:"F9AB426A-5166-4B4E-8FB5-ACB7687BE78E",type:"solarBooster",name:"BlueSolar 75|10",imageSrc:ee("./bluesolar_75_10.png"),operationHours:4.5,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3sYrHyk",label:"Victron Energy BlueSolar MPPT 75/10 12V 24V 10A"}],data:{type:"MPPT",chargeSupport:["LiFePO4","Blei","AGM"],nennladestrom:10,spannung:12,eingangsspannung:75,eingangswatt:130,kurzschlussstrom:13}},{uuid:"B5F979A2-5D7F-44F9-8BEE-BB1AE257D51F",type:"solarBooster",name:"Thlevel 30A PWM",imageSrc:ee("./thlevel_30A_pwm.png"),operationHours:4.5,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3n0xKi5",label:"Thlevel 30A 12V/24V Solar Laderegler"}],data:{type:"PWM",chargeSupport:["Lithium","Blei","AGM"],nennladestrom:30,spannung:12,eingangsspannung:50,eingangswatt:130,kurzschlussstrom:30}},{uuid:"E9C5518A-B503-4C00-94F6-F16929A6DFDE",type:"solarBooster",name:"Büttner MPP 440",imageSrc:ee("./buettner_mpp_440.png"),operationHours:4.5,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3n5pmOc",label:"Büttner MT-Solarregler MPP 440 inkl. Temperaturfühler"}],data:{type:"MPPT",chargeSupport:["LiFePO4","Gel","Blei","AGM"],nennladestrom:32,spannung:12,eingangsspannung:50,eingangswatt:440,kurzschlussstrom:26.5}},{uuid:"CF70B8A2-B4EC-4639-BBD7-63D17D8BD39E",type:"solarBooster",name:"Büttner MPP 260",imageSrc:ee("./buettner_mpp_260.png"),operationHours:4.5,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3qVYBNC",label:"Büttner MT-Solarregler MPP 260 inkl. Temperaturfühler"}],data:{type:"MPPT",chargeSupport:["LiFePO4","Gel","Blei","AGM"],nennladestrom:16,spannung:12,eingangsspannung:50,eingangswatt:260,kurzschlussstrom:18.5}},{uuid:"0E276659-6695-4900-821B-A1D23D29B8AA",type:"solarBooster",name:"Büttner MPP 170",imageSrc:ee("./buettner_mpp_170.png"),operationHours:4.5,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3n3xj6v",label:"Büttner MT-Solarregler MPP 170 inkl. Temperaturfühler"}],data:{type:"MPPT",chargeSupport:["LiFePO4","Gel","Blei","AGM"],nennladestrom:12.5,spannung:12,eingangsspannung:50,eingangswatt:170,kurzschlussstrom:10.5}}];function te(e){return e.sort((function(e,n){return e.data.strom-n.data.strom}))}var re={namespaced:!0,state:{components:te(ne)},actions:{},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}},mutations:{}},oe=t("47a6"),ae=[{uuid:"B522FFA9-0D08-4A82-9399-65B9D74A4B28",type:"starterBooster",name:"Schaudt WA121525",imageSrc:oe("./schaudt_wa121525.png"),operationHours:1,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3r6cTuS",label:"Schaudt 9990359 Booster WA 121525",lastKnownPrice:146}],data:{chargeSupport:["Lithium",",Gel","Blei","AGM"],type:"DC-DC Converter",eingangsspannung:12,eingangsstrom:15,spannung:12,strom:15,watt:180}}];function ie(e){return e.sort((function(e,n){return e.data.strom-n.data.strom}))}var ue={namespaced:!0,state:{components:ie(ae)},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}}},se=t("8a18"),pe=[{uuid:"1w3453245",type:"starterAccu",name:"Starter",imageSrc:se("./starter.png"),exportable:!1,shopping:[],data:{spannung:12,strom:400}}];function ce(e){return e.sort((function(e,n){return e.data.strom-n.data.strom}))}var le={namespaced:!0,state:{components:ce(pe)},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}}},me=t("a059"),de=[{uuid:"6676406A-45EA-4B45-98A9-6118ADF47CD6",type:"solarPanel",name:"ECTIVE MSP 80",hersteller:"ECTIVE",imageSrc:me("./ectivemsp80.png"),operationHours:24,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3G6QxQs",label:"ECTIVE 24V 70W Monokristallines Solarmodul Black Edition"}],data:{watt:80,nennspannung:18.2,leerlaufspannung:21.5,nennstrom:4.4,kurzschlusstrom:4.91}},{uuid:"578D8BAA-EF41-47E9-A25E-45995B7E4F14",type:"solarPanel",name:"ECTIVE MSP 70",hersteller:"ECTIVE",imageSrc:me("./ectivemsp70.png"),operationHours:24,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/3G6QxQs",label:"ECTIVE 24V 70W Monokristallines Solarmodul Black Edition"}],data:{watt:70,nennspannung:36.19,leerlaufspannung:21.5,nennstrom:1.94,kurzschlusstrom:2.1}},{uuid:"9E01A0BE-BBE5-4421-B52E-2DFE25D79C03",type:"solarPanel",name:"ECTIVE MSP 100",hersteller:"ECTIVE",imageSrc:me("./ectivemsp100.png"),operationHours:24,exportable:!0,shopping:[{shop:"Amazon",link:"https://amzn.to/34BKl5b",label:"ECTIVE 24V 100W Monokristallines Solarmodul Black Edition"}],data:{watt:100,nennspannung:36.19,leerlaufspannung:21.5,nennstrom:2.77,kurzschlusstrom:3.01}},{uuid:"22C85112-E95E-4185-B2E7-EB2CB2D35BA1",type:"solarPanel",name:"Büttner Power Line 210",hersteller:"Büttner",imageSrc:me("./buettner210.png"),operationHours:24,exportable:!0,shopping:[{shop:"Etriox",link:"https://shop.etriox.de/Buettner-Power-Line-Solar-Komplettanlage-210-W",label:"Büttner Power Line Solar-Komplettanlage 210 W"},{shop:"Camping Wagner",link:"https://www.campingwagner.de/product_info.php/info/p83927_Buettner-Elektronik-Power-Line-MT-210-Solar-Komplettanlage--210Wp--920Wh-Tag.html",label:"Büttner Power Line Solar-Komplettanlage 210 W"}],data:{watt:210,nennspannung:27,leerlaufspannung:22.5,nennstrom:9.34,kurzschlusstrom:9.8}}];function ge(e){return e.sort((function(e,n){return e.data.watt-n.data.watt}))}var fe={namespaced:!0,state:{components:ge(de)},actions:{},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}},mutations:{}},he=t("2ee5"),Ae=[{uuid:"1w3123pump43lk245",type:"pressurePump",name:"Lilie LP4142",imageSrc:he("./lilie_lp4142.png"),operationHours:2,exportable:!0,shopping:[],data:{spannung:12,strom:3.5,watt:42}}],be=Ae,we={namespaced:!0,state:{components:be},getters:{getByUuid:function(e,n,t,r){return function(n){return e.components.find((function(e){return e.uuid===n}))}}}},ye=(t("e9c4"),t("502c")),ve=t("238c"),Be=t("942c"),Ee={namespaced:!0,state:{all:[{id:"user",label:"User Defined Configuration",config:ye},{id:"new",label:"Empty Setup",config:ve},{id:"default",label:"Standard",config:ye},{id:"solarOnly100W",label:"100 Watt Solar",config:Be}]},actions:{saveUserConfiguration:function(e,n){var t=e.commit;t("SET_USER_CONFIGURATION",n)}},getters:{getById:function(e,n,t,r){return function(n){if("user"===n&&localStorage.getItem("configuration"))return JSON.parse(localStorage.getItem("configuration"));var t=e.all.find((function(e){return e.id===n}));return t||e.all[1]}}},mutations:{SET_USER_CONFIGURATION:function(e,n){e.all[0].config=n,localStorage.setItem("configuration",JSON.stringify(e.all[0],void 0,2))}}};r["a"].use(w["a"]);var Ce=new w["a"].Store({modules:{alternator:B,usb:_,usbConsumer:D,fridge:T,fuse:U,fuseBox:I,accu:G,pressurePump:we,shoreBooster:$,solarBooster:re,starterBooster:ue,killSwitch:Q,starterAccu:le,solarPanel:fe,configuration:Ee}}),Se=(t("d5e8"),t("5363"),{en:{data:{label:{amperestunden:"Ampere Hour",strom:"Current",nennladestrom:"Current",nennstrom:"Current",watt:"Watt",strom_je_anschluss:"Current / Unit",anschluesse:"Units",type:"Type",gewicht:"Weight",zellen:"Cells",leerlaufspannung:"Open-Circuit Voltage",kurzschlusstrom:"Short-Circuit Current",eingangsspannung:"Input Voltage",eingangsstrom:"Input Current",eingangswatt:"Input Watt",chargeSupport:"Supported Battery Types",spannung:"Voltage",operationHours:"Operation Hours",nennspannung:"Nominal Voltage"},unit:{amperestunden:"Ah",strom:"A",nennladestrom:"A",nennstrom:"A",strom_je_anschluss:"A",watt:"Watt",anschluesse:"",type:"",gewicht:"Gramm",zellen:"",leerlaufspannung:"Volt",kurzschlusstrom:"A",eingangsspannung:"Volt",eingangsstrom:"A",eingangswatt:"Watt",spannung:"Volt",nennspannung:"Volt",operationHours:"hours",chargeSupport:""}},view:{shopping:{battery:"Battery",charge:"Charging Side",factsheet:"Factsheet",shops:"Online Shops",consumer:"Consumer Side"}},component:{solarBooster:"Solar Booster",killSwitch:"Power Switch",solarPanel:"Solar Panel",shoreBooster:"Shore Power Battery Charger",starterBooster:"DC-DC Booster",starterAccu:"Start Battery",alternator:"Alternator",accu:"Caravan Battery",fridge:"Fridge",fuse:"Fuse",fuseBox:"Fuse Box",pressurePump:"Pressure Pump",usb:"Usb Socket",usbConsumer:"Usb Charging Devices"},dialog:{selectComponent:{title:"Exchange Component",subtitle:"Replace the component with one of the same type but different characteristics"},consumer:{title:"Energy Consumption",subtitle:"Displays the total energy consumption flowing through this component"},balance:{title:"Energy Balance",subtitle:"An overview of the energy flowing into and out of the component"},addComponent:{okButton:"Close",title:"Add Component",subtitle:"Add a new component to the diagram which will be included in the total calculation."},error:{okButton:"Close",title:"Component Error",subtitle:"Indicates errors in the configuration of the components or their children"},info:{okButton:"Close",title:"Component Information",subtitle:"Technical details about the component"},timer:{okButton:"Apply",title:"Timer Settings",subtitle:"Set the average time per day that the device is in operation or charged from the power supply.",sliderLabel:"Hours/Day",sliderDescription:"Operation hours per day",description:"Not all devices are connected to the electrical system 24 hours a day and consume or providing electricity. <b>Here you can set how long you think the affected device is in operation on average per day.</b> These are items like cell phones, camera batteries, drone batteries, external chargers, water pumps, and so on. Basically anything that you charge and then unplug for use."},help:{okButton:"Close",title:"What does the tool do?",subtitle:"Simplifies the calculation of your currents and consumption of your electrics"}}},de:{message:{hello:"Hallo Welt"},dialog:{selectComponent:{header:"Bauteil auswählen"}}}});r["a"].config.productionTip=!0,r["a"].use(u["a"]);var _e=new u["a"]({locale:"en",messages:Se});r["a"].filter("toFixed",(function(e){return isNaN(e)?e:e.toFixed(2).replace(/\.00$/,"")})),new r["a"]({router:b,store:Ce,vuetify:i,i18n:_e,render:function(e){return e(g)}}).$mount("#app")},"5d8c":function(e,n,t){var r={"./accu1.png":"7151","./liotron_100ah.png":"c7f9","./liotron_150ah.png":"6832","./liotron_200ah.png":"3778","./liotron_artic.png":"b4e7"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="5d8c"},6832:function(e,n,t){e.exports=t.p+"img/liotron_150ah.4e70bc02.png"},"6b51":function(e,n,t){e.exports=t.p+"img/bluesolar_75_15.57ff8444.png"},"6db3":function(e,n,t){e.exports=t.p+"img/redwulf-70A.c6eb3ef4.png"},7151:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAaVBMVEX////c4eSls7tvhZNXcYHI0NVcdYWHmqXL09j5+vpcdYSsucD8/f2El6P4+foYO1HCy9Lz9ffo7O/u8fO6xMz///////////////96jpvj6OtYcYKYqLPe5Oj///9YcYF1i5iuvMTU3OFgl1PkAAAAAXRSTlMAQObYZgAAAGlJREFUCJk9jUkWgyAQBT/doMaBFjRRURxy/0Om2aTeq01tCoAhtkwGiqvq5tXUldPadn2haw1o8N6LOhB4DCGIOjJsnKQwRQue4/sjyxpnBm0pJVE3gtmPnM+cj10P7rqf73Nfrsz+3x9NpAYJ6cTHewAAAABJRU5ErkJggg=="},"73f9":function(e,n,t){var r={"./htronic_03A.png":"3829","./victron_20A.png":"bcca","./victron_30A.png":"e5f8"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="73f9"},7974:function(e,n,t){e.exports=t.p+"img/starter.3b85340d.png"},"7e79":function(e,n,t){e.exports=t.p+"img/bluesolar_75_10.72633432.png"},"844a":function(e,n,t){e.exports=t.p+"img/buettner_mpp_440.b8b70bd1.png"},8851:function(e,n,t){e.exports=t.p+"img/redwulf-50A.2f4816c3.png"},"892f":function(e,n,t){var r={"./macbook_charge.png":"d301","./phone_charge.png":"4098"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="892f"},"8a18":function(e,n,t){var r={"./starter.png":"7974"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="8a18"},"90a9":function(e,n,t){e.exports=t.p+"img/lilie_lp4142.55326764.png"},"942c":function(e){e.exports=JSON.parse('{"center":{"type":"accu","uuid":"6473ECD0-5189-4DB0-8E31-480975998729"},"left":[{"type":"fuse","uuid":"FBB6A004-FDC3-4937-A08C-30DED8119B66","children":[{"type":"solarBooster","uuid":"17302EE5-08AC-4E2C-882B-F30EA9536B07","children":[{"type":"solarPanel","uuid":"6676406A-45EA-4B45-98A9-6118ADF47CD6","children":[{"type":"solarPanel","uuid":"6676406A-45EA-4B45-98A9-6118ADF47CD6","children":[]}]}]}]}],"right":[{"type":"fuse","uuid":"C9A6897A-A19C-4CBD-A05B-F93ED56CF65A","children":[]}]}')},a059:function(e,n,t){var r={"./buettner210.png":"a0f8","./ectivemsp100.png":"1d79","./ectivemsp70.png":"b889","./ectivemsp80.png":"37f3"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="a059"},a0f8:function(e,n,t){e.exports=t.p+"img/buettner210.0b98c169.png"},a4e7:function(e,n,t){e.exports=t.p+"img/redwulf-40A.9780b922.png"},b4e7:function(e,n,t){e.exports=t.p+"img/liotron_artic.6eb86716.png"},b889:function(e,n,t){e.exports=t.p+"img/ectivemsp70.a9a9fb66.png"},b8a3:function(e,n,t){e.exports=t.p+"img/redwulf-200A.a6c4f9d8.png"},b8ac:function(e,n,t){var r={"./alternator.png":"bac9"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="b8ac"},bac9:function(e,n,t){e.exports=t.p+"img/alternator.25d7e34f.png"},bcca:function(e,n,t){e.exports=t.p+"img/victron_20A.f5bcc218.png"},bdae:function(e,n,t){e.exports=t.p+"img/buettner_mpp_170.414c74eb.png"},c7f9:function(e,n,t){e.exports=t.p+"img/liotron_100ah.f20650ba.png"},d301:function(e,n,t){e.exports=t.p+"img/macbook_charge.f2bdd537.png"},dad7:function(e,n,t){var r={"./redwulf-100A.png":"110e","./redwulf-200A.png":"b8a3","./redwulf-40A.png":"a4e7","./redwulf-50A.png":"8851","./redwulf-70A.png":"6db3"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="dad7"},dfb1:function(e,n,t){e.exports=t.p+"img/trennschalter_1_2_both_off.348ee732.png"},e5f8:function(e,n,t){e.exports=t.p+"img/victron_30A.f5bcc218.png"},e8ca:function(e,n,t){e.exports=t.p+"img/thlevel_30A_pwm.95ea2613.png"},e8fe:function(e,n,t){var r={"./mictuning_12.png":"29a9"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="e8fe"},f709:function(e,n,t){var r={"./engel_ck100.png":"383e"};function o(e){var n=a(e);return t(n)}function a(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="f709"}});
//# sourceMappingURL=app.fe14fd22.js.map