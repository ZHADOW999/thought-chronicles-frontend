"use strict";(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[687],{6328:(e,s,t)=>{t.d(s,{A:()=>c});t(9950);var r=t(5481),a=t(2074),o=t(94),l=t(7965),n=t(4903),i=t(58),d=t(4414);const c=()=>(0,d.jsx)("div",{className:" bg-bg-color-light1 dark:bg-gray-800 px-4 md:hidden fixed bottom-0 left-0 right-0 z-[1000] h-16 ",children:(0,d.jsx)("div",{className:"bg-bg-color-light1 dark:bg-gray-800 px-4 md:hidden fixed bottom-0 left-0 right-0 z-[1000] h-16",children:(0,d.jsxs)("div",{className:"flex items-center justify-between h-16",children:[(0,d.jsx)(a.N_,{to:"/",children:(0,d.jsxs)(o.A,{className:"flex-shrink-0 p-2 text-black flex flex-col",sx:{color:"black",svg:{fontSize:{xs:"1rem",sm:"1.5rem"}}},children:[(0,d.jsx)(l.A,{}),(0,d.jsx)("p",{className:"text-1",children:"Home"})]})}),(0,d.jsx)(a.N_,{to:"/library",children:(0,d.jsxs)(o.A,{className:"flex-shrink-0 p-2 text-white flex flex-col",sx:{color:"black",svg:{fontSize:{xs:"1rem",sm:"1.5rem"}}},children:[(0,d.jsx)(i.A,{}),(0,d.jsx)("p",{className:"text-1",children:"Bookmarks"})]})}),(0,d.jsx)(a.N_,{to:"/stories",children:(0,d.jsxs)(o.A,{className:"items-center p-2 flex-shrink-0 flex flex-col",sx:{color:"black"},children:[(0,d.jsx)(n.M3v,{className:"w-5 h-5 sm:w-7 sm:h-7"}),(0,d.jsx)("p",{className:"text-1",children:"Stories"})]})}),(0,d.jsx)(a.N_,{to:"",children:(0,d.jsxs)(o.A,{className:"flex-shrink-0 p-2 text-white flex flex-col",sx:{color:"black",svg:{fontSize:{xs:"1rem",sm:"1.5rem"}}},children:[(0,d.jsx)(r.A,{}),(0,d.jsx)("p",{className:"text-1",children:"Updates"})]})})]})})})},1880:(e,s,t)=>{t.d(s,{A:()=>x});var r=t(2074),a=t(9950),o=t(7539),l=t(4959),n=t(8553),i=t(7082),d=t(6001),c=t(4414);const x=e=>{let{blogs:s,isLoading:t,error:x}=e;const[m,h]=(0,a.useState)(null),[g,u]=(0,a.useState)(null),[p,f]=(0,a.useState)(null),b=s?[...s].sort(((e,s)=>new Date(s.Blog.created_at)-new Date(e.Blog.created_at))):[],j=e=>{const s=new Date(e).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}).toLowerCase();return s.charAt(0).toUpperCase()+s.slice(1)};return(0,c.jsxs)(c.Fragment,{children:[t?(0,c.jsx)("div",{children:[...Array(5)].map(((e,s)=>(0,c.jsx)(d.A,{},s)))}):"",b.map((e=>{const{images:s,sanitizedContent:t}=(e=>{const s=(new DOMParser).parseFromString(e,"text/html"),t=Array.from(s.querySelectorAll("img")).map((e=>e.src));return s.querySelectorAll("img").forEach((e=>e.remove())),{images:t,sanitizedContent:s.body.innerHTML}})(e.Blog.body),a=i.A.sanitize(t).slice(0,120);return(0,c.jsx)("div",{className:" mt-5 bg-white shadow-md p-2 sm:p-5 ",children:(0,c.jsx)("div",{className:"items-center flex flex-col md:flex-row w-full justify-between",children:(0,c.jsxs)("div",{className:"items-center flex flex-row w-full justify-between",children:[(0,c.jsxs)("div",{className:"space-y-5 "+(s.length>0?"md:[40%] w-[65%]":"md:w-[80%] w-[100%]"),children:[(0,c.jsxs)("div",{className:"w-full mb-2 md:mb-0 flex flex-row justify-start self-start h-auto",children:[(0,c.jsx)(r.N_,{to:`/profile/${e.Blog.owner_id}`,children:(0,c.jsx)(o.A,{size:40,userId:e.Blog.owner_id,altText:`User ${e.Blog.owner_id}'s Profile Picture`})}),(0,c.jsxs)("div",{className:"w-full ml-5 flex-row gap-10 flex md:mt-0",children:[(0,c.jsx)(r.N_,{to:`/profile/${e.Blog.owner_id}`,className:"font-roboto-medium grid place-items-center cursor-pointer hover:underline ",children:e.Blog.owner.author}),(0,c.jsx)("p",{className:"font-roboto-regular md:text-1 text-[11px] flex justify-center items-center opacity-50",children:j(e.Blog.created_at)})]})]}),(0,c.jsx)("h2",{className:"sm:text-4xl text-xl mt-0 text-text-color font-sans font-roboto-bold",children:e.Blog.title}),(0,c.jsxs)("p",{className:"ptag mt-0 text-1.5 md:text-2 text-gray-600 flex flex-wrap",children:[(0,c.jsx)("span",{className:"flex mt-0 font-roboto-regular",dangerouslySetInnerHTML:{__html:a}}),"...",(0,c.jsx)(r.N_,{to:`/${e.Blog.id}`,className:"font-black tracking-wide text-black md:text-1.5 hover:text-blue-600 hover:underline",children:"Read more"})]}),(0,c.jsxs)("div",{className:"flex flex-row gap-5 items-center",children:[(0,c.jsxs)("span",{className:"relative cursor-pointer",onMouseEnter:()=>h(e.Blog.id),onMouseLeave:()=>h(!1),children:[m===e.Blog.id&&(0,c.jsx)("span",{className:"absolute -bottom-[200%] transform -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2",children:"Follow"}),(0,c.jsx)("p",{className:"sr-only",children:"Follow"}),(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"hover:transition-all hover:duration-300 size-6 hover:ease-in-out hover:scale-110",children:(0,c.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"})})]}),(0,c.jsxs)("span",{onMouseEnter:()=>u(e.Blog.id),onMouseLeave:()=>u(!1),className:"relative cursor-pointer",children:[(0,c.jsx)(l.g,{icon:n.G06,className:"hover:transition-all hover:duration-300 hover:ease-in-out hover:scale-110"}),g===e.Blog.id&&(0,c.jsx)("span",{className:"absolute -bottom-[200%] transform -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2",children:"Bookmark"})]}),(0,c.jsxs)("span",{onMouseEnter:()=>f(e.Blog.id),onMouseLeave:()=>f(!1),className:"relative cursor-pointer",children:[(0,c.jsx)(l.g,{icon:n.qcK,className:"hover:transition-all hover:duration-300 hover:ease-in-out hover:scale-110"}),p===e.Blog.id&&(0,c.jsx)("span",{className:"absolute -bottom-[200%] transform -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2",children:"Like"})]})]})]}),(0,c.jsx)("div",{className:""+(s.length>0?"block":"hidden"),children:s.length>0&&(0,c.jsx)("img",{src:s[0],alt:"First blog",className:"bg-gray-400 md:w-60 md:h-44 w-24 h-16"})})]})})},e.Blog.id)}))]})}},6001:(e,s,t)=>{t.d(s,{A:()=>a});t(9950);var r=t(4414);const a=()=>(0,r.jsxs)("div",{className:"mt-5 animate-pulse p-4 rounded-lg shadow-md bg-white w-full flex  justify-between",children:[(0,r.jsxs)("div",{className:"w-[70%] md:w-[50%]",children:[(0,r.jsxs)("div",{className:"flex items-center mb-4",children:[(0,r.jsx)("div",{className:"w-10 h-10 rounded-full bg-gray-300"}),(0,r.jsxs)("div",{className:"ml-4 flex items-center justify-center gap-5",children:[(0,r.jsx)("div",{className:"h-4 w-20 bg-gray-300 rounded"}),(0,r.jsx)("div",{className:"h-4 w-16 bg-gray-300 rounded "})]})]}),(0,r.jsx)("div",{className:"h-6 w-3/4 bg-gray-300 rounded mb-2"}),(0,r.jsx)("div",{className:"h-4 w-full bg-gray-300 rounded mb-2"}),(0,r.jsx)("div",{className:"h-4 w-5/6 bg-gray-300 rounded"}),(0,r.jsxs)("div",{className:"flex gap-5 mt-4",children:[(0,r.jsx)("div",{className:"w-6 h-6 bg-gray-300 rounded-full"}),(0,r.jsx)("div",{className:"w-6 h-6 bg-gray-300 rounded-full"}),(0,r.jsx)("div",{className:"w-6 h-6 bg-gray-300 rounded-full"})]})]}),(0,r.jsx)("div",{className:"mt-4 md:w-60 md:h-44 w-24 h-16 bg-gray-300 rounded"})]})},6991:(e,s,t)=>{t.d(s,{A:()=>c});var r=t(9950),a=t(2074),o=t(7704),l=t(4959),n=t(9324),i=t(4903),d=t(4414);const c=()=>((0,r.useEffect)((()=>{(0,o.Tp)()}),[]),(0,d.jsxs)("div",{"data-dial-init":!0,className:"fixed end-6 bottom-20 md:bottom-6 group",children:[(0,d.jsxs)("div",{id:"speed-dial-menu-default",className:"flex flex-col items-center hidden mb-4 space-y-2",children:[(0,d.jsx)(a.N_,{to:"/stories",children:(0,d.jsxs)("button",{type:"button","data-tooltip-target":"tooltip-download","data-tooltip-placement":"left",className:"flex justify-center items-center w-[64px] h-[64px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400",children:[(0,d.jsx)(i.M3v,{className:"w-6 h-6"}),(0,d.jsx)("span",{className:"sr-only",children:"Add stories"})]})}),(0,d.jsxs)("div",{id:"tooltip-download",role:"tooltip",className:"absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700",children:["Add story",(0,d.jsx)("div",{className:"tooltip-arrow","data-popper-arrow":!0})]}),(0,d.jsx)(a.N_,{to:"/create",children:(0,d.jsxs)("button",{type:"button","data-tooltip-target":"tooltip-copy","data-tooltip-placement":"left",className:"flex justify-center items-center w-[64px] h-[64px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400",children:[(0,d.jsx)("svg",{className:"w-5 h-5 ","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 18 18",children:(0,d.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M9 1v16M1 9h16"})}),(0,d.jsx)("span",{className:"sr-only",children:"Add blog"})]})}),(0,d.jsxs)("div",{id:"tooltip-copy",role:"tooltip",className:"absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700",children:["Add Blog",(0,d.jsx)("div",{className:"tooltip-arrow","data-popper-arrow":!0})]})]}),(0,d.jsxs)("button",{type:"button","data-dial-toggle":"speed-dial-menu-default","aria-controls":"speed-dial-menu-default","aria-expanded":"false",className:"flex items-center justify-center text-white bg-bg-color-dark rounded-full w-16 h-16 hover:bg-text-color dark:bg-white dark:hover:bg-text-color focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-gray-600",children:[(0,d.jsx)(l.g,{icon:n.hpd,className:"w-5 h-5 transition-transform group-hover:rotate-45"}),(0,d.jsx)("span",{className:"sr-only",children:"Open actions menu"})]})]}))},9321:(e,s,t)=>{t.d(s,{A:()=>n});var r=t(9950),a=t(9246),o=t(917),l=t(4414);const n=(e,s)=>{const[t,n]=(0,r.useState)(null),[i,d]=(0,r.useState)(null),[c,x]=(0,r.useState)(!0);return(0,r.useEffect)((()=>{(async()=>{try{x(!0);const t=s?{search:s}:{},r=s?`${e}?search=${encodeURIComponent(s)}`:e,o=await a.A.get(r,{params:t});if(o.status<200||o.status>=300)throw new Error("Could not get data from that resource");n(o.data),d(null)}catch(t){a.A.isAxiosError(t)?t.response?(t.response.status,d((0,l.jsx)(o.A,{}))):d(`Network Error: ${t.message}`):d(`An unexpected error occurred: ${t.message||"An error occurred"}`)}finally{x(!1)}})()}),[e,s]),{data:t,loading:c,error:i}}},8687:(e,s,t)=>{t.r(s),t.d(s,{default:()=>m});var r=t(9950),a=t(2074),o=t(1880),l=t(9321),n=t(2940),i=t(6991),d=t(6328),c=t(6001),x=t(4414);const m=()=>{const[e,s]=(0,a.ok)(),t=e.get("search")||"",[m,h]=(0,r.useState)(t),[g,u]=(0,r.useState)("https://tc.a.7o7.cx/api/blogs"),{data:p,loading:f,error:b}=(0,l.A)(g,m);(0,r.useEffect)((()=>{h(t),u(t?`https://tc.a.7o7.cx/api/blogs?search=${encodeURIComponent(t)}`:"https://tc.a.7o7.cx/api/blogs")}),[t]);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("section",{className:"sm:pt-28 pt-20 md:w-[80%] w-[100%] m-auto pb-20 md:pb-10",children:[(0,x.jsx)("div",{className:"hidden md:block",children:(0,x.jsx)(n.A,{onSearch:e=>{s(e?{search:e}:{})},width:560,height:56,showwProfilePic:!1})}),f&&(0,x.jsx)("div",{children:[...Array(5)].map(((e,s)=>(0,x.jsx)(c.A,{},s)))}),p&&p.length>0?(0,x.jsx)(o.A,{blogs:p,isLoading:f,error:b}):!f&&(0,x.jsx)("p",{className:"text-center  text-2xl mt-10",children:"No Looks like we've hit a blank page in the storybook. No blogs match your search\u2014try a different tale!"}),(0,x.jsx)(i.A,{})]}),(0,x.jsx)(d.A,{})]})}}}]);