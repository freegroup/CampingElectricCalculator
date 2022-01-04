(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["overview"],{2226:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",[i("v-app-bar",{attrs:{app:"",color:"#E39623",dark:"","shrink-on-scroll":"",prominent:"",src:a("ec24"),height:"300","fade-img-on-scroll":""},scopedSlots:t._u([null],null,!0)},[i("v-app-bar-title",{staticClass:"text-no-wrap app-title"},[t._v("Camping Electric Calculator")]),i("v-spacer"),i("v-spacer"),i("v-btn",{attrs:{icon:"",href:"https://www.youtube.com/channel/UC1WhvBxYkiGQlAO6YR7uEQQ",target:"_blank"}},[i("v-icon",{attrs:{"x-large":""}},[t._v("mdi-youtube")])],1),i("v-btn",{attrs:{icon:"",href:"https://github.com/freegroup/CampingElectricCalculator",target:"_blank"}},[i("v-icon",{attrs:{"x-large":""}},[t._v("mdi-github")])],1)],1),i("v-main",[i("v-container",[i("h1",[t._v("How to wire a Campervan")]),i("h3",[t._v("How to size your electrical system")]),i("v-container",[t._v(" Wiring and installing the electrical system is probably one of the most complicated and daunting tasks in a van conversion. I've spent a lot of time reading blog posts, forum comments, and watching YouTube videos to see if there are any really good how-to guides out there. In fact, there are a lot. ")]),i("v-container",[t._v(" But all of them explains how to figure it all out by hand or by exel sheets. "),i("b",[t._v("But why calculate everything again and again by hand if you can use software for it")]),t._v(". I'm not really a fan of excel lists though. That's why I built a tool with which you can simply model your electrical system in a MindMap and in the background, it calculates whether the components harmonize and fit. ")]),i("v-container",[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",[i("v-card",{staticClass:"mx-auto",attrs:{"max-width":"350"}},[i("v-img",{attrs:{src:a("2d50"),height:"200px"}}),i("v-card-title",[t._v("Get the correct sizing")]),i("v-card-subtitle",{staticStyle:{"min-height":"100px"}},[t._v("Connect your components in a mindmap fashion and check if the components are well dimensioned.")]),i("v-card-actions",[i("v-btn",{attrs:{color:"orange lighten-2",to:{path:"/map"},text:""}},[t._v("Start")]),i("v-spacer")],1)],1)],1),i("v-flex",[i("v-card",{staticClass:"mx-auto",attrs:{"max-width":"350"}},[i("v-img",{attrs:{src:a("b86d"),height:"200px"}}),i("v-card-title",[t._v("Wire size vs. Ampere")]),i("v-card-subtitle",{staticStyle:{"min-height":"100px"}},[t._v(" You want to lay electricity for consumers or even install a second battery? Then you should know exactly which cable cross-section your cables should have! ")]),i("v-card-actions",[i("v-btn",{attrs:{color:"orange lighten-2",to:{path:"/diameter"},text:""}},[t._v("Start")]),i("v-spacer")],1)],1)],1)],1)],1),i("h3",[t._v("Disclaimer")]),i("v-container",[t._v(" But as it is with software and the dear people....they can be faulty. So see the tool here as a support and not as the absolute truth. Better calculate again. ")]),i("v-container",{staticStyle:{height:"1000px"}})],1)],1),i("v-footer",{attrs:{app:""}},[t._v(" Bugreports are always welcome and the errors will of course be fixed. "),i("v-btn",{attrs:{icon:"",href:"https://github.com/freegroup/CampingElectricCalculator/issues",target:"_blank"}},[i("v-icon",[t._v("mdi-github")])],1)],1)],1)},n=[],o={name:"Overview",components:{}},s=o,r=(a("9bde"),a("2877")),c=a("6544"),l=a.n(c),d=a("7496"),h=a("40dc"),u=a("3206"),p=a("80d2"),f=a("0246"),v=Object(u["a"])("VAppBar","v-app-bar-title","v-app-bar"),b=v.extend().extend({name:"v-app-bar-title",data:function(){return{contentWidth:0,left:0,width:0}},watch:{"$vuetify.breakpoint.width":"updateDimensions"},computed:{styles:function(){if(!this.contentWidth)return{};var t=this.width,e=this.contentWidth,a=Object(f["easeInOutCubic"])(Math.min(1,1.5*this.VAppBar.scrollRatio));return{width:Object(p["g"])(t+(e-t)*a),visibility:this.VAppBar.scrollRatio?"visible":"hidden"}}},mounted:function(){this.updateDimensions()},methods:{updateDimensions:function(){var t=this.$refs.placeholder.getBoundingClientRect();this.width=t.width,this.left=t.left,this.contentWidth=this.$refs.content.scrollWidth}},render:function(t){return t("div",{class:"v-toolbar__title v-app-bar-title"},[t("div",{class:"v-app-bar-title__content",style:this.styles,ref:"content"},[this.$slots.default]),t("div",{class:"v-app-bar-title__placeholder",style:{visibility:this.VAppBar.scrollRatio?"hidden":"visible"},ref:"placeholder"},[this.$slots.default])])}}),m=a("8336"),g=a("b0af"),y=a("99d9"),w=(a("4de4"),a("d3b7"),a("b64b"),a("2ca0"),a("99af"),a("20f6"),a("4b85"),a("498a"),a("a15b"),a("2b0e"));function _(t){return w["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var i=a.props,n=a.data,o=a.children;n.staticClass="".concat(t," ").concat(n.staticClass||"").trim();var s=n.attrs;if(s){n.attrs={};var r=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}));r.length&&(n.staticClass+=" ".concat(r.join(" ")))}return i.id&&(n.domProps=n.domProps||{},n.domProps.id=i.id),e(i.tag,n,o)}})}var x=a("d9f7"),C=_("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,i=e.props,n=e.data,o=e.children,s=n.attrs;return s&&(n.attrs={},a=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}))),i.id&&(n.domProps=n.domProps||{},n.domProps.id=i.id),t(i.tag,Object(x["a"])(n,{staticClass:"container",class:Array({"container--fluid":i.fluid}).concat(a||[])}),o)}}),O=_("flex"),j=a("5530"),B=(a("a9e3"),a("c7cd"),a("b5b6"),a("8dd9")),V=a("3a66"),k=a("d10f"),S=a("58df"),A=Object(S["a"])(B["a"],Object(V["a"])("footer",["height","inset"]),k["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return Object(j["a"])(Object(j["a"])({},B["a"].options.computed.classes.call(this)),{},{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return Object(j["a"])(Object(j["a"])({},B["a"].options.computed.styles.call(this)),{},{height:isNaN(t)?t:Object(p["g"])(t),left:Object(p["g"])(this.computedLeft),right:Object(p["g"])(this.computedRight),bottom:Object(p["g"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var e=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,e,this.$slots.default)}}),$=a("132d"),P=a("adda"),W=_("layout"),I=a("f6c4"),R=a("2fa4"),E=Object(r["a"])(s,i,n,!1,null,null,null);e["default"]=E.exports;l()(E,{VApp:d["a"],VAppBar:h["a"],VAppBarTitle:b,VBtn:m["a"],VCard:g["a"],VCardActions:y["a"],VCardSubtitle:y["b"],VCardTitle:y["d"],VContainer:C,VFlex:O,VFooter:A,VIcon:$["a"],VImg:P["a"],VLayout:W,VMain:I["a"],VSpacer:R["a"]})},"2d50":function(t,e,a){t.exports=a.p+"img/mindmap.b4f1ffef.png"},"99d9":function(t,e,a){"use strict";a.d(e,"a",(function(){return o})),a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return r})),a.d(e,"d",(function(){return c}));var i=a("b0af"),n=a("80d2"),o=Object(n["h"])("v-card__actions"),s=Object(n["h"])("v-card__subtitle"),r=Object(n["h"])("v-card__text"),c=Object(n["h"])("v-card__title");i["a"]},"9bde":function(t,e,a){"use strict";a("b23c")},b23c:function(t,e,a){},b5b6:function(t,e,a){},b86d:function(t,e,a){t.exports=a.p+"img/wirediameter.08c9f9af.png"},ec24:function(t,e,a){t.exports=a.p+"img/banner.a279e643.png"}}]);
//# sourceMappingURL=overview.9ca60cef.js.map