import{r,j as v}from"./index-puTgcMDT.js";import{E as p,i as C,d as M,c as y,m as g,s as E,a as S,g as b,b as F,e as P,f as k,u as D,R as z,h as j,j as H,k as L,r as O}from"./components-aBiEuw07.js";/**
 * @remix-run/react v2.16.5
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function T(n){if(!n)return null;let x=Object.entries(n),u={};for(let[a,e]of x)if(e&&e.__type==="RouteErrorResponse")u[a]=new p(e.status,e.statusText,e.data,e.internal===!0);else if(e&&e.__type==="Error"){if(e.__subType){let i=window[e.__subType];if(typeof i=="function")try{let o=new i(e.message);o.stack=e.stack,u[a]=o}catch{}}if(u[a]==null){let i=new Error(e.message);i.stack=e.stack,u[a]=i}}else u[a]=e;return u}/**
 * @remix-run/react v2.16.5
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let s,t,f=!1,R;new Promise(n=>{R=n}).catch(()=>{});function B(n){if(!t){if(window.__remixContext.future.v3_singleFetch){if(!s){let d=window.__remixContext.stream;C(d,"No stream found for single fetch decoding"),window.__remixContext.stream=void 0,s=M(d,window).then(l=>{window.__remixContext.state=l.value,s.value=!0}).catch(l=>{s.error=l})}if(s.error)throw s.error;if(!s.value)throw s}let i=y(window.__remixManifest.routes,window.__remixRouteModules,window.__remixContext.state,window.__remixContext.future,window.__remixContext.isSpaMode),o;if(!window.__remixContext.isSpaMode){o={...window.__remixContext.state,loaderData:{...window.__remixContext.state.loaderData}};let d=g(i,window.location,window.__remixContext.basename);if(d)for(let l of d){let _=l.route.id,c=window.__remixRouteModules[_],w=window.__remixManifest.routes[_];c&&E(w,c,window.__remixContext.isSpaMode)&&(c.HydrateFallback||!w.hasLoader)?o.loaderData[_]=void 0:w&&!w.hasLoader&&(o.loaderData[_]=null)}o&&o.errors&&(o.errors=T(o.errors))}t=S({routes:i,history:P(),basename:window.__remixContext.basename,future:{v7_normalizeFormMethod:!0,v7_fetcherPersist:window.__remixContext.future.v3_fetcherPersist,v7_partialHydration:!0,v7_prependBasename:!0,v7_relativeSplatPath:window.__remixContext.future.v3_relativeSplatPath,v7_skipActionErrorRevalidation:window.__remixContext.future.v3_singleFetch===!0},hydrationData:o,mapRouteProperties:L,dataStrategy:window.__remixContext.future.v3_singleFetch&&!window.__remixContext.isSpaMode?F(window.__remixManifest,window.__remixRouteModules,()=>t):void 0,patchRoutesOnNavigation:b(window.__remixManifest,window.__remixRouteModules,window.__remixContext.future,window.__remixContext.isSpaMode,window.__remixContext.basename)}),t.state.initialized&&(f=!0,t.initialize()),t.createRoutesForHMR=k,window.__remixRouter=t,R&&R(t)}let[x,u]=r.useState(void 0),[a,e]=r.useState(t.state.location);return r.useLayoutEffect(()=>{f||(f=!0,t.initialize())},[]),r.useLayoutEffect(()=>t.subscribe(i=>{i.location!==a&&e(i.location)}),[a]),D(t,window.__remixManifest,window.__remixRouteModules,window.__remixContext.future,window.__remixContext.isSpaMode),r.createElement(r.Fragment,null,r.createElement(z.Provider,{value:{manifest:window.__remixManifest,routeModules:window.__remixRouteModules,future:window.__remixContext.future,criticalCss:x,isSpaMode:window.__remixContext.isSpaMode}},r.createElement(j,{location:a},r.createElement(H,{router:t,fallbackElement:null,future:{v7_startTransition:!0}}))),window.__remixContext.future.v3_singleFetch?r.createElement(r.Fragment,null):null)}var m={},h;function q(){if(h)return m;h=1;var n=O();return m.createRoot=n.createRoot,m.hydrateRoot=n.hydrateRoot,m}var I=q();r.startTransition(()=>{I.hydrateRoot(document,v.jsx(r.StrictMode,{children:v.jsx(B,{})}))});
