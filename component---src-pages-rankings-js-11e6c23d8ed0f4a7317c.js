(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"6VaU":function(e,t,a){"use strict";var n=a("XKFU"),r=a("xF/b"),i=a("S/j/"),l=a("ne8i"),o=a("2OiF"),c=a("zRwo");n(n.P,"Array",{flatMap:function(e){var t,a,n=i(this);return o(e),t=l(n.length),a=c(n,0),r(a,n,n,t,0,1,e,arguments[1]),a}}),a("nGyu")("flatMap")},N6xp:function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return m}));a("f3/d"),a("Z2Ku"),a("L9s1"),a("Vd3H"),a("91GP"),a("6VaU");var n=a("q1tI"),r=a.n(n),i=a("Bl7J"),l=a("vrFN"),o=a("7vrA"),c=a("Zcpj"),u=a("vOnD"),p=a("wd/R"),f=a.n(p),s=a("Al62"),d=Object(u.a)(o.a).withConfig({displayName:"rankings__StyledContainer",componentId:"yw69b7-0"})(["padding-top:20px;display:flex;flex-direction:column;flex-wrap:wrap;justify-content:space-around;max-width:900px;"]),m="3092157214";t.default=function(e){var t=e.data.allChallongeTournament.group.flatMap((function(e){return Object.assign({},e.nodes[0],{game:e.game})}));t.sort((function(e,t){return f()(t.order_by).diff(e.order_by)}));var a="\n        Bristols top 3 fighting game players, check out our players for all of our games.\n    ";return r.a.createElement(i.a,null,r.a.createElement(l.a,{title:"Rankings",description:a}),r.a.createElement(d,null,r.a.createElement(c.a,{bg:"dark",text:"light",style:{margin:"20px 0"}},r.a.createElement(c.a.Body,null,r.a.createElement(c.a.Title,null,"Rankings"),r.a.createElement(c.a.Text,null,a))),t.map((function(e){var t=e.participants.filter((function(e){var t=e.participant;return[1,2,3].includes(t.final_rank)}));return t.sort((function(e,t){return e.participant.final_rank-t.participant.final_rank})),r.a.createElement(c.a,{bg:"dark",text:"light",style:{margin:"20px 0"}},r.a.createElement(c.a.Header,{text:"light"},e.game),r.a.createElement(c.a.Body,null,"                        ",t.map((function(e){var t=e.participant;return r.a.createElement("div",null,Object(s.a)(t.final_rank)," ",t.name)}))),r.a.createElement(c.a.Footer,{text:"light"},"last updated: ",e.created_at))}))))}},"xF/b":function(e,t,a){"use strict";var n=a("EWmC"),r=a("0/R4"),i=a("ne8i"),l=a("m0Pp"),o=a("K0xU")("isConcatSpreadable");e.exports=function e(t,a,c,u,p,f,s,d){for(var m,g,x=p,y=0,v=!!s&&l(s,d,3);y<u;){if(y in c){if(m=v?v(c[y],y,a):c[y],g=!1,r(m)&&(g=void 0!==(g=m[o])?!!g:n(m)),g&&f>0)x=e(t,a,m,i(m.length),x,f-1)-1;else{if(x>=9007199254740991)throw TypeError();t[x]=m}x++}y++}return x}}}]);
//# sourceMappingURL=component---src-pages-rankings-js-11e6c23d8ed0f4a7317c.js.map