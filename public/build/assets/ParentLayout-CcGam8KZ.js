import{B as o,q as a,j as r}from"./app-DpOVI1IB.js";const t=({message:s,type:e})=>(console.log("message: ",s),console.log("type: ",e),e==="success"?o.success(s,{position:"top-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}):e==="error"&&o.error(s,{position:"top-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),null);function n({children:s}){const{flash:e}=a().props;return r.jsxs(r.Fragment,{children:[e.success_message&&r.jsx(t,{message:e.success_message,type:"success"}),e.error_message&&r.jsx(t,{message:e.error_message,type:"error"}),r.jsx("main",{children:s})]})}export{n as A};