import{r as n,W as h,j as e}from"./app-DpOVI1IB.js";import{D as l,M as w,S as j}from"./SecondaryButton-FIiJuLjW.js";import{I as g}from"./InputError-eMtR8n63.js";import{I as N}from"./InputLabel-DSTxDgiS.js";import{T as D}from"./TextInput-BR6LBx-3.js";import"./transition-RfGy7yed.js";function U({className:c=""}){const[d,r]=n.useState(!1),a=n.useRef(),{data:i,setData:m,delete:u,processing:p,reset:o,errors:x}=h({password:""}),y=()=>{r(!0)},f=t=>{t.preventDefault(),u(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>s(),onError:()=>a.current.focus(),onFinish:()=>o()})},s=()=>{r(!1),o()};return e.jsxs("section",{className:`space-y-6 ${c}`,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Delete Account"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."})]}),e.jsx(l,{onClick:y,children:"Delete Account"}),e.jsx(w,{show:d,onClose:s,children:e.jsxs("form",{onSubmit:f,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Are you sure you want to delete your account?"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."}),e.jsxs("div",{className:"mt-6",children:[e.jsx(N,{htmlFor:"password",value:"Password",className:"sr-only"}),e.jsx(D,{id:"password",type:"password",name:"password",ref:a,value:i.password,onChange:t=>m("password",t.target.value),className:"mt-1 block w-3/4",isFocused:!0,placeholder:"Password"}),e.jsx(g,{message:x.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(j,{onClick:s,children:"Cancel"}),e.jsx(l,{className:"ms-3",disabled:p,children:"Delete Account"})]})]})})]})}export{U as default};
