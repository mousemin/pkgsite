/**
 * @license
 * Copyright 2021 The Go Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */import{ExpandableRowsTableController as o}from"../_table/table.js";document.querySelectorAll(".js-expandableTable").forEach(n=>new o(n,document.querySelector(".js-expandAllDirectories")));const a=3.5;export class MainLayoutController{constructor(e,t){this.mainHeader=e;this.mainNav=t;this.handleDoubleClick=e=>{e.target===this.mainHeader?.lastElementChild&&(window.getSelection()?.removeAllRanges(),window.scrollTo({top:0,behavior:"smooth"}))};this.handleResize=()=>{const e=(t,i)=>document.documentElement.style.setProperty(t,i);e("--js-unit-header-height","0"),setTimeout(()=>{const t=(this.mainHeader?.getBoundingClientRect().height??0)/16;e("--js-unit-header-height",`${t}rem`),e("--js-sticky-header-height",`${a}rem`),e("--js-unit-header-top",`${(t-a)*-1}rem`)})};this.headerObserver=new IntersectionObserver(([i])=>{if(i.intersectionRatio<1)for(const r of document.querySelectorAll('[class^="go-Main-header"'))r.setAttribute("data-fixed","true");else{for(const r of document.querySelectorAll('[class^="go-Main-header"'))r.removeAttribute("data-fixed");this.handleResize()}},{threshold:1}),this.navObserver=new IntersectionObserver(([i])=>{i.intersectionRatio<1?(this.mainNav?.classList.add("go-Main-nav--fixed"),this.mainNav?.setAttribute("data-fixed","true")):(this.mainNav?.classList.remove("go-Main-nav--fixed"),this.mainNav?.removeAttribute("data-fixed"))},{threshold:1,rootMargin:`-${(a??0)*16+10}px`}),this.init()}init(){if(this.handleResize(),window.addEventListener("resize",this.handleResize),this.mainHeader?.addEventListener("dblclick",this.handleDoubleClick),this.mainHeader?.hasChildNodes()){const e=document.createElement("div");this.mainHeader?.prepend(e),this.headerObserver.observe(e)}if(this.mainNav?.hasChildNodes()){const e=document.createElement("div");this.mainNav?.prepend(e),this.navObserver.observe(e)}}}const s=n=>document.querySelector(n);new MainLayoutController(s(".js-mainHeader"),s(".js-mainNav"));
//# sourceMappingURL=unit.js.map
