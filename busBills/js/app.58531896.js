(function(e){function t(t){for(var a,r,s=t[0],i=t[1],c=t[2],l=0,d=[];l<s.length;l++)r=s[l],o[r]&&d.push(o[r][0]),o[r]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);h&&h(t);while(d.length)d.shift()();return u.push.apply(u,c||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],a=!0,r=1;r<n.length;r++){var s=n[r];0!==o[s]&&(a=!1)}a&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={app:0},o={app:0},u=[];function s(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-02eb4bba":"d247337e","chunk-031305e8":"2e7371d7","chunk-0d14d3cc":"825f0362","chunk-31375d85":"5d819337","chunk-6204c630":"f5cc1570","chunk-717b12f3":"19542933","chunk-cdd46b74":"655f221b","chunk-30216d91":"542e0b34"}[e]+".js"}function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-02eb4bba":1,"chunk-031305e8":1,"chunk-0d14d3cc":1,"chunk-31375d85":1,"chunk-6204c630":1,"chunk-717b12f3":1,"chunk-cdd46b74":1,"chunk-30216d91":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-02eb4bba":"b5fc0cc7","chunk-031305e8":"161f1810","chunk-0d14d3cc":"6394e06e","chunk-31375d85":"7e921665","chunk-6204c630":"9e38ed4b","chunk-717b12f3":"a894d8fc","chunk-cdd46b74":"05a6735b","chunk-30216d91":"347dfa75"}[e]+".css",o=i.p+a,u=document.getElementsByTagName("link"),s=0;s<u.length;s++){var c=u[s],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===a||l===o))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){c=d[s],l=c.getAttribute("data-href");if(l===a||l===o)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var a=t&&t.target&&t.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=a,delete r[e],h.parentNode.removeChild(h),n(u)},h.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(h)}).then(function(){r[e]=0}));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var u=new Promise(function(t,n){a=o[e]=[t,n]});t.push(a[2]=u);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=s(e),c=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,u=new Error("Loading chunk "+e+" failed.\n("+a+": "+r+")");u.type=a,u.request=r,n[1](u)}o[e]=void 0}};var d=setTimeout(function(){c({type:"timeout",target:l})},12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/busBills/",i.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var h=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0c73":function(e,t,n){},"164e":function(e,t){e.exports=echarts},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("8bbf"),r=n.n(a),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"route-wrapper"},[n("router-view")],1)])},u=[],s={},i=s,c=(n("7c55"),n("2877")),l=Object(c["a"])(i,o,u,!1,null,null,null),d=l.exports,h=(n("28a5"),n("5880")),p=n.n(h);r.a.use(p.a);var f=new p.a.Store({strict:!1,state:{carNum:["D52759","D52760","D52639","F63735","F63491","F63817"],searchYear:(new Date).getFullYear(),searchMonth:(new Date).getMonth()+1,siteHF:{hostName:"https://127.0.0.1",getData:"/busBills/api/getData",setData:"/busBillsCalculator/setData",calData:"/busBillsCalculator/calData",rootHostName:"https://www.hfullest.com"},dealedData:{commonData:{dailyData:{},summaryData:{},threeData:{}},specialData:{}},curMonLength:function(){var e=new Date,t=e.getFullYear(),n=e.getMonth();return new Date(t,n,0).getDate()}(),authorized:!1,arithmetic:"deductFirst"},getters:{carName:function(e){var t=e.carNum,n=t.map(function(e){return"D"===e[0]?"鄂"+e:"F"===e[0]?"湘"+e:""});return n},yearRange:function(){var e=2016,t=new Array(20).join(",").split(",").map(function(t,n){return e+n});return t},monthRange:function(){var e=1,t=new Array(12).join(",").split(",").map(function(t,n){return e+n});return t},pageRange:function(e){for(var t=[],n=e.curMonLength,a=1;a<=n;a+=3)n-a<3?t.push(a+(n===a?"":"-"+n)):t.push(a+"-"+(a+2));return t}},mutations:{refreshDealedData:function(e,t){e.dealedData="init"==t?{commonData:{dailyData:{},summaryData:{},threeData:{}},specialData:{}}:t},changeMonLength:function(e,t){e.curMonLength=new Date(t.year,t.month,0).getDate()},changeAuthorizedState:function(e,t){e.authorized=t},searchYear:function(e,t){e.searchYear=t},searchMonth:function(e,t){e.searchMonth=t},changeArithmetic:function(e,t){e.arithmetic=t}},actions:{},modules:{FinalTable:{namespaced:!0,state:{isFixed:!1},mutations:{changeIsFixed:function(e,t){e.isFixed=t}}}}}),m=n("6389"),b=n.n(m),g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-page"},[n("h1",{staticClass:"title"},[e._v("华调线账单汇总系统")]),n("div",{staticClass:"login-box"},[n("div",{staticClass:"username input-line"},[n("label",{class:{valid:""==e.username},attrs:{for:"username"}},[e._v("用户名：")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],class:{nothing:e.isNothing||e.noUsername},attrs:{id:"username",type:"text",autofocus:""},domProps:{value:e.username},on:{blur:e.handleUserBlur,keypress:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleEnter(t)},input:function(t){t.target.composing||(e.username=t.target.value)}}})]),n("div",{staticClass:"password input-line"},[n("label",{class:{valid:""==e.password},attrs:{for:"password"}},[e._v("密 码：")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],class:{nothing:e.isNothing||e.noPassword},attrs:{id:"password",type:"password"},domProps:{value:e.password},on:{blur:e.handlePwdBlur,keypress:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleEnter(t)},input:function(t){t.target.composing||(e.password=t.target.value)}}})]),n("div",{staticClass:"btn-group"},[n("button",{staticClass:"btn-login",class:{down:e.isDown},on:{click:e.submit,mousedown:e.handleDown,mouseup:e.handleUp,keypress:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleEnter(t)}}},[e._v("立即登录")])])]),e.showGenModal?n("pop-dialog",{attrs:{showGenModal:e.showGenModal,type:"generalModal",tips:e.modalTips,tipsIcon:e.modalTipsIcon,msg:e.modalMsg},on:{"update:showGenModal":function(t){e.showGenModal=t},"update:show-gen-modal":function(t){e.showGenModal=t}}}):e._e()],1)},w=[],y=(n("8e6e"),n("ac6a"),n("456d"),n("bd86")),v=n("4328"),k=n.n(v);function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(n,!0).forEach(function(t){Object(y["a"])(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var j={data:function(){return{username:"",password:"",isDown:!1,isNothing:!1,noUsername:!1,noPassword:!1,showGenModal:!1,modalTips:"",modalTipsIcon:"",modalMsg:""}},computed:O({},Object(h["mapState"])(["authorized","siteHF"])),components:{popDialog:function(){return n.e("chunk-031305e8").then(n.bind(null,"6ee0"))}},methods:{submit:function(){var e=this;if(this.username&&this.password){if("127.0.0.1"==location.hostname&&"Danker"==this.username&&"123456"==this.password)return void this.jumpToHome();var t=k.a.stringify({data:this.comMethods.encrypt({username:this.username,password:this.password})});this.$ajax.defaults.withCredentials=!0,this.$ajax.post("/busBills/login",t).then(function(t){"ok"==t.data.status?e.jumpToHome():(e.modalTips="温馨提示",e.modalMsg="用户名或密码错误！",e.showGenModal=!0)}),this.$ajax.defaults.withCredentials=!1}else this.isNothing=!0},handleUserBlur:function(){this.username?this.noUsername=!1:this.noUsername=!0},handlePwdBlur:function(){this.password?this.noPassword=!1:this.noPassword=!0},handleDown:function(){this.isDown=!0},handleUp:function(){this.isDown=!1},handleEnter:function(){this.submit()},jumpToHome:function(){this.$store.commit("changeAuthorizedState",!0),this.$router.push("/home")}}},x=j,M=(n("c34e"),Object(c["a"])(x,g,w,!1,null,"015e7028",null)),P=M.exports;r.a.use(b.a);var E=new b.a({mode:"history",base:"/busBills/",routes:[{path:"/login",name:"login",component:P},{path:"/home",name:"home",component:function(){return n.e("chunk-31375d85").then(n.bind(null,"bb51"))},redirect:"/home/inputAmount",children:[{path:"inputAmount",name:"input",meta:{requireAuth:!0},component:function(){return n.e("chunk-cdd46b74").then(n.bind(null,"4dff"))}},{path:"dailyAmount",name:"daily",meta:{requireAuth:!0},component:function(){return n.e("chunk-0d14d3cc").then(n.bind(null,"2565"))}},{path:"threeDayAmount",name:"threeday",meta:{requireAuth:!0},component:function(){return n.e("chunk-717b12f3").then(n.bind(null,"d8bb"))}},{path:"finalAmount",name:"final",meta:{requireAuth:!0},component:function(){return n.e("chunk-02eb4bba").then(n.bind(null,"52dc"))}}]},{path:"/NotFound",name:"notFound",component:function(){return n.e("chunk-6204c630").then(n.bind(null,"9703"))}},{path:"*",redirect:function(e){return"/"==e.path?f.state.authorized?"/home":"/login":"/NotFound"}}]}),A=n("cebe"),C=n.n(A),N=n("164e"),_=n.n(N),S=n("5f72"),T=n.n(S),F=(n("0fae"),n("a481"),{encrypt:function(e){return escape(JSON.stringify(e)).replace(/%/g,"#")},unEncrypt:function(e){if("string"!==typeof e)return e;var t=e;try{t=JSON.parse(unescape(e.replace(/#/g,"%")))}catch(n){}return t}});r.a.prototype.$ajax=C.a,r.a.prototype.comMethods=F,r.a.prototype.$echarts=_.a,r.a.config.productionTip=!1,r.a.use(T.a),E.beforeEach(function(e,t,n){e.matched.some(function(e){return e.meta.requireAuth})?f.state.authorized?n():(C.a.defaults.withCredentials=!0,C.a.get("/busBills/isAuthorized").then(function(t){"ok"==t.data.status?(f.commit("changeAuthorizedState",!0),n()):n({path:"/login",params:{redirect:e.fullPath}})}),C.a.defaults.withCredentials=!1):n()}),new r.a({router:E,store:f,render:function(e){return e(d)}}).$mount("#app")},5880:function(e,t){e.exports=Vuex},"5c48":function(e,t,n){},"5f72":function(e,t){e.exports=ELEMENT},6389:function(e,t){e.exports=VueRouter},"7c55":function(e,t,n){"use strict";var a=n("5c48"),r=n.n(a);r.a},"8bbf":function(e,t){e.exports=Vue},c34e:function(e,t,n){"use strict";var a=n("0c73"),r=n.n(a);r.a},cebe:function(e,t){e.exports=axios}});