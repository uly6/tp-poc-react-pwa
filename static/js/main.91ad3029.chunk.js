(this["webpackJsonptest-01"]=this["webpackJsonptest-01"]||[]).push([[0],{117:function(e,t,n){e.exports=n(141)},122:function(e,t,n){},141:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(12),o=n.n(c),u=(n(122),n(199)),s=n(200),i=n(106),l=n(35),p=n(40),d=n(89),f=n(9),m=n(53),b=n(187),h=n(5),v=n.n(h),E=n(8),g=n(31),y=n(42),x=n(105),O=n(59),w=n(74);function j(e,t,n,a){var r=e+t/60+n/3600;return"S"!==a&&"W"!==a||(r*=-1),r}function k(e){return new Promise((function(t,n){w.getData(e,(function(){var e=w.getAllTags(this);console.log("==>> EXIF ALL",e),t(function(e){var t=e.GPSLatitude,n=e.GPSLatitudeRef,a=e.GPSLongitude,r=e.GPSLongitudeRef;if(!t||!n||!a||!r)return null;var c=t[0],o=t[1],u=t[2],s=n,i=a[0],l=a[1],p=a[2],d=r;return{lat:j(c,o,u,s),lng:j(i,l,p,d)}}(e))}))}))}O.characters("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"),y.a.plugin(x.a),y.a.on("destroyed",(function(e){console.log("==>> POUCHEDB destroyed",e)}));var S,D,I,_,A,C={_id:"default",downloadDisabled:!1,downloadedAt:"",uploadDisabled:!0,uploadedAt:"",deleteDisabled:!0,deletedAt:""};function N(){return S||(S=new y.a("sync-metadata")),S}function L(){return D||(D=new y.a("orders")).createIndex({index:{fields:["createdAt"]}}),D}function P(){return A||(A=new y.a("tasks")).createIndex({index:{fields:["createdAt","orderId"]}}),A}function F(){return I||(I=new y.a("images")).createIndex({index:{fields:["createdAt","orderId"]}}),I}function R(){return _||(_=new y.a("videos")).createIndex({index:{fields:["createdAt","orderId"]}}),_}function W(){return T.apply(this,arguments)}function T(){return(T=Object(E.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N().get("default");case 3:return e.abrupt("return",e.sent);case 6:if(e.prev=6,e.t0=e.catch(0),!e.t0||"not_found"!==e.t0.name){e.next=10;break}return e.abrupt("return",C);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}function B(e){return G.apply(this,arguments)}function G(){return(G=Object(E.a)(v.a.mark((function e(t){var n,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W();case 2:return n=e.sent,a=n&&n._rev?Object(g.a)({},t,{_rev:n._rev}):t,e.next=6,N().put(a);case 6:return e.next=8,N().get("default");case 8:return e.abrupt("return",e.sent);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function U(){return H.apply(this,arguments)}function H(){return(H=Object(E.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L().destroy();case 2:return(t=e.sent).ok&&(D=null),e.next=6,P().destroy();case 6:return(t=e.sent).ok&&(A=null),e.next=10,F().destroy();case 10:return(t=e.sent).ok&&(I=null),e.next=14,R().destroy();case 14:return(t=e.sent).ok&&(_=null),e.abrupt("return",t);case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function $(){return M.apply(this,arguments)}function M(){return(M=Object(E.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L().find({selector:{createdAt:{$gte:null}},sort:["createdAt"]});case 2:return t=e.sent,e.abrupt("return",t.docs);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(e){return z.apply(this,arguments)}function z(){return(z=Object(E.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L().get(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(e){return X.apply(this,arguments)}function X(){return(X=Object(E.a)(v.a.mark((function e(t){var n,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.id&&(n=Object(g.a)({},t,{_id:t.id})),e.next=3,L().put(n);case 3:return a=e.sent,e.abrupt("return",J(a.id));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function q(e){return K.apply(this,arguments)}function K(){return(K=Object(E.a)(v.a.mark((function e(t){var n,a,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F().find({selector:{orderId:t,createdAt:{$gte:null}},sort:["createdAt"]});case 2:return n=e.sent,a=n.docs.map((function(e){return e._id})),e.next=6,F().allDocs({keys:a,include_docs:!0,attachments:!0,binary:!0});case 6:return r=e.sent,e.abrupt("return",r.rows.map((function(e){return e.doc})));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Q(e){return Y.apply(this,arguments)}function Y(){return(Y=Object(E.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F().get(t,{attachments:!0,binary:!0});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Z(e,t){return ee.apply(this,arguments)}function ee(){return(ee=Object(E.a)(v.a.mark((function e(t,n){var a,r,c,o,u;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.name,r=n.type,e.prev=1,!r.includes("image")){e.next=8;break}return e.next=5,k(n);case 5:e.t0=e.sent,e.next=9;break;case 8:e.t0=null;case 9:return c=e.t0,o={_id:O.generate(),orderId:t,name:a,location:c,createdAt:(new Date).toISOString(),_attachments:{file:{content_type:r,data:n}}},e.next=13,F().put(o);case 13:return u=e.sent,e.abrupt("return",Q(u.id));case 17:e.prev=17,e.t1=e.catch(1),console.error(e.t1);case 20:case"end":return e.stop()}}),e,null,[[1,17]])})))).apply(this,arguments)}function te(e){return ne.apply(this,arguments)}function ne(){return(ne=Object(E.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F().get(t._id);case 2:return n=e.sent,e.abrupt("return",F().remove(n));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ae(e){return re.apply(this,arguments)}function re(){return(re=Object(E.a)(v.a.mark((function e(t){var n,a,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R().find({selector:{orderId:t,createdAt:{$gte:null}},sort:["createdAt"]});case 2:return n=e.sent,a=n.docs.map((function(e){return e._id})),e.next=6,R().allDocs({keys:a,include_docs:!0,attachments:!0,binary:!0});case 6:return r=e.sent,e.abrupt("return",r.rows.map((function(e){return e.doc})));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ce(e){return oe.apply(this,arguments)}function oe(){return(oe=Object(E.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R().get(t,{attachments:!0,binary:!0});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ue(e,t){return se.apply(this,arguments)}function se(){return(se=Object(E.a)(v.a.mark((function e(t,n){var a,r,c,o;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.name,r=n.type,e.prev=1,c={_id:O.generate(),orderId:t,name:a,createdAt:(new Date).toISOString(),_attachments:{file:{content_type:r,data:n}}},e.next=5,R().put(c);case 5:return o=e.sent,e.abrupt("return",ce(o.id));case 9:e.prev=9,e.t0=e.catch(1),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})))).apply(this,arguments)}function ie(e){return le.apply(this,arguments)}function le(){return(le=Object(E.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R().get(t._id);case 2:return n=e.sent,e.abrupt("return",R().remove(n));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function pe(e){return de.apply(this,arguments)}function de(){return(de=Object(E.a)(v.a.mark((function e(t){var n,a,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P().find({selector:{orderId:t,createdAt:{$gte:null}},sort:["createdAt"]});case 2:return n=e.sent,a=n.docs.map((function(e){return e._id})),e.next=6,P().allDocs({keys:a,include_docs:!0});case 6:return r=e.sent,e.abrupt("return",r.rows.map((function(e){return e.doc})));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function fe(e){return me.apply(this,arguments)}function me(){return(me=Object(E.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P().get(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function be(e){return he.apply(this,arguments)}function he(){return(he=Object(E.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,P().put(Object(g.a)({},t,{_id:O.generate(),createdAt:(new Date).toISOString(),completed:!1}));case 3:return n=e.sent,e.abrupt("return",fe(n.id));case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function ve(e){return Ee.apply(this,arguments)}function Ee(){return(Ee=Object(E.a)(v.a.mark((function e(t){var n,a,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fe(t._id);case 3:return n=e.sent,a=n._rev,e.next=7,P().put(Object(g.a)({},t,{_rev:a}));case 7:return r=e.sent,e.abrupt("return",fe(r.id));case 11:e.prev=11,e.t0=e.catch(0),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}function ge(e){return ye.apply(this,arguments)}function ye(){return(ye=Object(E.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P().get(t._id);case 2:return n=e.sent,e.abrupt("return",P().remove(n));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var xe=n(149),Oe=n(107),we=n(188),je=n(189),ke=n(190),Se=n(191),De=n(98),Ie=n.n(De),_e=n(37),Ae=n.n(_e),Ce=Object(i.a)((function(e){return{inputFile:{display:"none"},icon:{color:"rgba(255, 255, 255, 0.54)"}}}));function Ne(e){var t=e.orderId,n=Ce(),c=function(e,t){var n=Object(a.useState)(!1),r=Object(f.a)(n,2),c=r[0],o=r[1],u=Object(a.useState)(!1),s=Object(f.a)(u,2),i=s[0],l=s[1],p=Object(a.useState)(t),d=Object(f.a)(p,2),m=d[0],b=d[1],h=Object(a.useState)(0),g=Object(f.a)(h,2),y=g[0],x=g[1];return Object(a.useEffect)((function(){function t(){return(t=Object(E.a)(v.a.mark((function t(){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l(!0),o(!1),t.prev=2,t.t0=b,t.next=6,q(e);case 6:t.t1=t.sent,(0,t.t0)(t.t1),t.next=14;break;case 10:t.prev=10,t.t2=t.catch(2),console.error(t.t2),o(!0);case 14:l(!1);case 15:case"end":return t.stop()}}),t,null,[[2,10]])})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e,y]),[m,i,c,function(){x(Date.now().valueOf())}]}(t,[]),o=Object(f.a)(c,4),u=o[0],s=o[1],i=o[2],l=o[3],p=function(){var e=Object(E.a)(v.a.mark((function e(n){var a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=document.getElementById("input-image-file")).files||!a.files[0]){e.next=5;break}return e.next=4,Z(t,a.files[0]);case 4:l();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(e){return function(){var t=Object(E.a)(v.a.mark((function t(n){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,te(e);case 2:l();case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()};return r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{item:!0,container:!0,xs:12,direction:"row",justify:"flex-end"},r.a.createElement(b.a,{item:!0},r.a.createElement("input",{type:"file",accept:"image/*",id:"input-image-file",className:n.inputFile,onChange:p}),r.a.createElement("label",{htmlFor:"input-image-file"},r.a.createElement(xe.a,{color:"primary",component:"span"},r.a.createElement(Ie.a,null))))),r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(Oe.a,{elevation:1},r.a.createElement(we.a,{cellHeight:180,cols:3},r.a.createElement(je.a,{key:"subheader-image",cols:3,style:{height:"auto"}},r.a.createElement(ke.a,{component:"div",color:"primary",style:{backgroundColor:"#E5E5E5"}},"Images",s||0!==u.length?"":" (No items to display)",s?" (Loading...)":"",i?" (Error loading images)":"")),u&&u.map((function(e){return r.a.createElement(je.a,{key:e._id,cols:1},r.a.createElement("img",{src:URL.createObjectURL(e._attachments.file.data),alt:e.name}),r.a.createElement(Se.a,{title:e.name,subtitle:e.location?"".concat(e.location.lat,", ").concat(e.location.lng):"No location",actionIcon:r.a.createElement(xe.a,{className:n.icon,onClick:d(e)},r.a.createElement(Ae.a,null))}))}))))))}var Le=n(99),Pe=n.n(Le),Fe=Object(i.a)((function(e){return{inputFile:{display:"none"},icon:{color:"rgba(255, 255, 255, 0.54)"}}}));function Re(e){var t=e.orderId,n=Fe(),c=function(e,t){var n=Object(a.useState)(!1),r=Object(f.a)(n,2),c=r[0],o=r[1],u=Object(a.useState)(!1),s=Object(f.a)(u,2),i=s[0],l=s[1],p=Object(a.useState)(t),d=Object(f.a)(p,2),m=d[0],b=d[1],h=Object(a.useState)(0),g=Object(f.a)(h,2),y=g[0],x=g[1];return Object(a.useEffect)((function(){function t(){return(t=Object(E.a)(v.a.mark((function t(){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l(!0),o(!1),t.prev=2,t.t0=b,t.next=6,ae(e);case 6:t.t1=t.sent,(0,t.t0)(t.t1),t.next=14;break;case 10:t.prev=10,t.t2=t.catch(2),console.error(t.t2),o(!0);case 14:l(!1);case 15:case"end":return t.stop()}}),t,null,[[2,10]])})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e,y]),[m,i,c,function(){x(Date.now().valueOf())}]}(t,[]),o=Object(f.a)(c,4),u=o[0],s=o[1],i=o[2],l=o[3],p=function(){var e=Object(E.a)(v.a.mark((function e(n){var a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=document.getElementById("input-video-file")).files||!a.files[0]){e.next=5;break}return e.next=4,ue(t,a.files[0]);case 4:l();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{item:!0,container:!0,xs:12,direction:"row",justify:"flex-end"},r.a.createElement(b.a,{item:!0},r.a.createElement("input",{type:"file",accept:"video/*",id:"input-video-file",className:n.inputFile,onChange:p}),r.a.createElement("label",{htmlFor:"input-video-file"},r.a.createElement(xe.a,{color:"primary",component:"span"},r.a.createElement(Pe.a,null))))),r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(Oe.a,{elevation:1},r.a.createElement(we.a,{cellHeight:180,cols:3},r.a.createElement(je.a,{key:"subheader-video",cols:3,style:{height:"auto"}},r.a.createElement(ke.a,{component:"div",color:"primary",style:{backgroundColor:"#E5E5E5"}},"Videos",s||0!==u.length?"":" (No items to display)",s?" (Loading...)":"",i?" (Error loading videos)":"")),u&&u.map((function(e){return r.a.createElement(je.a,{key:e._id,cols:1},r.a.createElement("video",{height:180,controls:!1,src:URL.createObjectURL(e._attachments.file.data)}),r.a.createElement(Se.a,{title:e.name,actionIcon:r.a.createElement(xe.a,{className:n.icon,onClick:(t=e,function(){var e=Object(E.a)(v.a.mark((function e(n){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ie(t);case 2:l();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},r.a.createElement(Ae.a,null))}));var t}))))))}var We=n(192),Te=n(193),Be=n(194),Ge=n(201),Ue=n(195),He=n(196),$e=n(145),Me=n(142),Je=n(202),ze=n(144),Ve=n(197),Xe=n(100),qe=n.n(Xe);function Ke(e){var t=e.orderId,n=function(e,t){var n=Object(a.useState)(!1),r=Object(f.a)(n,2),c=r[0],o=r[1],u=Object(a.useState)(!1),s=Object(f.a)(u,2),i=s[0],l=s[1],p=Object(a.useState)(t),d=Object(f.a)(p,2),m=d[0],b=d[1],h=Object(a.useState)(0),g=Object(f.a)(h,2),y=g[0],x=g[1];return Object(a.useEffect)((function(){function t(){return(t=Object(E.a)(v.a.mark((function t(){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l(!0),o(!1),t.prev=2,t.t0=b,t.next=6,pe(e);case 6:t.t1=t.sent,(0,t.t0)(t.t1),t.next=14;break;case 10:t.prev=10,t.t2=t.catch(2),console.error(t.t2),o(!0);case 14:l(!1);case 15:case"end":return t.stop()}}),t,null,[[2,10]])})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e,y]),[m,i,c,function(){x(Date.now().valueOf())}]}(t,[]),c=Object(f.a)(n,4),o=c[0],u=c[1],s=c[2],i=c[3],l=Object(a.useState)(!1),p=Object(f.a)(l,2),d=p[0],m=p[1],h=Object(a.useState)(!1),y=Object(f.a)(h,2),x=y[0],O=y[1],w=function(){m(!1)},j=function(){var e=Object(E.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,be({orderId:t,description:x});case 2:w(),i();case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(e){return function(){var t=Object(E.a)(v.a.mark((function t(n){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ve(Object(g.a)({},e,{completed:n.target.checked}));case 2:i();case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},S=function(e){return function(){var t=Object(E.a)(v.a.mark((function t(n){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ge(e);case 2:i();case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()};return r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{item:!0,container:!0,xs:12,direction:"row",justify:"flex-end"},r.a.createElement(b.a,{item:!0},r.a.createElement(xe.a,{color:"primary",component:"span",onClick:function(){m(!0)}},r.a.createElement(qe.a,null)))),r.a.createElement(We.a,{open:d,onClose:w,fullWidth:!0},r.a.createElement(Te.a,{style:{backgroundColor:"#E5E5E5"}},"New Task"),r.a.createElement(Be.a,null,r.a.createElement(Ge.a,{autoFocus:!0,id:"description",label:"Description",fullWidth:!0,onChange:function(e){O(e.target.value)}})),r.a.createElement(Ue.a,null,r.a.createElement(He.a,{onClick:w,color:"primary"},"Cancel"),r.a.createElement(He.a,{onClick:j,color:"primary"},"Add Task"))),r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(Oe.a,{elevation:1},r.a.createElement($e.a,{subheader:r.a.createElement(ke.a,{color:"primary",style:{backgroundColor:"#E5E5E5"}},"Tasks",u||0!==o.length?"":" (No items to display)",u?" (Loading...)":"",s?" (Error loading tasks)":"")},o&&o.map((function(e){return r.a.createElement(Me.a,{key:e._id},r.a.createElement(Je.a,{edge:"start",onChange:k(e),checked:e.completed}),r.a.createElement(ze.a,{primary:e.description}),r.a.createElement(Ve.a,null,r.a.createElement(xe.a,{onClick:S(e)},r.a.createElement(Ae.a,null))))}))))))}function Qe(){var e=Object(p.f)().id,t=function(e,t){var n=Object(a.useState)(!1),r=Object(f.a)(n,2),c=r[0],o=r[1],u=Object(a.useState)(!1),s=Object(f.a)(u,2),i=s[0],l=s[1],p=Object(a.useState)(t),d=Object(f.a)(p,2),m=d[0],b=d[1],h=Object(a.useState)(0),g=Object(f.a)(h,2),y=g[0],x=g[1];return Object(a.useEffect)((function(){function t(){return(t=Object(E.a)(v.a.mark((function t(){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l(!0),o(!1),t.prev=2,t.t0=b,t.next=6,J(e);case 6:t.t1=t.sent,(0,t.t0)(t.t1),t.next=14;break;case 10:t.prev=10,t.t2=t.catch(2),console.error(t.t2),o(!0);case 14:l(!1);case 15:case"end":return t.stop()}}),t,null,[[2,10]])})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e,y]),[m,i,c,function(){x(Date.now().valueOf())}]}(e),n=Object(f.a)(t,3),c=n[0],o=n[1],u=n[2];return r.a.createElement("div",null,u&&r.a.createElement("div",null,"Something went wrong ..."),o&&r.a.createElement("div",null,"Loading..."),!o&&!c&&r.a.createElement(m.a,{variant:"subtitle1"},"Order not found"),c&&r.a.createElement(b.a,{container:!0,spacing:2},r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(m.a,{variant:"h5"},c.description)),r.a.createElement(Ke,{orderId:e}),r.a.createElement(Ne,{orderId:e}),r.a.createElement(Re,{orderId:e})))}var Ye=n(101),Ze=n.n(Ye);function et(){var e=Object(p.g)().url,t=function(e){var t=Object(a.useState)(!1),n=Object(f.a)(t,2),r=n[0],c=n[1],o=Object(a.useState)(!1),u=Object(f.a)(o,2),s=u[0],i=u[1],l=Object(a.useState)(e),p=Object(f.a)(l,2),d=p[0],m=p[1],b=Object(a.useState)(0),h=Object(f.a)(b,2),g=h[0],y=h[1];return Object(a.useEffect)((function(){function e(){return(e=Object(E.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i(!0),c(!1),e.prev=2,e.t0=m,e.next=6,$();case 6:e.t1=e.sent,(0,e.t0)(e.t1),e.next=14;break;case 10:e.prev=10,e.t2=e.catch(2),console.error(e.t2),c(!0);case 14:i(!1);case 15:case"end":return e.stop()}}),e,null,[[2,10]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[g]),[d,s,r,function(){y(Date.now().valueOf())}]}([]),n=Object(f.a)(t,3),c=n[0],o=n[1],u=n[2];return r.a.createElement("div",null,r.a.createElement(b.a,{container:!0,spacing:2},r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(m.a,{variant:"h5"},"Work Orders")),r.a.createElement(b.a,{item:!0,xs:12},u&&r.a.createElement("div",null,"Something went wrong ..."),o&&r.a.createElement("div",null,"Loading..."),!o&&0===c.length&&r.a.createElement(m.a,{variant:"subtitle1"},"No orders to display"),c.length>0&&r.a.createElement(Oe.a,{elevation:1},r.a.createElement($e.a,null,c.map((function(t){return r.a.createElement(Me.a,{key:t._id,button:!0,component:l.b,to:"".concat(e,"/").concat(t._id)},r.a.createElement(ze.a,{primary:t.description,secondary:t.station}),r.a.createElement(Ve.a,null,r.a.createElement(xe.a,{color:"inherit"},r.a.createElement(Ze.a,null))))})))))))}function tt(){var e=Object(p.g)().path;return r.a.createElement(p.c,null,r.a.createElement(p.a,{exact:!0,path:e},r.a.createElement(et,null)),r.a.createElement(p.a,{path:"".concat(e,"/:id")},r.a.createElement(Qe,null)))}var nt=n(198),at=n(103),rt=n.n(at),ct=n(102),ot=n.n(ct);function ut(){return st.apply(this,arguments)}function st(){return(st=Object(E.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://tp-poc-api.herokuapp.com/api/orders");case 2:return t=e.sent,e.abrupt("return",t.json());case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function it(e){return lt.apply(this,arguments)}function lt(){return(lt=Object(E.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://tp-poc-api.herokuapp.com/api/tasks/".concat(t));case 2:return n=e.sent,e.abrupt("return",n.json());case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var pt=Object(i.a)((function(e){return{root:{},button:{marginRight:e.spacing(2)}}}));function dt(){var e=pt(),t=Object(a.useState)(C),n=Object(f.a)(t,2),c=n[0],o=n[1];Object(a.useEffect)((function(){function e(){return(e=Object(E.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,W();case 3:t=e.sent,o(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var u=Object(a.useState)({loading:!1,message:"",err:!1}),s=Object(f.a)(u,2),i=s[0],l=s[1],p=function(){var e=Object(E.a)(v.a.mark((function e(t){var n,a,r,u,s;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l({loading:!0,message:"Loading work orders from server"}),e.prev=1,e.next=4,ut();case 4:if(!((n=e.sent).length>0)){e.next=26;break}return l({message:"Loading tasks for ".concat(n.length," work orders from server")}),l({message:"Saving work orders to local database"}),e.next=10,Promise.all(n.map((function(e){return V(e)})));case 10:return a=e.sent,l({message:"Saving work orders' tasks to local database"}),r=a.map((function(e){return e.id})),e.next=15,Promise.all(r.map((function(e){return it(e)})));case 15:return u=e.sent,e.next=18,Promise.all(u.flat().map((function(e){return be(e)})));case 18:return l({message:"Finishing to save to local database"}),e.next=21,B(Object(g.a)({},c,{downloadDisabled:!0,uploadDisabled:!1,deleteDisabled:!1}));case 21:s=e.sent,o(s),l({loading:!1,message:"Loaded ".concat(a.length," work orders successfuly")}),e.next=27;break;case 26:l({loading:!1,message:"There are no work orders to load from server"});case 27:e.next=33;break;case 29:e.prev=29,e.t0=e.catch(1),console.error(e.t0),l({loading:!1,error:!0,message:"Error loading work orders from server. Please try again"});case 33:case"end":return e.stop()}}),e,null,[[1,29]])})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(E.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,l({loading:!0,message:"Syncing work orders back to server"}),l({message:"Finishing sync back to server"}),e.next=5,B(Object(g.a)({},c,{downloadDisabled:!0,uploadDisabled:!0,deleteDisabled:!1}));case 5:n=e.sent,o(n),l({loading:!1,message:"Work orders synced back to server successfuly"}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),l({loading:!1,error:!0,message:"Error syncing work orders back to server. Please try again"});case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),h=function(){var e=Object(E.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,l({loading:!0,message:"Cleaning local database"}),e.next=4,U();case 4:return l({message:"Finishing the cleaning of the local database"}),e.next=7,B(Object(g.a)({},c,{downloadDisabled:!1,uploadDisabled:!0,deleteDisabled:!0}));case 7:n=e.sent,o(n),l({loading:!1,message:"Local database cleaned successfuly"}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),l({loading:!1,error:!0,message:"Error cleaning the local database. Please try again"});case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:e.root},r.a.createElement(b.a,{container:!0,spacing:2},r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(m.a,{variant:"h5"},"Home")),r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(He.a,{variant:"contained",color:"default",className:e.button,startIcon:r.a.createElement(ot.a,null),onClick:p,disabled:c.downloadDisabled},"Download")),r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(He.a,{variant:"contained",color:"default",className:e.button,startIcon:r.a.createElement(rt.a,null),onClick:d,disabled:c.uploadDisabled},"Upload (Not Working)")),r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(He.a,{variant:"contained",color:"default",className:e.button,startIcon:r.a.createElement(Ae.a,null),onClick:h,disabled:c.deleteDisabled},"Delete")),r.a.createElement(b.a,{item:!0,xs:12},i.loading&&r.a.createElement(nt.a,{size:17}),"  ",i.message&&r.a.createElement("span",null,i.message))))}var ft=Object(i.a)((function(e){return{main:{paddingTop:e.spacing(2)}}}));function mt(){var e=ft();return r.a.createElement(l.a,{basename:"/"},r.a.createElement(u.a,null),r.a.createElement(d.a,null),r.a.createElement(s.a,{maxWidth:"md"},r.a.createElement("main",{className:e.main},r.a.createElement(p.c,null,r.a.createElement(p.a,{exact:!0,path:"/"},r.a.createElement(dt,null)),r.a.createElement(p.a,{path:"/orders"},r.a.createElement(tt,null))))))}var bt=n(104),ht=n.n(bt);o.a.render(r.a.createElement(mt,null),document.getElementById("root")),ht()({brandName:"My Work"})},89:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return h}));var a=n(9),r=n(0),c=n.n(r),o=n(106),u=n(146),s=n(148),i=n(53),l=n(149),p=n(97),d=n.n(p),f=n(152),m=n(90),b=Object(o.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function h(){var t=b(),n=e.browser&&/iPad|iPhone|iPod/.test(navigator.userAgent),o=Object(r.useState)(!1),p=Object(a.a)(o,2),h=p[0],v=p[1],E=function(e){return function(t){(!t||"keydown"!==t.type||"Tab"!==t.key&&"Shift"!==t.key)&&h!==e&&v(e)}};return c.a.createElement("div",{className:t.root},c.a.createElement(u.a,{position:"static"},c.a.createElement(f.a,{anchor:"left",open:h,onOpen:E(!0),onClose:E(!1),disableBackdropTransition:!n,disableDiscovery:n},c.a.createElement(m.a,null)),c.a.createElement(s.a,null,c.a.createElement(l.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"menu",onClick:E(!0)},c.a.createElement(d.a,null)),c.a.createElement(i.a,{variant:"h6",className:t.title},"My Work App"))))}}).call(this,n(82))},90:function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));var a=n(0),r=n.n(a),c=n(142),o=n(143),u=n(144),s=n(106),i=n(145),l=n(95),p=n.n(l),d=n(96),f=n.n(d),m=n(35);function b(e){var t=e.icon,n=e.primary,a=e.to,s=r.a.useMemo((function(){return r.a.forwardRef((function(e,t){return r.a.createElement(m.b,Object.assign({to:a,ref:t},e))}))}),[a]);return r.a.createElement("li",null,r.a.createElement(c.a,{button:!0,component:s},t?r.a.createElement(o.a,null,t):null,r.a.createElement(u.a,{primary:n})))}var h=Object(s.a)((function(e){return{root:{flexGrow:1,width:180}}}));function v(){var e=h();return r.a.createElement("div",{className:e.root},r.a.createElement(i.a,null,r.a.createElement(b,{to:"/",primary:"Home",icon:r.a.createElement(p.a,null)}),r.a.createElement(b,{to:"/orders",primary:"Orders",icon:r.a.createElement(f.a,null)})))}}},[[117,1,2]]]);
//# sourceMappingURL=main.91ad3029.chunk.js.map