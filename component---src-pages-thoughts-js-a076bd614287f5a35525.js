"use strict";(self.webpackChunkseifrajhi_github_io=self.webpackChunkseifrajhi_github_io||[]).push([[673],{8937:function(e,a,t){var i=t(6540),s=t(8154),n=t(2360);a.A=e=>{let{crumbs:a=[]}=e;const{siteUrl:t}=(0,n.I)(),l=[{"@type":"ListItem",position:1,name:"Home",item:t+"/"}];a.forEach(((e,a)=>{const[[i,s]]=Object.entries(e);l.push({"@type":"ListItem",position:a+2,name:s,item:""+t+i})}));const r={"@context":"http://schema.org","@type":"BreadcrumbList",itemListElement:l};return i.createElement(s.A,null,i.createElement("script",{type:"application/ld+json"},JSON.stringify(r)))}},1662:function(e,a,t){var i=t(6540),s=t(2532);a.A=()=>i.createElement(s.S,{className:"logo-img",src:"../../images/homepage/saifeddine-rajhi.jpeg",width:150,quality:80,formats:["auto","webp","avif"],alt:"Saifeddine Rajhi",__imageData:t(6989)})},4642:function(e,a,t){var i=t(6540),s=t(1662);a.A=()=>i.createElement("div",{className:"thought-author-wrapper"},i.createElement("div",{className:"logo"},i.createElement("div",{className:"avatar"},i.createElement(s.A,null))),i.createElement("br",null),i.createElement("div",{className:"name"},"• Saifeddine Rajhi •"),i.createElement("p",{className:"thought-section-descr"},"My thoughts, pieces of advice and personal & professional life experience ",i.createElement("br",null),"that will help you to ",i.createElement("strong",null,"overcome")," your life struggles"))},4088:function(e,a,t){var i=t(6540),s=t(4794),n=t(2532),l=t(1500),r=t(2261),c=t(3911);a.A=e=>{const{id:a,title:t,url:d,timeToRead:m,publishedHumanDate:o,publishedFullDate:h,excerpt:u,cover:p,keywords:f}=e,[g,b]=(0,r.Ay)(c.P.THOUGHT),E=g[a],v=E&&E.status==r.VX.FINISHED,w=(e=>{const a=new Date(e),t=new Date;return Math.abs(a.getTime()-t.getTime())/864e5<30})(h),y=(0,i.useRef)(null);return(0,i.useEffect)((()=>{const e=y.current;l.Ay.fromTo(e,{scale:1},{scale:1.4,duration:.5,paused:!0,ease:"steps(12)",onReverseComplete:()=>{l.Ay.set(e,{scale:1})}});const a=()=>l.Ay.to(e,{scale:1.05}),t=()=>l.Ay.to(e,{scale:1});return e&&(e.addEventListener("mouseenter",a),e.addEventListener("mouseleave",t)),()=>{e.removeEventListener("mouseenter",a),e.removeEventListener("mouseleave",t)}}),[]),i.createElement("article",{className:"thought-item",ref:y},i.createElement(s.Link,{className:"thought-header",to:d},i.createElement("div",{className:"cover-filter"},i.createElement(n.G,{className:"cover",image:p,alt:t})),w?i.createElement("div",{className:"new-badge",title:"Published less than a month ago"},"new"):""),i.createElement("div",{className:"article-details"},i.createElement("h2",null,i.createElement(s.Link,{to:d},t)),i.createElement("div",{className:"thought-details"},i.createElement("time",{className:"thought-createdat",dateTime:h},o),i.createElement("span",null," • "),i.createElement("span",{className:"thought-time2read"},m,m>1?"mins":"min"," read"),v?"":i.createElement(i.Fragment,null,i.createElement("span",null," • "),i.createElement("span",{className:"unread-badge"},(0,r.ps)(null==E?void 0:E.status)))),i.createElement("p",{className:"thought-digest"},u),i.createElement("ul",{className:"thought-tags"},f.map((e=>i.createElement("li",{key:d+e},e))))))}},6201:function(e,a,t){t.r(a);var i=t(7387),s=t(6540),n=t(8913),l=t(8504),r=t(8723),c=t(4642),d=t(7218),m=t(4088),o=t(8937),h=t(7212);let u=function(e){function a(){return e.apply(this,arguments)||this}return(0,i.A)(a,e),a.prototype.render=function(){const{data:{socialImage:e,allMarkdownRemark:{edges:a}}}=this.props;return s.createElement(n.A,null,s.createElement(l.A,{title:"Thoughts",pagePath:"/thoughts/",className:"thoughts-list-page",description:"Thoughts and experience that will help you to go through your life in the very best way",imagePath:e.publicURL,keywords:["thoughts","opinion","life exploring","psychology","Saifeddine Rajhi thoughts","Saifeddine Rajhi thoughts","life","people","management"],meta:[]}),s.createElement("div",{className:"thoughts-wrapper"},s.createElement("h1",{className:"thoughts-title"},"Thoughts"),s.createElement("aside",{className:"thought-sidebar"},s.createElement(c.A,null),s.createElement(r.A,{space:"thoughts"}),s.createElement("div",{className:"theme-switcher"},s.createElement(d.A,null))),s.createElement("main",{className:"thoughts-list"},a.map((e=>{let{node:{timeToRead:a,frontmatter:{id:t,title:i,path:n,humanDate:l,fullDate:r,excerpt:c,keywords:d,cover:{childImageSharp:{gatsbyImageData:o}}}}}=e;return s.createElement(m.A,{id:t,key:t,title:i,url:n,timeToRead:a,publishedHumanDate:l,publishedFullDate:r,excerpt:c,cover:o,keywords:d})}))),s.createElement("div",{className:"clearfix"})),s.createElement(h.A,null),s.createElement(o.A,{crumbs:[{"/thoughts/":"Thoughts"}]}))},a}(s.Component);a.default=u},6989:function(e){e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/a1a51351bdf7de55eaaa515eb15ce2da/885b3/saifeddine-rajhi.png","srcSet":"/static/a1a51351bdf7de55eaaa515eb15ce2da/9c61d/saifeddine-rajhi.png 38w,\\n/static/a1a51351bdf7de55eaaa515eb15ce2da/d405f/saifeddine-rajhi.png 75w,\\n/static/a1a51351bdf7de55eaaa515eb15ce2da/885b3/saifeddine-rajhi.png 150w,\\n/static/a1a51351bdf7de55eaaa515eb15ce2da/4aeea/saifeddine-rajhi.png 300w","sizes":"(min-width: 150px) 150px, 100vw"},"sources":[{"srcSet":"/static/a1a51351bdf7de55eaaa515eb15ce2da/2e0ee/saifeddine-rajhi.avif 38w,\\n/static/a1a51351bdf7de55eaaa515eb15ce2da/81dba/saifeddine-rajhi.avif 75w,\\n/static/a1a51351bdf7de55eaaa515eb15ce2da/20c67/saifeddine-rajhi.avif 150w,\\n/static/a1a51351bdf7de55eaaa515eb15ce2da/94b9f/saifeddine-rajhi.avif 300w","type":"image/avif","sizes":"(min-width: 150px) 150px, 100vw"},{"srcSet":"/static/a1a51351bdf7de55eaaa515eb15ce2da/92aab/saifeddine-rajhi.webp 38w,\\n/static/a1a51351bdf7de55eaaa515eb15ce2da/359cc/saifeddine-rajhi.webp 75w,\\n/static/a1a51351bdf7de55eaaa515eb15ce2da/aac41/saifeddine-rajhi.webp 150w,\\n/static/a1a51351bdf7de55eaaa515eb15ce2da/a15c6/saifeddine-rajhi.webp 300w","type":"image/webp","sizes":"(min-width: 150px) 150px, 100vw"}]},"width":150,"height":174}')}}]);
//# sourceMappingURL=component---src-pages-thoughts-js-a076bd614287f5a35525.js.map