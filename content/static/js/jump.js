/*!
 * @license
 * Copyright 2019-2020 The Go Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */const jumpDialog=document.querySelector(".JumpDialog"),jumpBody=jumpDialog?.querySelector(".JumpDialog-body"),jumpList=jumpDialog?.querySelector(".JumpDialog-list"),jumpFilter=jumpDialog?.querySelector(".JumpDialog-input"),searchInput=document.querySelector(".js-searchFocus"),doc=document.querySelector(".js-documentation");jumpDialog&&!jumpDialog.showModal&&dialogPolyfill.registerDialog(jumpDialog);let jumpListItems;function collectJumpListItems(){const t=[];if(!!doc){for(const e of doc.querySelectorAll("[data-kind]"))t.push(newJumpListItem(e));for(const e of t)e.link.addEventListener("click",function(){jumpDialog?.close()});return t.sort(function(e,n){return e.lower.localeCompare(n.lower)}),t}}function newJumpListItem(t){const e=document.createElement("a"),n=t.getAttribute("id");e.setAttribute("href","#"+n),e.setAttribute("tabindex","-1");const o=t.getAttribute("data-kind");return{link:e,name:n??"",kind:o??"",lower:n?.toLowerCase()??""}}let lastFilterValue,activeJumpItem=-1;function updateJumpList(t){for(lastFilterValue=t,jumpListItems||(jumpListItems=collectJumpListItems()),setActiveJumpItem(-1);jumpList?.firstChild;)jumpList.firstChild.remove();if(t){const e=t.toLowerCase(),n=[],o=[],c=[],r=(i,s,l)=>i.name.substring(0,s)+"<b>"+i.name.substring(s,l)+"</b>"+i.name.substring(l);for(const i of jumpListItems??[]){const s=i.name.toLowerCase();if(s===e)i.link.innerHTML=r(i,0,i.name.length),n.push(i);else if(s.startsWith(e))i.link.innerHTML=r(i,0,t.length),o.push(i);else{const l=s.indexOf(e);l>-1&&(i.link.innerHTML=r(i,l,l+t.length),c.push(i))}}for(const i of n.concat(o).concat(c))jumpList?.appendChild(i.link)}else for(const e of jumpListItems??[])e.link.innerHTML=e.name+" <i>"+e.kind+"</i>",jumpList?.appendChild(e.link);jumpBody&&(jumpBody.scrollTop=0),jumpList&&jumpList.children.length>0&&setActiveJumpItem(0)}function setActiveJumpItem(t){const e=jumpList?.children;if(!(!e||!jumpBody)){if(activeJumpItem>=0&&e[activeJumpItem].classList.remove("JumpDialog-active"),t>=e.length&&(t=e.length-1),t>=0){e[t].classList.add("JumpDialog-active");const n=e[t].offsetTop-e[0].offsetTop,o=n+e[t].clientHeight;n<jumpBody.scrollTop?jumpBody.scrollTop=n:o>jumpBody.scrollTop+jumpBody.clientHeight&&(jumpBody.scrollTop=o-jumpBody.clientHeight)}activeJumpItem=t}}function incActiveJumpItem(t){if(activeJumpItem<0)return;let e=activeJumpItem+t;e<0&&(e=0),setActiveJumpItem(e)}jumpFilter?.addEventListener("keyup",function(){jumpFilter.value.toUpperCase()!=lastFilterValue.toUpperCase()&&updateJumpList(jumpFilter.value)}),jumpFilter?.addEventListener("keydown",function(t){const e=38,n=40,o=13;switch(t.which){case e:incActiveJumpItem(-1),t.preventDefault();break;case n:incActiveJumpItem(1),t.preventDefault();break;case o:activeJumpItem>=0&&jumpList&&jumpList.children[activeJumpItem].click();break}});const shortcutsDialog=document.querySelector(".ShortcutsDialog");shortcutsDialog&&!shortcutsDialog.showModal&&dialogPolyfill.registerDialog(shortcutsDialog),document.addEventListener("keypress",function(t){if(jumpDialog?.open||shortcutsDialog?.open||!doc)return;const e=t.target,n=e?.tagName;if(n=="INPUT"||n=="SELECT"||n=="TEXTAREA"||e?.contentEditable=="true"||t.metaKey||t.ctrlKey)return;switch(String.fromCharCode(t.which)){case"f":case"F":t.preventDefault(),jumpFilter&&(jumpFilter.value=""),jumpDialog?.showModal(),updateJumpList("");break;case"?":shortcutsDialog?.showModal();break;case"/":searchInput&&!window.navigator.userAgent.includes("Firefox")&&(t.preventDefault(),searchInput.focus());break}});const jumpOutlineInput=document.querySelector(".js-jumpToInput");jumpOutlineInput&&jumpOutlineInput.addEventListener("click",()=>{jumpFilter&&(jumpFilter.value=""),jumpDialog?.showModal(),updateJumpList("")});
//# sourceMappingURL=jump.js.map
