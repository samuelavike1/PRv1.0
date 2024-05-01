import{W as k,r as C,j as e,a as S,d as U,y as p}from"./app-DpOVI1IB.js";import{A as D}from"./AuthenticatedLayout-yOVksUkA.js";import{T as g,P as A}from"./TableHeadings-BRem4hHS.js";import{T as r}from"./TextInput-BR6LBx-3.js";import{A as E}from"./ParentLayout-CcGam8KZ.js";import{M as F,S as I,D as M}from"./SecondaryButton-FIiJuLjW.js";import{I as d}from"./InputLabel-DSTxDgiS.js";import{I as n}from"./InputError-eMtR8n63.js";import"./ApplicationLogo-DeKCGXyH.js";import"./transition-RfGy7yed.js";const B=({auth:c,users:j,queryParams:t=null,message:T})=>{t=t||{};const m=(s,a)=>{a?t[s]=a:delete t[s],p.get(route("user.index"),t)},u=(s,a)=>{a.key==="Enter"&&m(s,a.target.value)},x=s=>{s===t.sort_field?t.sort_direction==="asc"?t.sort_direction="desc":t.sort_direction="asc":(t.sort_field=s,t.sort_direction="asc"),p.get(route("user.index"),t)},N=s=>{window.confirm("Are you sure you want to delete this user?")&&p.delete(route("user.destroy",s.id))},{data:l,setData:o,post:w,errors:i,reset:b}=k({name:"",email:"",password:"",password_confirmation:""}),[y,h]=C.useState(!1),v=()=>h(!0),f=()=>h(!1),_=s=>{s.preventDefault(),w(route("user.store"),{preserveScroll:!0,onSuccess:()=>h(!1),onFinish:()=>b()})};return e.jsxs(e.Fragment,{children:[e.jsxs(D,{user:c.user,header:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Users"}),e.jsx("button",{onClick:v,className:"bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600",children:"Add New"})]}),children:[e.jsx(S,{title:"Users"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"p-6 text-gray-900 dark:text-gray-100",children:[e.jsx("div",{className:"overflow-auto",children:e.jsxs("table",{className:"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500",children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx(g,{name:"id",sort_field:t.sort_field,sort_direction:t.sort_direction,sortChanged:x,children:"ID"}),e.jsx(g,{name:"name",sort_field:t.sort_field,sort_direction:t.sort_direction,sortChanged:x,children:"Name"}),e.jsx(g,{name:"email",sort_field:t.sort_field,sort_direction:t.sort_direction,sortChanged:x,children:"Email"}),e.jsx("th",{className:"px-3 py-2",children:"created Date"}),e.jsx("th",{className:"px-3 py-2",children:"Actions"})]})}),e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500",children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 py-2"}),e.jsx("th",{className:"px-3 py-2",children:e.jsx(r,{className:"w-full",defualtValue:t.name,placeholder:"User Name",onBlur:s=>m("name",s.target.value),onKeyPress:s=>u("name",s)})}),e.jsx("th",{className:"px-3 py-2",children:e.jsx(r,{className:"w-full",defualtValue:t.email,placeholder:"Email",onBlur:s=>m("email",s.target.value),onKeyPress:s=>u("email",s)})}),e.jsx("th",{className:"px-3 py-2"}),e.jsx("th",{className:"px-3 py-2"})]})}),e.jsx("tbody",{children:j.data.map(s=>e.jsxs("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-3",children:s.id}),e.jsx("td",{className:"px-3 py-3 text-gray-100 text-nowrap",children:s.name}),e.jsxs("td",{className:"px-3 py-3 ",children:[" ",s.email]}),e.jsx("td",{className:"px-3 py-3",children:s.created_at}),e.jsxs("td",{className:"px-3 py-3 text-nowrap",children:[e.jsx(U,{href:route("user.edit",s.id),className:"font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1",children:"Edit"}),e.jsx("button",{onClick:a=>N(s),className:"font-medium text-red-600 dark:text-red-500 hover:underline mx-1",children:"Delete"})]})]},s.id))})]})}),e.jsx(A,{links:j.meta.links})]})})})})]}),e.jsx(F,{show:y,onClose:f,children:e.jsxs("form",{onSubmit:_,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Create a new User"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400"}),e.jsxs("div",{className:"mt-4",children:[e.jsx(d,{htmlFor:"user_name",value:"User Name"}),e.jsx(r,{id:"user_name",type:"text",name:"name",value:l.name,className:"mt-1 block w-full",isFocused:!0,onChange:s=>o("name",s.target.value)}),e.jsx(n,{message:i.name,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(d,{htmlFor:"user_email",value:"Email"}),e.jsx(r,{id:"user_email",type:"email",name:"email",value:l.email,className:"mt-1 block w-full",onChange:s=>o("email",s.target.value)}),e.jsx(n,{message:i.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(d,{htmlFor:"user_password",value:"Password"}),e.jsx(r,{id:"user_password",type:"password",name:"password",value:l.password,className:"mt-1 block w-full",onChange:s=>o("password",s.target.value)}),e.jsx(n,{message:i.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(d,{htmlFor:"user_password_confirmation",value:"Confirm Password"}),e.jsx(r,{id:"user_password_confirmation",type:"password",name:"password_confirmation",value:l.password_confirmation,className:"mt-1 block w-full",onChange:s=>o("password_confirmation",s.target.value)}),e.jsx(n,{message:i.password_confirmation,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(I,{onClick:f,children:"Cancel"}),e.jsx(M,{className:"ms-3 bg-green-600 focus:ring-green-500 hover:bg-green-500 active:bg-green-700",children:"Delete Account"})]})]})})]})};B.layout=c=>e.jsx(E,{children:c});export{B as default};
