import{r as o,h as s,F as i}from"./p-cc7ce8c7.js";import{s as e}from"./p-c3d54c20.js";import"./p-895f0fa3.js";import{s as t,c as r,f as l,e as n,b as a}from"./p-1f003262.js";import{e as d,s as c,u}from"./p-e250339f.js";import{a as p}from"./p-40e3d090.js";import{l as m,b as v}from"./p-bb0a30fb.js";import{a as f}from"./p-18e45a13.js";import{a as h,M as y}from"./p-9eed9ef6.js";import{c as b}from"./p-8266bbed.js";import{a as j}from"./p-1c2e2695.js";import{s as g}from"./p-38a11668.js";import{o as k}from"./p-7c2e44b1.js";import{c as w}from"./p-f475bf8a.js";import"./p-25433d0f.js";import"./p-c06b2e12.js";import"./p-f70181c4.js";import"./p-4d73f82a.js";import"./p-830ab1a3.js";import"./p-a3a138d6.js";import"./p-7ef0f71c.js";import"./p-50da3ba3.js";import"./p-e64f9fcd.js";import"./p-c132baf6.js";const _=(o,s,i)=>d("set",((e,t,r)=>{if(e!==o)return;if(Array.isArray(s)){if(s.some((o=>JSON.stringify(t===null||t===void 0?void 0:t[o])!==JSON.stringify(r===null||r===void 0?void 0:r[o])))){return i(t,r)}}if(typeof s==="string"){if(JSON.stringify(t===null||t===void 0?void 0:t[s])===JSON.stringify(r===null||r===void 0?void 0:r[s]))return;return i(t===null||t===void 0?void 0:t[s],r===null||r===void 0?void 0:r[s])}}));const S=":host{display:block}";const J=class{constructor(s){o(this,s);this.processorId=undefined;this.method=undefined;this.error=undefined;this.methods=undefined}componentWillLoad(){e.id="mollie";this.fetchMethods();_("checkout",["total_amount","currency","reusabled_payment_method_required","shipping_address"],(()=>this.fetchMethods()))}async fetchMethods(){var o;const s=c.checkout;if(!(s===null||s===void 0?void 0:s.currency)||!(s===null||s===void 0?void 0:s.total_amount))return;try{m("methods");const i=await f({path:j(`surecart/v1/processors/${this.processorId}/payment_method_types`,{amount:s===null||s===void 0?void 0:s.total_amount,country:((o=s===null||s===void 0?void 0:s.shipping_address)===null||o===void 0?void 0:o.country)||"us",currency:s===null||s===void 0?void 0:s.currency,...(s===null||s===void 0?void 0:s.reusable_payment_method_required)?{reusable:s===null||s===void 0?void 0:s.reusable_payment_method_required}:{},per_page:100})});t.methods=(i===null||i===void 0?void 0:i.data)||[]}catch(o){b(o);console.error(o)}finally{v("methods")}}renderLoading(){return s("sc-card",null,s("sc-skeleton",{style:{width:"50%",marginBottom:"0.5em"}}),s("sc-skeleton",{style:{width:"30%",marginBottom:"0.5em"}}),s("sc-skeleton",{style:{width:"60%",marginBottom:"0.5em"}}))}render(){var o,e,t;if(p("methods")&&!((o=r())===null||o===void 0?void 0:o.length)){return this.renderLoading()}if(!((e=c.checkout)===null||e===void 0?void 0:e.currency)){return this.renderLoading()}if(!((t=r())===null||t===void 0?void 0:t.length)){return s("sc-alert",{type:"warning",open:true},wp.i18n.__("No available payment methods","surecart")," ")}const d=l()?"sc-toggles":"div";return s(i,null,s(d,{collapsible:false,theme:"container"},(r()||[]).map((o=>s("sc-payment-method-choice",{"processor-id":"mollie","method-id":o===null||o===void 0?void 0:o.id,key:o===null||o===void 0?void 0:o.id},s("span",{slot:"summary",class:"sc-payment-toggle-summary"},!!(o===null||o===void 0?void 0:o.image)&&s("img",{src:o===null||o===void 0?void 0:o.image,"aria-hidden":"true"}),s("span",null,o===null||o===void 0?void 0:o.description)),s("sc-card",null,s("sc-payment-selected",{label:wp.i18n.sprintf(wp.i18n.__("%s selected for check out.","surecart"),o===null||o===void 0?void 0:o.description)},!!(o===null||o===void 0?void 0:o.image)&&s("img",{slot:"icon",src:o===null||o===void 0?void 0:o.image,style:{width:"32px"}}),wp.i18n.__("Another step will appear after submitting your order to complete your purchase details.","surecart")))))),s(h,{processor:n("mock")}),s(y,{methods:a()})),!!p("methods")&&s("sc-block-ui",{class:"busy-block-ui","z-index":9,style:{"--sc-block-ui-opacity":"0.4"}}))}};J.style=S;const C=class{constructor(s){o(this,s)}componentWillLoad(){this.unlistenToFormState=k("formState",(()=>{if("paying"===w()){this.confirm()}}))}disconnectedCallback(){this.unlistenToFormState()}async confirm(){var o,s,i,t;if((e===null||e===void 0?void 0:e.id)!=="paystack")return;if(!((s=(o=c===null||c===void 0?void 0:c.checkout)===null||o===void 0?void 0:o.payment_intent)===null||s===void 0?void 0:s.processor_data.paystack))return;if(((i=c===null||c===void 0?void 0:c.checkout)===null||i===void 0?void 0:i.status)==="paid")return;try{const{public_key:o,access_code:s}=(t=c===null||c===void 0?void 0:c.checkout)===null||t===void 0?void 0:t.payment_intent.processor_data.paystack;if(!o||!s){b({message:wp.i18n.sprintf(wp.i18n.__("Payment gateway configuration incomplete. Please ensure Paystack is properly configured for transactions.","surecart"))});return}const i=new g;await i.newTransaction({key:o,accessCode:s,onSuccess:async o=>{if((o===null||o===void 0?void 0:o.status)!=="success"){throw{message:wp.i18n.sprintf(wp.i18n.__("Paystack transaction could not be finished. Status: %s","surecart"),o===null||o===void 0?void 0:o.status)}}return u("PAID")},onClose:()=>u("REJECT")})}catch(o){b(o);console.error(o);u("REJECT")}}};export{J as sc_checkout_mollie_payment,C as sc_checkout_paystack_payment_provider};
//# sourceMappingURL=p-ac92f5ca.entry.js.map