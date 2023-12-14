(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();function z(){return z=Object.assign?Object.assign.bind():function(l){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(l[o]=e[o])}return l},z.apply(this,arguments)}function L(l,t,e){return Math.max(l,Math.min(t,e))}class A{advance(t){var e;if(!this.isRunning)return;let o=!1;if(this.lerp)this.value=(s=this.value,i=this.to,(1-(n=1-Math.exp(-60*this.lerp*t)))*s+n*i),Math.round(this.value)===this.to&&(this.value=this.to,o=!0);else{this.currentTime+=t;const r=L(0,this.currentTime/this.duration,1);o=r>=1;const h=o?1:this.easing(r);this.value=this.from+(this.to-this.from)*h}var s,i,n;(e=this.onUpdate)==null||e.call(this,this.value,o),o&&this.stop()}stop(){this.isRunning=!1}fromTo(t,e,{lerp:o=.1,duration:s=1,easing:i=h=>h,onStart:n,onUpdate:r}){this.from=this.value=t,this.to=e,this.lerp=o,this.duration=s,this.easing=i,this.currentTime=0,this.isRunning=!0,n==null||n(),this.onUpdate=r}}class H{constructor({wrapper:t,content:e,autoResize:o=!0}={}){if(this.resize=()=>{this.onWrapperResize(),this.onContentResize()},this.onWrapperResize=()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)},this.onContentResize=()=>{this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth},this.wrapper=t,this.content=e,o){const s=function(i,n){let r;return function(){let h=arguments,u=this;clearTimeout(r),r=setTimeout(function(){i.apply(u,h)},250)}}(this.resize);this.wrapper!==window&&(this.wrapperResizeObserver=new ResizeObserver(s),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(s),this.contentResizeObserver.observe(this.content)}this.resize()}destroy(){var t,e;(t=this.wrapperResizeObserver)==null||t.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect()}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class C{constructor(){this.events={}}emit(t,...e){let o=this.events[t]||[];for(let s=0,i=o.length;s<i;s++)o[s](...e)}on(t,e){var o;return(o=this.events[t])!=null&&o.push(e)||(this.events[t]=[e]),()=>{var s;this.events[t]=(s=this.events[t])==null?void 0:s.filter(i=>e!==i)}}off(t,e){var o;this.events[t]=(o=this.events[t])==null?void 0:o.filter(s=>e!==s)}destroy(){this.events={}}}class I{constructor(t,{wheelMultiplier:e=1,touchMultiplier:o=2,normalizeWheel:s=!1}){this.onTouchStart=i=>{const{clientX:n,clientY:r}=i.targetTouches?i.targetTouches[0]:i;this.touchStart.x=n,this.touchStart.y=r,this.lastDelta={x:0,y:0}},this.onTouchMove=i=>{const{clientX:n,clientY:r}=i.targetTouches?i.targetTouches[0]:i,h=-(n-this.touchStart.x)*this.touchMultiplier,u=-(r-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=n,this.touchStart.y=r,this.lastDelta={x:h,y:u},this.emitter.emit("scroll",{deltaX:h,deltaY:u,event:i})},this.onTouchEnd=i=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:i})},this.onWheel=i=>{let{deltaX:n,deltaY:r}=i;this.normalizeWheel&&(n=L(-100,n,100),r=L(-100,r,100)),n*=this.wheelMultiplier,r*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:n,deltaY:r,event:i})},this.element=t,this.wheelMultiplier=e,this.touchMultiplier=o,this.normalizeWheel=s,this.touchStart={x:null,y:null},this.emitter=new C,this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}}class q{constructor({wrapper:t=window,content:e=document.documentElement,wheelEventsTarget:o=t,eventsTarget:s=o,smoothWheel:i=!0,smoothTouch:n=!1,syncTouch:r=!1,syncTouchLerp:h=.1,__iosNoInertiaSyncTouchLerp:u=.4,touchInertiaMultiplier:v=35,duration:f,easing:a=c=>Math.min(1,1.001-Math.pow(2,-10*c)),lerp:p=!f&&.1,infinite:y=!1,orientation:x="vertical",gestureOrientation:N="vertical",touchMultiplier:_=1,wheelMultiplier:M=1,normalizeWheel:b=!1,autoResize:E=!0}={}){this.onVirtualScroll=({deltaX:c,deltaY:g,event:d})=>{if(d.ctrlKey)return;const S=d.type.includes("touch"),O=d.type.includes("wheel");if(this.options.gestureOrientation==="both"&&c===0&&g===0||this.options.gestureOrientation==="vertical"&&g===0||this.options.gestureOrientation==="horizontal"&&c===0||S&&this.options.gestureOrientation==="vertical"&&this.scroll===0&&!this.options.infinite&&g<=0)return;let T=d.composedPath();if(T=T.slice(0,T.indexOf(this.rootElement)),T.find(m=>{var W;return(m.hasAttribute==null?void 0:m.hasAttribute("data-lenis-prevent"))||S&&(m.hasAttribute==null?void 0:m.hasAttribute("data-lenis-prevent-touch"))||O&&(m.hasAttribute==null?void 0:m.hasAttribute("data-lenis-prevent-wheel"))||((W=m.classList)==null?void 0:W.contains("lenis"))}))return;if(this.isStopped||this.isLocked)return void d.preventDefault();if(this.isSmooth=(this.options.smoothTouch||this.options.syncTouch)&&S||this.options.smoothWheel&&O,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();d.preventDefault();let w=g;this.options.gestureOrientation==="both"?w=Math.abs(g)>Math.abs(c)?g:c:this.options.gestureOrientation==="horizontal"&&(w=c);const k=S&&this.options.syncTouch,R=S&&d.type==="touchend"&&Math.abs(w)>1;R&&(w=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+w,z({programmatic:!1},k&&{lerp:R?this.syncTouchLerp:this.options.__iosNoInertiaSyncTouchLerp}))},this.onNativeScroll=()=>{if(!this.__preventNextScrollEvent&&!this.isScrolling){const c=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-c),this.emit()}},window.lenisVersion="1.0.29",t!==document.documentElement&&t!==document.body||(t=window),this.options={wrapper:t,content:e,wheelEventsTarget:o,eventsTarget:s,smoothWheel:i,smoothTouch:n,syncTouch:r,syncTouchLerp:h,__iosNoInertiaSyncTouchLerp:u,touchInertiaMultiplier:v,duration:f,easing:a,lerp:p,infinite:y,gestureOrientation:N,orientation:x,touchMultiplier:_,wheelMultiplier:M,normalizeWheel:b,autoResize:E},this.animate=new A,this.emitter=new C,this.dimensions=new H({wrapper:t,content:e,autoResize:E}),this.toggleClass("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=r||i||n,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,{passive:!1}),this.virtualScroll=new I(s,{touchMultiplier:_,wheelMultiplier:M,normalizeWheel:b}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,{passive:!1}),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClass("lenis",!1),this.toggleClass("lenis-smooth",!1),this.toggleClass("lenis-scrolling",!1),this.toggleClass("lenis-stopped",!1),this.toggleClass("lenis-locked",!1)}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()}start(){this.isStopped=!1,this.reset()}stop(){this.isStopped=!0,this.animate.stop(),this.reset()}raf(t){const e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)}scrollTo(t,{offset:e=0,immediate:o=!1,lock:s=!1,duration:i=this.options.duration,easing:n=this.options.easing,lerp:r=!i&&this.options.lerp,onComplete:h=null,force:u=!1,programmatic:v=!0}={}){if(!this.isStopped&&!this.isLocked||u){if(["top","left","start"].includes(t))t=0;else if(["bottom","right","end"].includes(t))t=this.limit;else{var f;let a;if(typeof t=="string"?a=document.querySelector(t):(f=t)!=null&&f.nodeType&&(a=t),a){if(this.options.wrapper!==window){const y=this.options.wrapper.getBoundingClientRect();e-=this.isHorizontal?y.left:y.top}const p=a.getBoundingClientRect();t=(this.isHorizontal?p.left:p.top)+this.animatedScroll}}if(typeof t=="number"){if(t+=e,t=Math.round(t),this.options.infinite?v&&(this.targetScroll=this.animatedScroll=this.scroll):t=L(0,t,this.limit),o)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),void(h==null||h(this));if(!v){if(t===this.targetScroll)return;this.targetScroll=t}this.animate.fromTo(this.animatedScroll,t,{duration:i,easing:n,lerp:r,onStart:()=>{s&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(a,p)=>{this.isScrolling=!0,this.velocity=a-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=a,this.setScroll(this.scroll),v&&(this.targetScroll=a),p||this.emit(),p&&(this.reset(),this.emit(),h==null||h(this),this.__preventNextScrollEvent=!0,requestAnimationFrame(()=>{delete this.__preventNextScrollEvent}))}})}}}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(this.animatedScroll%(t=this.limit)+t)%t:this.animatedScroll;var t}get progress(){return this.limit===0?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(t){this.__isSmooth!==t&&(this.__isSmooth=t,this.toggleClass("lenis-smooth",t))}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.toggleClass("lenis-scrolling",t))}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.__isStopped=t,this.toggleClass("lenis-stopped",t))}get isLocked(){return this.__isLocked}set isLocked(t){this.__isLocked!==t&&(this.__isLocked=t,this.toggleClass("lenis-locked",t))}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isSmooth&&(t+=" lenis-smooth"),t}toggleClass(t,e){this.rootElement.classList.toggle(t,e),this.emitter.emit("className change",this)}}function D(){const l=new q({duration:1,easing:e=>Math.min(1,1.001-Math.pow(2,-10*e))});l.on("scroll",e=>{console.log(e)});function t(e){l.raf(e),requestAnimationFrame(t)}requestAnimationFrame(t)}function X(){document.querySelectorAll("a[href^='#']").forEach(l=>{l.addEventListener("click",function(t){t.preventDefault();const e=this.getAttribute("href"),o=document.querySelector(e);o&&o.scrollIntoView({behavior:"smooth"})})})}window.addEventListener("load",function(){D(),X()});
