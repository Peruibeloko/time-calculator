var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,n=(n,r)=>{var a={};for(var l in n)t.call(n,l)&&r.indexOf(l)<0&&(a[l]=n[l]);if(null!=n&&e)for(var l of e(n))r.indexOf(l)<0&&s.call(n,l)&&(a[l]=n[l]);return a};import{d as r,p as a,a as l,c as i,n as o,w as u,t as c,b as d,F as h,o as p,i as m,r as y,e as f,f as g,g as v,h as b,j as $,k,l as L}from"./vendor.3616771a.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const s of e)if("childList"===s.type)for(const e of s.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var E=r({name:"FieldWrapper",props:{label:String,modelValue:null,fieldId:String},emits:["onMove","onEvaluate","onDelete","onSetSign","update:modelValue"],methods:{handleInput(e){this.$emit("update:modelValue",+e.target.value)},handleKeypress(e){switch(`${e.ctrlKey?"Ctrl ":""}${e.key}`){case"+":e.preventDefault(),this.$emit("onSetSign","+");break;case"-":e.preventDefault(),this.$emit("onSetSign","-");break;case"Ctrl ArrowUp":this.$emit("onMove",["up",e]);break;case"Ctrl ArrowDown":this.$emit("onMove",["down",e]);break;case"Ctrl ArrowLeft":this.$emit("onMove",["left",e]);break;case"Ctrl ArrowRight":this.$emit("onMove",["right",e]);break;case"Ctrl Enter":this.$emit("onEvaluate");break;case"Ctrl Delete":this.$emit("onDelete");break;case"Ctrl a":case"Tab":case"Backspace":case"Delete":case"Home":case"End":break;default:if(!/[^0-9]/.test(e.key))break;e.preventDefault()}}},computed:{dynamicWidth(){return this.modelValue&&this.modelValue.length>3?`${this.modelValue.length+.5}rem`:"4rem"},isSign(){return"-"===this.modelValue||"+"===this.modelValue}}});a("data-v-0deba940");const S=["id","value"],O={key:1,class:"sign"};l(),E.render=function(e,t,s,n,r,a){return p(),i(h,null,[e.isSign?(p(),i("div",O,c(e.modelValue),1)):(p(),i("input",{key:0,class:"input",type:"tel",id:e.fieldId,value:e.modelValue,style:o({width:e.dynamicWidth}),onInput:t[0]||(t[0]=(...t)=>e.handleInput&&e.handleInput(...t)),onKeydown:[t[1]||(t[1]=u(((...t)=>e.handleKeypress&&e.handleKeypress(...t)),["exact"])),t[2]||(t[2]=u(((...t)=>e.handleKeypress&&e.handleKeypress(...t)),["ctrl","exact"])),t[3]||(t[3]=u(((...t)=>e.handleKeypress&&e.handleKeypress(...t)),["shift","exact"]))]},null,44,S)),d(" "+c(e.label),1)],64)},E.__scopeId="data-v-0deba940";var w=r({name:"EntryList",components:{FieldWrapper:E},emits:["onEvaluate"],data:()=>({entryList:[{sign:"+",days:0,hours:0,minutes:0,seconds:0}],labels:{sign:"",days:"days",hours:"h",minutes:"min",seconds:"s"}}),methods:{evaluate(){let e=new m.exports.Temporal.Duration;for(const s of this.entryList){const t=s,{sign:r}=t,a=n(t,["sign"]);e="+"===s.sign?e.add(a):e.subtract(a),e=e.round({largestUnit:"day",smallestUnit:"second"})}const t={days:e.days,hours:e.hours,minutes:e.minutes,seconds:e.seconds};this.$emit("onEvaluate",t)},deleteEntry(e){const[t,s]=e.split("-");1!==this.entryList.length&&(0==+s?this.changeLine("down",`${t}-${s+1}`):this.changeLine("up",`${t}-${s}`),this.entryList.splice(s,1))},changeLine(e,t){const s={sign:"+",days:0,hours:0,minutes:0,seconds:0},[n,r]=t.split("-"),a=+r,l=a===this.entryList.length-1,i=0===a,o="down"===e,u="up"===e;let c=!1,d="";if((l&&o||i&&u)&&this.isEntryEmpty(a))return;o&&(d=`#${n}-${a+1}`,l&&(this.entryList.push(s),c=!0)),u&&(d=`#${n}-${a-1}`,i&&(d=`#${n}-${a}`,this.entryList.unshift(s),c=!0));const h=this.$refs.entryListForm;c?this.$nextTick((()=>{h.querySelector(d).focus()})):h.querySelector(d).focus()},moveCursor(e,t,s){switch(e){case"up":case"down":this.changeLine(e,s);break;case"left":case"right":t.target.previousElementSibling.focus()}},setSign(e,t){const s=parseInt(t.split("-")[1]);this.entryList[s].sign=e},isEntryEmpty(e){const t=this.entryList[e],{sign:s}=t,r=n(t,["sign"]);return m.exports.Temporal.Duration.from(r).blank}}});a("data-v-71406660");const C={ref:"entryListForm"};l(),w.render=function(e,t,s,n,r,a){const l=y("FieldWrapper");return p(),i("form",C,[(p(!0),i(h,null,f(e.entryList,((t,s)=>(p(),i("fieldset",{class:"entry",key:s},[(p(!0),i(h,null,f(t,((t,n)=>(p(),g(l,{label:e.labels[n],key:`${n}-${s}`,fieldId:`${n}-${s}`,modelValue:e.entryList[s][n],"onUpdate:modelValue":t=>e.entryList[s][n]=t,onOnSetSign:t=>e.setSign(t,`${n}-${s}`),onOnMove:t=>e.moveCursor(t[0],t[1],`${n}-${s}`),onOnEvaluate:e.evaluate,onOnDelete:t=>e.deleteEntry(`${n}-${s}`)},null,8,["label","fieldId","modelValue","onUpdate:modelValue","onOnSetSign","onOnMove","onOnEvaluate","onOnDelete"])))),128))])))),128))],512)},w.__scopeId="data-v-71406660";var V=r({name:"App",components:{EntryList:w},data:()=>({result:""}),methods:{updateResult(e){let t=Object.values(e).filter((e=>e>0)).length;this.result="",e.days&&(t--,this.result+=e.days+" days",1==t?this.result+=" and":t>1&&(this.result+=",")),e.hours&&(t--,this.result+=" "+e.hours+" hours",1==t?this.result+=" and":t>1&&(this.result+=",")),e.minutes&&(t--,this.result+=" "+e.minutes+" minutes",1==t?this.result+=" and":t>1&&(this.result+=",")),e.seconds&&(t--,this.result+=" "+e.seconds+" seconds")}}});const I={class:"container"},D=v("header",{class:"centered"},[v("h1",{class:"site-title"},"Time Calculator")],-1),K=v("div",{class:"hbar"},null,-1),x={key:0,class:"result"},j=k('<footer class="footer"><div class="line"><a href="https://github.com/peruibeloko/time-calculator" class="source-link">Check the source here!</a><span class="separator">·</span><a href="https://github.com/peruibeloko" class="source-link">Check my other projects here!</a></div><div class="line"><small>Powered by the highly experimental, bleeding-edge, <a href="https://tc39.es/proposal-temporal/docs/" class="source-link">Temporal Object</a> proposal by TC39 </small></div></footer>',1);V.render=function(e,t,s,n,r,a){const l=y("EntryList");return p(),i("div",I,[D,v("main",null,[b(l,{onOnEvaluate:e.updateResult},null,8,["onOnEvaluate"]),K,v("section",null,[e.result?(p(),i("h1",x,"Thats "+c(e.result),1)):$("",!0)])]),j])},L(V).mount("#app");