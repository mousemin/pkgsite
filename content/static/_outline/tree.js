/**
 * @license
 * Copyright 2021 The Go Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */export class TreeNavController{constructor(e){this.el=e;this.treeitems=[],this.firstChars=[],this.firstTreeitem=null,this.lastTreeitem=null,this.observerCallbacks=[],this.init()}init(){this.el.style.setProperty("--js-tree-height",this.el.clientHeight+"px"),this.findTreeItems(),this.updateVisibleTreeitems(),this.observeTargets(),this.firstTreeitem&&(this.firstTreeitem.el.tabIndex=0)}observeTargets(){this.addObserver(i=>{this.expandTreeitem(i),this.setSelected(i),i.el?.scrollIntoViewIfNeeded&&i.el?.scrollIntoViewIfNeeded()});const e=new Map,t=new IntersectionObserver(i=>{for(const s of i)e.set(s.target.id,s.isIntersecting||s.intersectionRatio===1);for(const[s,r]of e)if(r){const l=this.treeitems.find(n=>n.el?.href.endsWith(`#${s}`));if(l)for(const n of this.observerCallbacks)n(l);break}},{threshold:1,rootMargin:"-60px 0px 0px 0px"});for(const i of this.treeitems.map(s=>s.el.getAttribute("href")))if(i){const s=i.replace(window.location.origin,"").replace("/","").replace("#",""),r=document.getElementById(s);r&&t.observe(r)}}addObserver(e,t=200){this.observerCallbacks.push(h(e,t))}setFocusToNextItem(e){let t=null;for(let i=e.index+1;i<this.treeitems.length;i++){const s=this.treeitems[i];if(s.isVisible){t=s;break}}t&&this.setFocusToItem(t)}setFocusToPreviousItem(e){let t=null;for(let i=e.index-1;i>-1;i--){const s=this.treeitems[i];if(s.isVisible){t=s;break}}t&&this.setFocusToItem(t)}setFocusToParentItem(e){e.groupTreeitem&&this.setFocusToItem(e.groupTreeitem)}setFocusToFirstItem(){this.firstTreeitem&&this.setFocusToItem(this.firstTreeitem)}setFocusToLastItem(){this.lastTreeitem&&this.setFocusToItem(this.lastTreeitem)}setSelected(e){for(const t of this.el.querySelectorAll('[aria-expanded="true"]'))t!==e.el&&(t.nextElementSibling?.contains(e.el)||t.setAttribute("aria-expanded","false"));for(const t of this.el.querySelectorAll("[aria-selected]"))t!==e.el&&t.setAttribute("aria-selected","false");e.el.setAttribute("aria-selected","true"),this.updateVisibleTreeitems(),this.setFocusToItem(e,!1)}expandTreeitem(e){let t=e;for(;t;)t.isExpandable&&t.el.setAttribute("aria-expanded","true"),t=t.groupTreeitem;this.updateVisibleTreeitems()}expandAllSiblingItems(e){for(const t of this.treeitems)t.groupTreeitem===e.groupTreeitem&&t.isExpandable&&this.expandTreeitem(t)}collapseTreeitem(e){let t=null;e.isExpanded()?t=e:t=e.groupTreeitem,t&&(t.el.setAttribute("aria-expanded","false"),this.updateVisibleTreeitems(),this.setFocusToItem(t))}setFocusByFirstCharacter(e,t){let i,s;t=t.toLowerCase(),i=e.index+1,i===this.treeitems.length&&(i=0),s=this.getIndexFirstChars(i,t),s===-1&&(s=this.getIndexFirstChars(0,t)),s>-1&&this.setFocusToItem(this.treeitems[s])}findTreeItems(){const e=(t,i)=>{let s=i,r=t.firstElementChild;for(;r;)(r.tagName==="A"||r.tagName==="SPAN")&&(s=new o(r,this,i),this.treeitems.push(s),this.firstChars.push(s.label.substring(0,1).toLowerCase())),r.firstElementChild&&e(r,s),r=r.nextElementSibling};e(this.el,null),this.treeitems.map((t,i)=>t.index=i)}updateVisibleTreeitems(){this.firstTreeitem=this.treeitems[0];for(const e of this.treeitems){let t=e.groupTreeitem;for(e.isVisible=!0;t&&t.el!==this.el;)t.isExpanded()||(e.isVisible=!1),t=t.groupTreeitem;e.isVisible&&(this.lastTreeitem=e)}}setFocusToItem(e,t=!0){e.el.tabIndex=0,t&&e.el.focus();for(const i of this.treeitems)i!==e&&(i.el.tabIndex=-1)}getIndexFirstChars(e,t){for(let i=e;i<this.firstChars.length;i++)if(this.treeitems[i].isVisible&&t===this.firstChars[i])return i;return-1}}class o{constructor(e,t,i){e.tabIndex=-1,this.el=e,this.groupTreeitem=i,this.label=e.textContent?.trim()??"",this.tree=t,this.depth=(i?.depth||0)+1,this.index=0;const s=e.parentElement;s?.tagName.toLowerCase()==="li"&&s?.setAttribute("role","none"),e.setAttribute("aria-level",this.depth+""),e.getAttribute("aria-label")&&(this.label=e?.getAttribute("aria-label")?.trim()??""),this.isExpandable=!1,this.isVisible=!1,this.isInGroup=!!i;let r=e.nextElementSibling;for(;r;){if(r.tagName.toLowerCase()=="ul"){const l=`${i?.label??""} nav group ${this.label}`.replace(/[\W_]+/g,"_");e.setAttribute("aria-owns",l),e.setAttribute("aria-expanded","false"),r.setAttribute("role","group"),r.setAttribute("id",l),this.isExpandable=!0;break}r=r.nextElementSibling}this.init()}init(){this.el.tabIndex=-1,this.el.getAttribute("role")||this.el.setAttribute("role","treeitem"),this.el.addEventListener("keydown",this.handleKeydown.bind(this)),this.el.addEventListener("click",this.handleClick.bind(this)),this.el.addEventListener("focus",this.handleFocus.bind(this)),this.el.addEventListener("blur",this.handleBlur.bind(this))}isExpanded(){return this.isExpandable?this.el.getAttribute("aria-expanded")==="true":!1}isSelected(){return this.el.getAttribute("aria-selected")==="true"}handleClick(e){e.target!==this.el&&e.target!==this.el.firstElementChild||(this.isExpandable&&(this.isExpanded()&&this.isSelected()?this.tree.collapseTreeitem(this):this.tree.expandTreeitem(this),e.stopPropagation()),this.tree.setSelected(this))}handleFocus(){let e=this.el;this.isExpandable&&(e=e.firstElementChild??e),e.classList.add("focus")}handleBlur(){let e=this.el;this.isExpandable&&(e=e.firstElementChild??e),e.classList.remove("focus")}handleKeydown(e){if(e.altKey||e.ctrlKey||e.metaKey)return;let t=!1;switch(e.key){case" ":case"Enter":this.isExpandable?(this.isExpanded()&&this.isSelected()?this.tree.collapseTreeitem(this):this.tree.expandTreeitem(this),t=!0):e.stopPropagation(),this.tree.setSelected(this);break;case"ArrowUp":this.tree.setFocusToPreviousItem(this),t=!0;break;case"ArrowDown":this.tree.setFocusToNextItem(this),t=!0;break;case"ArrowRight":this.isExpandable&&(this.isExpanded()?this.tree.setFocusToNextItem(this):this.tree.expandTreeitem(this)),t=!0;break;case"ArrowLeft":this.isExpandable&&this.isExpanded()?(this.tree.collapseTreeitem(this),t=!0):this.isInGroup&&(this.tree.setFocusToParentItem(this),t=!0);break;case"Home":this.tree.setFocusToFirstItem(),t=!0;break;case"End":this.tree.setFocusToLastItem(),t=!0;break;default:e.key.length===1&&e.key.match(/\S/)&&(e.key=="*"?this.tree.expandAllSiblingItems(this):this.tree.setFocusByFirstCharacter(this,e.key),t=!0);break}t&&(e.stopPropagation(),e.preventDefault())}}function h(a,e){let t;return(...i)=>{const s=()=>{t=null,a(...i)};t&&clearTimeout(t),t=setTimeout(s,e)}}
//# sourceMappingURL=tree.js.map
