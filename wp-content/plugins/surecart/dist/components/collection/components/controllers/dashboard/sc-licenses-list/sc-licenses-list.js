import{h}from"@stencil/core";import{__,sprintf}from"@wordpress/i18n";import{onFirstVisible}from"../../../../functions/lazy";import apiFetch from"../../../../functions/fetch";import{addQueryArgs}from"@wordpress/url";export class ScLicensesList{constructor(){this.query={page:1,per_page:10},this.heading=__("Licenses","surecart"),this.isCustomer=void 0,this.allLink=void 0,this.licenses=[],this.copied=!1,this.loading=!1,this.error="",this.pagination={total:0,total_pages:0}}componentWillLoad(){onFirstVisible(this.el,(()=>{this.initialFetch()}))}async initialFetch(){try{this.loading=!0,await this.getLicenses()}catch(e){console.error(e),this.error=(null==e?void 0:e.message)||__("Something went wrong","surecart")}finally{this.loading=!1}}async getLicenses(){if(!this.isCustomer)return;const e=await await apiFetch({path:addQueryArgs("surecart/v1/licenses",{expand:["purchase","purchase.product","activations"],...this.query}),parse:!1});return this.pagination={total:parseInt(e.headers.get("X-WP-Total")),total_pages:parseInt(e.headers.get("X-WP-TotalPages"))},this.licenses=await e.json(),this.licenses}renderStatus(e){return"active"===e?h("sc-tag",{type:"success"},__("Active","surecart")):"revoked"===e?h("sc-tag",{type:"danger"},__("Revoked","surecart")):h("sc-tag",{type:"info"},"inactive"===e?__("Not Activated","surecart"):e)}async copyKey(e){try{await navigator.clipboard.writeText(e),this.copied=!0,setTimeout((()=>{this.copied=!1}),2e3)}catch(e){console.error(e),alert(__("Error copying to clipboard","surecart"))}}renderLoading(){return h("sc-card",{"no-padding":!0,style:{"--overflow":"hidden"}},h("sc-stacked-list",null,h("sc-stacked-list-row",{style:{"--columns":"2"},"mobile-size":0},h("div",{style:{padding:"0.5em"}},h("sc-skeleton",{style:{width:"30%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"20%",marginBottom:"0.75em"}}),h("sc-skeleton",{style:{width:"40%"}})))))}renderEmpty(){return h("div",null,h("sc-divider",{style:{"--spacing":"0"}}),h("slot",{name:"empty"},h("sc-empty",{icon:"file-text"},__("You don't have any licenses.","surecart"))))}renderContent(){var e,t;return this.loading?this.renderLoading():0===(null===(e=this.licenses)||void 0===e?void 0:e.length)?this.renderEmpty():h("sc-card",{"no-padding":!0},h("sc-stacked-list",null,null===(t=this.licenses)||void 0===t?void 0:t.map((({id:e,purchase:t,status:s,activation_limit:i,activation_count:r})=>{var n;return h("sc-stacked-list-row",{key:e,href:addQueryArgs(window.location.href,{action:"show",model:"license",id:e}),"mobile-size":0},h("div",{class:"license__details"},h("div",{class:"license__name"},null===(n=null==t?void 0:t.product)||void 0===n?void 0:n.name),h("div",null,this.renderStatus(s)," ",sprintf(__("%1s of %2s Activations Used"),r||0,i||"∞"))),h("sc-icon",{name:"chevron-right",slot:"suffix"}))}))))}render(){var e;return h("sc-dashboard-module",{class:"purchase",part:"base",error:this.error},h("span",{slot:"heading"},h("slot",{name:"heading"},this.heading||__("License Keys","surecart"))),!!this.allLink&&!!(null===(e=this.licenses)||void 0===e?void 0:e.length)&&h("sc-button",{type:"link",href:this.allLink,slot:"end"},__("View all","surecart"),h("sc-icon",{name:"chevron-right",slot:"suffix"})),this.renderContent())}static get is(){return"sc-licenses-list"}static get encapsulation(){return"shadow"}static get originalStyleUrls(){return{$:["sc-licenses-list.css"]}}static get styleUrls(){return{$:["sc-licenses-list.css"]}}static get properties(){return{query:{type:"unknown",mutable:!0,complexType:{original:"{\n    page: number;\n    per_page: number;\n  }",resolved:"{ page: number; per_page: number; }",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Query to fetch licenses"},defaultValue:"{\n    page: 1,\n    per_page: 10,\n  }"},heading:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"The heading of the licenses"},attribute:"heading",reflect:!1,defaultValue:"__('Licenses', 'surecart')"},isCustomer:{type:"boolean",mutable:!1,complexType:{original:"boolean",resolved:"boolean",references:{}},required:!1,optional:!1,docs:{tags:[],text:"Whether the current user is customer"},attribute:"is-customer",reflect:!1},allLink:{type:"string",mutable:!1,complexType:{original:"string",resolved:"string",references:{}},required:!1,optional:!1,docs:{tags:[],text:"View all link"},attribute:"all-link",reflect:!1},licenses:{type:"unknown",mutable:!0,complexType:{original:"License[]",resolved:"License[]",references:{License:{location:"import",path:"../../../../types"}}},required:!1,optional:!1,docs:{tags:[],text:""},defaultValue:"[]"}}}static get states(){return{copied:{},loading:{},error:{},pagination:{}}}static get elementRef(){return"el"}}