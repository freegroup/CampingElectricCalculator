(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["list"],{"0fd9":function(t,e,n){"use strict";var a=n("ade3"),s=n("5530"),r=(n("d3b7"),n("caad"),n("2532"),n("99af"),n("b64b"),n("ac1f"),n("5319"),n("4ec9"),n("3ca3"),n("ddb0"),n("159b"),n("4b85"),n("2b0e")),i=n("d9f7"),o=n("80d2"),c=["sm","md","lg","xl"],l=["start","end","center"];function u(t,e){return c.reduce((function(n,a){return n[t+Object(o["x"])(a)]=e(),n}),{})}var d=function(t){return[].concat(l,["baseline","stretch"]).includes(t)},f=u("align",(function(){return{type:String,default:null,validator:d}})),v=function(t){return[].concat(l,["space-between","space-around"]).includes(t)},p=u("justify",(function(){return{type:String,default:null,validator:v}})),h=function(t){return[].concat(l,["space-between","space-around","stretch"]).includes(t)},b=u("alignContent",(function(){return{type:String,default:null,validator:h}})),g={align:Object.keys(f),justify:Object.keys(p),alignContent:Object.keys(b)},_={align:"align",justify:"justify",alignContent:"align-content"};function m(t,e,n){var a=_[t];if(null!=n){if(e){var s=e.replace(t,"");a+="-".concat(s)}return a+="-".concat(n),a.toLowerCase()}}var y=new Map;e["a"]=r["a"].extend({name:"v-row",functional:!0,props:Object(s["a"])(Object(s["a"])(Object(s["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},f),{},{justify:{type:String,default:null,validator:v}},p),{},{alignContent:{type:String,default:null,validator:h}},b),render:function(t,e){var n=e.props,s=e.data,r=e.children,o="";for(var c in n)o+=String(n[c]);var l=y.get(o);return l||function(){var t,e;for(e in l=[],g)g[e].forEach((function(t){var a=n[t],s=m(e,t,a);s&&l.push(s)}));l.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(a["a"])(t,"align-".concat(n.align),n.align),Object(a["a"])(t,"justify-".concat(n.justify),n.justify),Object(a["a"])(t,"align-content-".concat(n.alignContent),n.alignContent),t)),y.set(o,l)}(),t(n.tag,Object(i["a"])(s,{staticClass:"row",class:l}),r)}})},"1f4f":function(t,e,n){"use strict";var a=n("5530"),s=(n("a9e3"),n("8b37"),n("80d2")),r=n("7560"),i=n("58df");e["a"]=Object(i["a"])(r["a"]).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes:function(){return Object(a["a"])({"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader,"v-data-table--has-top":!!this.$slots.top,"v-data-table--has-bottom":!!this.$slots.bottom},this.themeClasses)}},methods:{genWrapper:function(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(s["g"])(this.height)}},[this.$createElement("table",this.$slots.default)])}},render:function(t){return t("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}})},"2a7f":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a=n("71d9"),s=n("80d2"),r=Object(s["i"])("v-toolbar__title"),i=Object(s["i"])("v-toolbar__items");a["a"]},"4ec9":function(t,e,n){"use strict";var a=n("6d61"),s=n("6566");a("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),s)},"62ad":function(t,e,n){"use strict";var a=n("ade3"),s=n("5530"),r=(n("d3b7"),n("a9e3"),n("b64b"),n("ac1f"),n("5319"),n("4ec9"),n("3ca3"),n("ddb0"),n("caad"),n("159b"),n("2ca0"),n("4b85"),n("2b0e")),i=n("d9f7"),o=n("80d2"),c=["sm","md","lg","xl"],l=function(){return c.reduce((function(t,e){return t[e]={type:[Boolean,String,Number],default:!1},t}),{})}(),u=function(){return c.reduce((function(t,e){return t["offset"+Object(o["x"])(e)]={type:[String,Number],default:null},t}),{})}(),d=function(){return c.reduce((function(t,e){return t["order"+Object(o["x"])(e)]={type:[String,Number],default:null},t}),{})}(),f={col:Object.keys(l),offset:Object.keys(u),order:Object.keys(d)};function v(t,e,n){var a=t;if(null!=n&&!1!==n){if(e){var s=e.replace(t,"");a+="-".concat(s)}return"col"!==t||""!==n&&!0!==n?(a+="-".concat(n),a.toLowerCase()):a.toLowerCase()}}var p=new Map;e["a"]=r["a"].extend({name:"v-col",functional:!0,props:Object(s["a"])(Object(s["a"])(Object(s["a"])(Object(s["a"])({cols:{type:[Boolean,String,Number],default:!1}},l),{},{offset:{type:[String,Number],default:null}},u),{},{order:{type:[String,Number],default:null}},d),{},{alignSelf:{type:String,default:null,validator:function(t){return["auto","start","end","center","baseline","stretch"].includes(t)}},tag:{type:String,default:"div"}}),render:function(t,e){var n=e.props,s=e.data,r=e.children,o=(e.parent,"");for(var c in n)o+=String(n[c]);var l=p.get(o);return l||function(){var t,e;for(e in l=[],f)f[e].forEach((function(t){var a=n[t],s=v(e,t,a);s&&l.push(s)}));var s=l.some((function(t){return t.startsWith("col-")}));l.push((t={col:!s||!n.cols},Object(a["a"])(t,"col-".concat(n.cols),n.cols),Object(a["a"])(t,"offset-".concat(n.offset),n.offset),Object(a["a"])(t,"order-".concat(n.order),n.order),Object(a["a"])(t,"align-self-".concat(n.alignSelf),n.alignSelf),t)),p.set(o,l)}(),t(n.tag,Object(i["a"])(s,{class:l}),r)}})},6566:function(t,e,n){"use strict";var a=n("9bf2").f,s=n("7c73"),r=n("e2cc"),i=n("0366"),o=n("19aa"),c=n("2266"),l=n("7dd0"),u=n("2626"),d=n("83ab"),f=n("f183").fastKey,v=n("69f3"),p=v.set,h=v.getterFor;t.exports={getConstructor:function(t,e,n,l){var u=t((function(t,a){o(t,v),p(t,{type:e,index:s(null),first:void 0,last:void 0,size:0}),d||(t.size=0),void 0!=a&&c(a,t[l],{that:t,AS_ENTRIES:n})})),v=u.prototype,b=h(e),g=function(t,e,n){var a,s,r=b(t),i=_(t,e);return i?i.value=n:(r.last=i={index:s=f(e,!0),key:e,value:n,previous:a=r.last,next:void 0,removed:!1},r.first||(r.first=i),a&&(a.next=i),d?r.size++:t.size++,"F"!==s&&(r.index[s]=i)),t},_=function(t,e){var n,a=b(t),s=f(e);if("F"!==s)return a.index[s];for(n=a.first;n;n=n.next)if(n.key==e)return n};return r(v,{clear:function(){var t=this,e=b(t),n=e.index,a=e.first;while(a)a.removed=!0,a.previous&&(a.previous=a.previous.next=void 0),delete n[a.index],a=a.next;e.first=e.last=void 0,d?e.size=0:t.size=0},delete:function(t){var e=this,n=b(e),a=_(e,t);if(a){var s=a.next,r=a.previous;delete n.index[a.index],a.removed=!0,r&&(r.next=s),s&&(s.previous=r),n.first==a&&(n.first=s),n.last==a&&(n.last=r),d?n.size--:e.size--}return!!a},forEach:function(t){var e,n=b(this),a=i(t,arguments.length>1?arguments[1]:void 0);while(e=e?e.next:n.first){a(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!_(this,t)}}),r(v,n?{get:function(t){var e=_(this,t);return e&&e.value},set:function(t,e){return g(this,0===t?0:t,e)}}:{add:function(t){return g(this,t=0===t?0:t,t)}}),d&&a(v,"size",{get:function(){return b(this).size}}),u},setStrong:function(t,e,n){var a=e+" Iterator",s=h(e),r=h(a);l(t,e,(function(t,e){p(this,{type:a,target:t,state:s(t),kind:e,last:void 0})}),(function(){var t=r(this),e=t.kind,n=t.last;while(n&&n.removed)n=n.previous;return t.target&&(t.last=n=n?n.next:t.state.first)?"keys"==e?{value:n.key,done:!1}:"values"==e?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),u(e)}}},"697f":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"#E39623",dense:"",dark:""}},[n("v-toolbar-title",[t._v("Configuration: "+t._s(t.configuration.label))]),n("v-spacer")],1),n("v-main",{staticClass:"ma-6"},[t._v(" "+t._s(t.$t("view.shopping.battery"))+" "),n("v-card",{staticClass:"pa-3 mb-10"},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{staticClass:"mb-5",attrs:{cols:"12"}},[n("div",{staticClass:"text-h6"},[t._v(t._s(t.battery.name))]),n("div",{staticClass:"text-subtitle-1"},[t._v(t._s(t.battery.description))])]),n("v-col",{attrs:{cols:"2"}},[n("v-img",{staticClass:"mt-5",attrs:{src:t.battery.imageSrc,contain:""}})],1),n("v-col",{staticClass:"mt-5 pl-10",attrs:{cols:"10"}},[n("v-row",[n("v-icon",{staticClass:"mr-2"},[t._v("mdi-clipboard-outline")]),t._v(" "+t._s(t.$t("view.shopping.factsheet"))+" ")],1),n("v-row",[n("v-simple-table",{attrs:{flat:"",dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[n("thead",[n("tr",[n("th",{staticClass:"text-left",attrs:{width:"200"}},[t._v("Name")]),t._v(" "),n("th",{staticClass:"text-left"},[t._v("Value")])])]),n("tbody",t._l(Object.keys(t.battery.data),(function(e){return n("tr",{key:e},[n("td",[t._v(t._s(t.$t("data.label."+e)))]),n("td",[t._v(t._s(t.battery.data[e])+" "+t._s(t.$t("data.unit."+e)))])])})),0)]},proxy:!0}])})],1),t.battery.shopping.length>0?[n("v-row",{staticClass:"mt-10"},[n("v-icon",{staticClass:"mr-2"},[t._v("mdi-cart-outline")]),t._v(" "+t._s(t.$t("view.shopping.shops"))+" ")],1),n("v-row",{staticClass:"mb-5"},[n("v-simple-table",{attrs:{flat:"",dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[n("tbody",t._l(t.battery.shopping,(function(e,a){return n("tr",{key:a+"shop"},[n("td",[t._v(t._s(e.shop))]),n("td",[n("v-btn",{staticClass:"ma-1 darken-1",attrs:{target:"_blank",color:"red",plain:"",href:e.link}},[t._v(" "+t._s(e.label)+" "),n("v-icon",{attrs:{small:""}},[t._v("mdi-open-in-new")])],1)],1)])})),0)]},proxy:!0}],null,!1,1309293355)})],1)]:t._e()],2)],1)],1),t._v(" "+t._s(t.$t("view.shopping.consumer"))+" "),n("v-card",{staticClass:"pa-3 mb-10"},[t._l(t.consumers,(function(e){return[e.exportable?n("v-row",{key:e.uuid,staticClass:"mb-10",attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"12"}},[n("div",{staticClass:"text-h6"},[t._v(t._s(e.name))]),n("div",{staticClass:"text-subtitle-1"},[t._v(t._s(e.description))])]),n("v-col",{attrs:{cols:"2"}},[n("v-img",{staticClass:"mt-5",attrs:{src:e.imageSrc,contain:""}})],1),n("v-col",{staticClass:"mt-5 pl-10",attrs:{cols:"10"}},[n("v-row",[n("v-icon",{staticClass:"mr-2"},[t._v("mdi-clipboard-outline")]),t._v(t._s(t.$t("view.shopping.factsheet"))+" ")],1),n("v-row",[n("v-simple-table",{attrs:{flat:"",dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[n("thead",[n("tr",[n("th",{staticClass:"text-left",attrs:{width:"200"}},[t._v("Name")]),t._v(" "),n("th",{staticClass:"text-left"},[t._v("Value")])])]),n("tbody",t._l(Object.keys(e.data),(function(a){return n("tr",{key:a},[n("td",[t._v(t._s(t.$t("data.label."+a)))]),n("td",[t._v(t._s(e.data[a])+" "+t._s(t.$t("data.unit."+a)))])])})),0)]},proxy:!0}],null,!0)})],1),e.shopping.length>0?[n("v-row",{staticClass:"mt-10"},[n("v-icon",{staticClass:"mr-2"},[t._v("mdi-cart-outline")]),t._v(" "+t._s(t.$t("view.shopping.shops"))+" ")],1),n("v-row",{staticClass:"mb-5"},[n("v-simple-table",{attrs:{flat:"",dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[n("tbody",t._l(e.shopping,(function(e,a){return n("tr",{key:a+"shop"},[n("td",[t._v(t._s(e.shop))]),n("td",[n("v-btn",{staticClass:"ma-1 darken-1",attrs:{target:"_blank",color:"red",plain:"",href:e.link}},[t._v(" "+t._s(e.label)+" "),n("v-icon",{attrs:{small:""}},[t._v("mdi-open-in-new")])],1)],1)])})),0)]},proxy:!0}],null,!0)})],1)]:t._e()],2)],1):t._e()]}))],2),t._v(" "+t._s(t.$t("view.shopping.charge"))+" "),n("v-card",{staticClass:"pa-3 mb-10"},[t._l(t.producer,(function(e){return[e.exportable?n("v-row",{key:e.uuid,staticClass:"mb-10",attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"12"}},[n("div",{staticClass:"text-h6"},[t._v(t._s(e.name))]),n("div",{staticClass:"text-subtitle-1"},[t._v(t._s(e.description))])]),n("v-col",{attrs:{cols:"2"}},[n("v-img",{staticClass:"mt-5",attrs:{src:e.imageSrc,contain:""}})],1),n("v-col",{staticClass:"mt-5 pl-10",attrs:{cols:"10"}},[n("v-row",[n("v-icon",{staticClass:"mr-2"},[t._v("mdi-clipboard-outline")]),t._v(t._s(t.$t("view.shopping.factsheet"))+" ")],1),n("v-row",[n("v-simple-table",{attrs:{flat:"",dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[n("thead",[n("tr",[n("th",{staticClass:"text-left",attrs:{width:"200"}},[t._v("Name")]),t._v(" "),n("th",{staticClass:"text-left"},[t._v("Value")])])]),n("tbody",t._l(Object.keys(e.data),(function(a,s){return n("tr",{key:e.uuid+s},[n("td",[t._v(t._s(t.$t("data.label."+a)))]),n("td",[t._v(t._s(e.data[a])+" "+t._s(t.$t("data.unit."+a)))])])})),0)]},proxy:!0}],null,!0)})],1),e.shopping.length>0?[n("v-row",{staticClass:"mt-10"},[n("v-icon",{staticClass:"mr-2"},[t._v("mdi-cart-outline")]),t._v(" "+t._s(t.$t("view.shopping.shops"))+" ")],1),n("v-row",{staticClass:"mb-5"},[n("v-simple-table",{attrs:{flat:"",dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[n("tbody",t._l(e.shopping,(function(e,a){return n("tr",{key:a+"shop"},[n("td",[t._v(t._s(e.shop))]),n("td",[n("v-btn",{staticClass:"ma-1 darken-1",attrs:{target:"_blank",color:"red",plain:"",href:e.link}},[t._v(" "+t._s(e.label)+" "),n("v-icon",{attrs:{small:""}},[t._v("mdi-open-in-new")])],1)],1)])})),0)]},proxy:!0}],null,!0)})],1)]:t._e()],2)],1):t._e()]}))],2)],1)],1)},s=[],r=(n("d3b7"),n("159b"),{name:"Map",components:{},mounted:function(){this.configuration=this.$store.getters["profile/getById"](this.$route.params.configuration)},data:function(){return{configuration:{config:{center:{},left:[],right:[]}}}},methods:{getComponent:function(t,e){return this.$store.getters[t+"/getByUuid"](e)}},watch:{},computed:{battery:function(){var t=this.configuration.config.center.type,e=this.configuration.config.center.uuid;return t&&e?this.getComponent(t,e):{data:{amperestunden:0},shopping:[]}},consumers:function(){var t=this,e=[],n=function n(a){e.push(t.getComponent(a.type,a.uuid)),a.children.forEach((function(t){return n(t)}))};return this.configuration.config.right.forEach((function(t){return n(t)})),e},producer:function(){var t=this,e=[],n=function n(a){e.push(t.getComponent(a.type,a.uuid)),a.children.forEach((function(t){return n(t)}))};return this.configuration.config.left.forEach((function(t){return n(t)})),e}}}),i=r,o=(n("6b7e"),n("2877")),c=n("6544"),l=n.n(c),u=n("7496"),d=n("40dc"),f=n("8336"),v=n("b0af"),p=n("62ad"),h=n("132d"),b=n("adda"),g=n("f6c4"),_=n("0fd9"),m=n("1f4f"),y=n("2fa4"),C=n("2a7f"),w=Object(o["a"])(i,a,s,!1,null,null,null);e["default"]=w.exports;l()(w,{VApp:u["a"],VAppBar:d["a"],VBtn:f["a"],VCard:v["a"],VCol:p["a"],VIcon:h["a"],VImg:b["a"],VMain:g["a"],VRow:_["a"],VSimpleTable:m["a"],VSpacer:y["a"],VToolbarTitle:C["a"]})},"6b7e":function(t,e,n){"use strict";n("c31d")},"6d61":function(t,e,n){"use strict";var a=n("23e7"),s=n("da84"),r=n("e330"),i=n("94ca"),o=n("6eeb"),c=n("f183"),l=n("2266"),u=n("19aa"),d=n("1626"),f=n("861d"),v=n("d039"),p=n("1c7e"),h=n("d44e"),b=n("7156");t.exports=function(t,e,n){var g=-1!==t.indexOf("Map"),_=-1!==t.indexOf("Weak"),m=g?"set":"add",y=s[t],C=y&&y.prototype,w=y,x={},k=function(t){var e=r(C[t]);o(C,t,"add"==t?function(t){return e(this,0===t?0:t),this}:"delete"==t?function(t){return!(_&&!f(t))&&e(this,0===t?0:t)}:"get"==t?function(t){return _&&!f(t)?void 0:e(this,0===t?0:t)}:"has"==t?function(t){return!(_&&!f(t))&&e(this,0===t?0:t)}:function(t,n){return e(this,0===t?0:t,n),this})},j=i(t,!d(y)||!(_||C.forEach&&!v((function(){(new y).entries().next()}))));if(j)w=n.getConstructor(e,t,g,m),c.enable();else if(i(t,!0)){var S=new w,O=S[m](_?{}:-0,1)!=S,$=v((function(){S.has(1)})),E=p((function(t){new y(t)})),V=!_&&v((function(){var t=new y,e=5;while(e--)t[m](e,e);return!t.has(-0)}));E||(w=e((function(t,e){u(t,C);var n=b(new y,t,w);return void 0!=e&&l(e,n[m],{that:n,AS_ENTRIES:g}),n})),w.prototype=C,C.constructor=w),($||V)&&(k("delete"),k("has"),g&&k("get")),(V||O)&&k(m),_&&C.clear&&delete C.clear}return x[t]=w,a({global:!0,forced:w!=y},x),h(w,t),_||n.setStrong(w,t,g),w}},"8b37":function(t,e,n){},c31d:function(t,e,n){}}]);
//# sourceMappingURL=list.cd828413.js.map