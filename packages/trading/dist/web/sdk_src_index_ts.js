"use strict";
(self["rspackChunksas_trading_web"] = self["rspackChunksas_trading_web"] || []).push([["sdk_src_index_ts"], {
"../sdk/src/components/Button.web.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react_strict_dom_runtime__rspack_import_3 = __webpack_require__("../../node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react-native@0.87_2d167a3d0161e3b7e64ae3803b774873/node_modules/react-strict-dom/dist/web/runtime.js");
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_strict_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-strict-dom/react-strict-dom");
/* import */ var react_jsx_runtime__rspack_import_2 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
var styles={base:{k1xSpc:"x78zum5",kXwgrk:"xdt5ytf",kGNEyG:"x6s0dn4",kjj79g:"xl56j7k",kE3dHu:"xd3ty66",kpe85a:"x8e5d8q",kaIpWk:"x4pepcl",kEafiO:"x972fbf",kWqL5O:"xgfja2r",kt9PQ7:"x1qhh985",kZ1KPB:"xyj58a3",kkrTdU:"x1ypdohk",$$css:true},md:{kLKAdn:"xyamay9",kGO01o:"x1l90r2v",$$css:true},sm:{kLKAdn:"xz9dl7a",kGO01o:"xsag5q8",$$css:true},fullWidth:{kzqmXN:"xh8yej3",$$css:true},flex1:{kzQI83:"x1iyjqo2",kCS8Yb:"x1r8uery",$$css:true},flex2:{kzQI83:"xgyuaek",kCS8Yb:"x1r8uery",$$css:true},labelMd:{kGuDYH:"x1j61zf2",k63SB2:"x1s688f",$$css:true},labelSm:{kGuDYH:"xif65rj",k63SB2:"xk50ysn",$$css:true},primaryBg:{kWkggS:"x1d0l9xw",$$css:true},secondaryBg:{kWkggS:"xz72fr2",$$css:true},onColorBg:{kWkggS:"xh4b7qa",$$css:true},primaryFg:{kMwMTN:"x8yag65",$$css:true},secondaryFg:{kMwMTN:"x1mior43",$$css:true},onColorFg:{kMwMTN:"x8yag65",$$css:true}};var BG={primary:styles.primaryBg,secondary:styles.secondaryBg,onColor:styles.onColorBg};var FG={primary:styles.primaryFg,secondary:styles.secondaryFg,onColor:styles.onColorFg};var Button=({title,onPress,variant='primary',size='md',fullWidth,flex})=>{return (0,react_jsx_runtime__rspack_import_2.jsx)("button",{onClick:onPress,...(0,react_strict_dom_runtime__rspack_import_3.merge)(react_strict_dom_runtime__rspack_import_3.defaultStyles.button,styles.base,size==='sm'?styles.sm:styles.md,BG[variant],fullWidth&&styles.fullWidth,flex===1&&styles.flex1,flex===2&&styles.flex2),type:"button",children:(0,react_jsx_runtime__rspack_import_2.jsx)("span",{...(0,react_strict_dom_runtime__rspack_import_3.merge)(react_strict_dom_runtime__rspack_import_3.defaultStyles.span,size==='sm'?styles.labelSm:styles.labelMd,FG[variant]),children:title})});};/* export default */ const __rspack_default_export = (Button);

},
"../sdk/src/components/ConnectionBanner.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react_strict_dom_runtime__rspack_import_4 = __webpack_require__("../../node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react-native@0.87_2d167a3d0161e3b7e64ae3803b774873/node_modules/react-strict-dom/dist/web/runtime.js");
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_strict_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-strict-dom/react-strict-dom");
/* import */ var _hooks_useConnectionStatus__rspack_import_2 = __webpack_require__("../sdk/src/hooks/useConnectionStatus.ts");
/* import */ var react_jsx_runtime__rspack_import_3 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
var styles={banner:{k1xSpc:"x78zum5",kXwgrk:"xdt5ytf",kGNEyG:"x6s0dn4",kWkggS:"xz72fr2",k8WAf4:"x1t0vds8",kg3NbH:"x1hr3lfm",$$css:true},text:{kMwMTN:"x1mior43",kGuDYH:"xfifm61",$$css:true}};var ConnectionBanner=()=>{var status=(0,_hooks_useConnectionStatus__rspack_import_2.useConnectionStatus)();if(status==='connected'){return null;}var label=status==='reconnecting'?'Reconnecting to market…':'Connecting to market…';return (0,react_jsx_runtime__rspack_import_3.jsx)("div",{...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.div,styles.banner),children:(0,react_jsx_runtime__rspack_import_3.jsx)("span",{...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.span,styles.text),children:label})});};/* export default */ const __rspack_default_export = (ConnectionBanner);

},
"../sdk/src/components/FlashRow.web.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react_strict_dom_runtime__rspack_import_4 = __webpack_require__("../../node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react-native@0.87_2d167a3d0161e3b7e64ae3803b774873/node_modules/react-strict-dom/dist/web/runtime.js");
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_strict_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-strict-dom/react-strict-dom");
/* import */ var _theme__rspack_import_2 = __webpack_require__("../sdk/src/theme.ts");
/* import */ var react_jsx_runtime__rspack_import_3 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
var styles={list:{k1xSpc:"x78zum5",kXwgrk:"x1q0g3np",kGNEyG:"x6s0dn4",kzqmXN:"xh8yej3",kogj98:"x1ghz6dp",k9WMMc:"xdpxx8g",kLKAdn:"xyinxu5",kGO01o:"x1g2khh7",kE3dHu:"xnm25rq",kpe85a:"xyfqnmn",kEafiO:"x972fbf",kZ1KPB:"xyj58a3",kWqL5O:"xgfja2r",kt9PQ7:"xso031l",kfdmCh:"x1q0q8m5",kL6WhQ:"xt3as09",kWkggS:"x1v911su",$$css:true},card:{k1xSpc:"x78zum5",kXwgrk:"x1q0g3np",kGNEyG:"x6s0dn4",kzqmXN:"xh8yej3",kogj98:"x1ghz6dp",k1K539:"xyorhqc",k9WMMc:"xdpxx8g",kmVPX3:"x1tamke2",kEafiO:"x972fbf",kWqL5O:"xgfja2r",kt9PQ7:"x1qhh985",kZ1KPB:"xyj58a3",kaIpWk:"x4pepcl",kWkggS:"x1v911su",$$css:true},pressable:{kkrTdU:"x1ypdohk",$$css:true}};var FlashRow=({variant='list',onPress,children})=>{var ref=react__rspack_import_0_default().useRef(null);var setRef=react__rspack_import_0_default().useCallback(el=>{ref.current=el;},[]);var flash=react__rspack_import_0_default().useCallback(up=>{ref.current?.animate([{backgroundColor:_theme__rspack_import_2.colors.transparent,offset:0},{backgroundColor:up?_theme__rspack_import_2.colors.priceUp:_theme__rspack_import_2.colors.priceDown,offset:0.2},{backgroundColor:_theme__rspack_import_2.colors.transparent,offset:1}],{duration:750,easing:'ease-out'});},[]);var content=children(flash);return onPress?(0,react_jsx_runtime__rspack_import_3.jsx)("button",{ref:setRef,...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.button,styles[variant],styles.pressable),onClick:onPress,type:"button",children:content}):(0,react_jsx_runtime__rspack_import_3.jsx)("div",{ref:setRef,...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.div,styles[variant]),children:content});};/* export default */ const __rspack_default_export = (FlashRow);

},
"../sdk/src/components/ScrollContainer.web.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react_strict_dom_runtime__rspack_import_3 = __webpack_require__("../../node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react-native@0.87_2d167a3d0161e3b7e64ae3803b774873/node_modules/react-strict-dom/dist/web/runtime.js");
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_strict_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-strict-dom/react-strict-dom");
/* import */ var react_jsx_runtime__rspack_import_2 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
var styles={scroll:{k1xSpc:"x78zum5",kXwgrk:"xdt5ytf",kzQI83:"x1iyjqo2",kmuXW:"xs83m0k",kCS8Yb:"x1r8uery",kORKVm:"x1odjw0f",$$css:true}};var ScrollContainer=({children})=>(0,react_jsx_runtime__rspack_import_2.jsx)("div",{...(0,react_strict_dom_runtime__rspack_import_3.merge)(react_strict_dom_runtime__rspack_import_3.defaultStyles.div,styles.scroll),children:children});/* export default */ const __rspack_default_export = (ScrollContainer);

},
"../sdk/src/hooks/useConnectionStatus.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useConnectionStatus: () => (useConnectionStatus)
});
/* import */ var _babel_runtime_helpers_slicedToArray__rspack_import_0 = __webpack_require__("../../node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _providers_PriceProvider__rspack_import_2 = __webpack_require__("../sdk/src/providers/PriceProvider.tsx");
var useConnectionStatus=()=>{var service=react__rspack_import_1_default().useContext(_providers_PriceProvider__rspack_import_2.PriceContext);var _React$useState=react__rspack_import_1_default().useState(()=>service.status),_React$useState2=(0,_babel_runtime_helpers_slicedToArray__rspack_import_0["default"])(_React$useState,2),status=_React$useState2[0],setStatus=_React$useState2[1];react__rspack_import_1_default().useEffect(()=>{return service.onStatusChange(setStatus);},[service]);return status;};

},
"../sdk/src/hooks/useHistoricalPrices.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useHistoricalPrices: () => (useHistoricalPrices)
});
/* import */ var _babel_runtime_helpers_slicedToArray__rspack_import_0 = __webpack_require__("../../node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
var KRAKEN_OHLC_URL='https://api.kraken.com/0/public/OHLC';var INTERVAL_MINUTES=1;var MAX_TICKS=60;function useHistoricalPrices(krakenPair){var _React$useState=react__rspack_import_1_default().useState([]),_React$useState2=(0,_babel_runtime_helpers_slicedToArray__rspack_import_0["default"])(_React$useState,2),prices=_React$useState2[0],setPrices=_React$useState2[1];react__rspack_import_1_default().useEffect(()=>{var pair=krakenPair.replace('/','');fetch(`${KRAKEN_OHLC_URL}?pair=${pair}&interval=${INTERVAL_MINUTES}`).then(res=>res.json()).then(json=>{if(json.error.length){return;}var resultKey=Object.keys(json.result).find(k=>k!=='last');if(!resultKey){return;}var closePrices=json.result[resultKey].slice(-MAX_TICKS).map(candle=>parseFloat(candle[4]));setPrices(closePrices);}).catch(()=>{});},[krakenPair]);return prices;}

},
"../sdk/src/hooks/usePrices.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAssetPrice: () => (useAssetPrice),
  usePrices: () => (usePrices)
});
/* import */ var _babel_runtime_helpers_slicedToArray__rspack_import_0 = __webpack_require__("../../node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _providers_PriceProvider__rspack_import_2 = __webpack_require__("../sdk/src/providers/PriceProvider.tsx");
/* import */ var _constants__rspack_import_3 = __webpack_require__("../sdk/src/constants.ts");
var useAssetPrice=symbol=>{var service=react__rspack_import_1_default().useContext(_providers_PriceProvider__rspack_import_2.PriceContext);var _React$useState=react__rspack_import_1_default().useState(()=>service.getPrice(symbol)??0),_React$useState2=(0,_babel_runtime_helpers_slicedToArray__rspack_import_0["default"])(_React$useState,2),price=_React$useState2[0],setPrice=_React$useState2[1];var _React$useTransition=react__rspack_import_1_default().useTransition(),_React$useTransition2=(0,_babel_runtime_helpers_slicedToArray__rspack_import_0["default"])(_React$useTransition,2),startTransition=_React$useTransition2[1];react__rspack_import_1_default().useEffect(()=>{return service.subscribe(symbol,nextPrice=>{startTransition(()=>{setPrice(nextPrice);});});},[service,symbol,startTransition]);return price;};var usePrices=()=>{var service=react__rspack_import_1_default().useContext(_providers_PriceProvider__rspack_import_2.PriceContext);var _React$useState3=react__rspack_import_1_default().useState(()=>{var initial={};_constants__rspack_import_3.ASSETS.forEach(({symbol})=>{var p=service.getPrice(symbol);if(p!==undefined){initial[symbol]=p;}});return initial;}),_React$useState4=(0,_babel_runtime_helpers_slicedToArray__rspack_import_0["default"])(_React$useState3,2),prices=_React$useState4[0],setPrices=_React$useState4[1];var _React$useTransition3=react__rspack_import_1_default().useTransition(),_React$useTransition4=(0,_babel_runtime_helpers_slicedToArray__rspack_import_0["default"])(_React$useTransition3,2),startTransition=_React$useTransition4[1];react__rspack_import_1_default().useEffect(()=>{var unsubscribers=_constants__rspack_import_3.ASSETS.map(({symbol})=>service.subscribe(symbol,price=>{startTransition(()=>{setPrices(prev=>({...prev,[symbol]:price}));});}));return()=>unsubscribers.forEach(unsub=>unsub());},[service,startTransition]);return prices;};

},
"../sdk/src/index.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ASSETS: () => (/* reexport safe */ _constants__rspack_import_6.ASSETS),
  ASSET_MAP: () => (/* reexport safe */ _constants__rspack_import_6.ASSET_MAP),
  Button: () => (/* reexport safe */ _components_Button__rspack_import_13["default"]),
  ConnectionBanner: () => (/* reexport safe */ _components_ConnectionBanner__rspack_import_10["default"]),
  FlashRow: () => (/* reexport safe */ _components_FlashRow__rspack_import_12["default"]),
  KRAKEN_PAIR_TO_SYMBOL: () => (/* reexport safe */ _constants__rspack_import_6.KRAKEN_PAIR_TO_SYMBOL),
  KrakenWebSocketService: () => (/* reexport safe */ _services_KrakenWebSocketService__rspack_import_1.KrakenWebSocketService),
  PriceContext: () => (/* reexport safe */ _providers_PriceProvider__rspack_import_2.PriceContext),
  PriceProvider: () => (/* reexport safe */ _providers_PriceProvider__rspack_import_2.PriceProvider),
  ScrollContainer: () => (/* reexport safe */ _components_ScrollContainer__rspack_import_11["default"]),
  colors: () => (/* reexport safe */ _theme__rspack_import_9.colors),
  formatPrice: () => (/* reexport safe */ _utils_formatPrice__rspack_import_7.formatPrice),
  formatValue: () => (/* reexport safe */ _utils_formatPrice__rspack_import_7.formatValue),
  getAssetIconUri: () => (/* reexport safe */ _utils_assetIcon__rspack_import_8.getAssetIconUri),
  getSharedDependencies: () => (/* reexport safe */ _sharedDeps__rspack_import_0.getSharedDependencies),
  useAssetPrice: () => (/* reexport safe */ _hooks_usePrices__rspack_import_3.useAssetPrice),
  useConnectionStatus: () => (/* reexport safe */ _hooks_useConnectionStatus__rspack_import_4.useConnectionStatus),
  useHistoricalPrices: () => (/* reexport safe */ _hooks_useHistoricalPrices__rspack_import_5.useHistoricalPrices),
  usePrices: () => (/* reexport safe */ _hooks_usePrices__rspack_import_3.usePrices)
});
/* import */ var _sharedDeps__rspack_import_0 = __webpack_require__("../sdk/src/sharedDeps.ts");
/* import */ var _services_KrakenWebSocketService__rspack_import_1 = __webpack_require__("../sdk/src/services/KrakenWebSocketService.ts");
/* import */ var _providers_PriceProvider__rspack_import_2 = __webpack_require__("../sdk/src/providers/PriceProvider.tsx");
/* import */ var _hooks_usePrices__rspack_import_3 = __webpack_require__("../sdk/src/hooks/usePrices.ts");
/* import */ var _hooks_useConnectionStatus__rspack_import_4 = __webpack_require__("../sdk/src/hooks/useConnectionStatus.ts");
/* import */ var _hooks_useHistoricalPrices__rspack_import_5 = __webpack_require__("../sdk/src/hooks/useHistoricalPrices.ts");
/* import */ var _constants__rspack_import_6 = __webpack_require__("../sdk/src/constants.ts");
/* import */ var _utils_formatPrice__rspack_import_7 = __webpack_require__("../sdk/src/utils/formatPrice.ts");
/* import */ var _utils_assetIcon__rspack_import_8 = __webpack_require__("../sdk/src/utils/assetIcon.ts");
/* import */ var _theme__rspack_import_9 = __webpack_require__("../sdk/src/theme.ts");
/* import */ var _components_ConnectionBanner__rspack_import_10 = __webpack_require__("../sdk/src/components/ConnectionBanner.tsx");
/* import */ var _components_ScrollContainer__rspack_import_11 = __webpack_require__("../sdk/src/components/ScrollContainer.web.tsx");
/* import */ var _components_FlashRow__rspack_import_12 = __webpack_require__("../sdk/src/components/FlashRow.web.tsx");
/* import */ var _components_Button__rspack_import_13 = __webpack_require__("../sdk/src/components/Button.web.tsx");


},
"../sdk/src/providers/PriceProvider.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PriceContext: () => (PriceContext),
  PriceProvider: () => (PriceProvider)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _services_KrakenWebSocketService__rspack_import_1 = __webpack_require__("../sdk/src/services/KrakenWebSocketService.ts");
/* import */ var react_jsx_runtime__rspack_import_2 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
var PriceContext=react__rspack_import_0_default().createContext(_services_KrakenWebSocketService__rspack_import_1.KrakenWebSocketService.shared);var PriceProvider=({children})=>{react__rspack_import_0_default().useEffect(()=>{_services_KrakenWebSocketService__rspack_import_1.KrakenWebSocketService.shared.connect();return()=>{_services_KrakenWebSocketService__rspack_import_1.KrakenWebSocketService.shared.disconnect();};},[]);return (0,react_jsx_runtime__rspack_import_2.jsx)(PriceContext.Provider,{value:_services_KrakenWebSocketService__rspack_import_1.KrakenWebSocketService.shared,children:children});};

},
"../sdk/src/services/KrakenWebSocketService.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KrakenWebSocketService: () => (KrakenWebSocketService)
});
/* import */ var _constants__rspack_import_0 = __webpack_require__("../sdk/src/constants.ts");
var WS_URL='wss://ws.kraken.com';var RECONNECT_DELAY_MS=2000;var MAX_RECONNECT_DELAY_MS=30000;class KrakenWebSocketService{ws=null;listeners=new Map();prices=new Map();reconnectDelay=RECONNECT_DELAY_MS;reconnectTimer=null;intentionalClose=false;_status='disconnected';statusListeners=new Set();static get shared(){if(!KrakenWebSocketService._instance){KrakenWebSocketService._instance=new KrakenWebSocketService();}return KrakenWebSocketService._instance;}get status(){return this._status;}onStatusChange(listener){this.statusListeners.add(listener);listener(this._status);return()=>this.statusListeners.delete(listener);}setStatus(status){this._status=status;this.statusListeners.forEach(l=>l(status));}connect(){if(this.ws?.readyState===WebSocket.OPEN){return;}this.intentionalClose=false;this.setStatus('connecting');this.ws=new WebSocket(WS_URL);this.ws.onopen=()=>{this.reconnectDelay=RECONNECT_DELAY_MS;this.setStatus('connected');this.ws?.send(JSON.stringify({event:'subscribe',pair:_constants__rspack_import_0.ASSETS.map(a=>a.krakenPair),subscription:{name:'ticker'}}));};this.ws.onmessage=event=>{this.handleMessage(event.data);};this.ws.onclose=()=>{if(!this.intentionalClose){this.setStatus('reconnecting');this.scheduleReconnect();}else{this.setStatus('disconnected');}};this.ws.onerror=()=>{this.ws?.close();};}disconnect(){this.intentionalClose=true;if(this.reconnectTimer){clearTimeout(this.reconnectTimer);this.reconnectTimer=null;}this.ws?.close();this.ws=null;}subscribe(symbol,listener){if(!this.listeners.has(symbol)){this.listeners.set(symbol,new Set());}this.listeners.get(symbol).add(listener);var current=this.prices.get(symbol);if(current!==undefined){listener(current);}return()=>{this.listeners.get(symbol)?.delete(listener);};}getPrice(symbol){return this.prices.get(symbol);}handleMessage(data){try{var msg=JSON.parse(data);if(!Array.isArray(msg)||msg[2]!=='ticker'){return;}var krakenPair=msg[3];var symbol=_constants__rspack_import_0.KRAKEN_PAIR_TO_SYMBOL[krakenPair];if(!symbol){return;}var _price=parseFloat(msg[1]?.c?.[0]);if(isNaN(_price)){return;}this.prices.set(symbol,_price);this.listeners.get(symbol)?.forEach(listener=>listener(_price));}catch{}}scheduleReconnect(){this.reconnectTimer=setTimeout(()=>{this.reconnectDelay=Math.min(this.reconnectDelay*2,MAX_RECONNECT_DELAY_MS);this.connect();},this.reconnectDelay);}}

},
"../sdk/src/sharedDeps.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getSharedDependencies: () => (getSharedDependencies)
});
/* import */ var _lib_dependencies_json__rspack_import_0 = __webpack_require__("../sdk/lib/dependencies.json");
function getSharedDependencies({eager}){return Object.fromEntries(Object.entries(_lib_dependencies_json__rspack_import_0).filter(([,props])=>props.shared!==false).map(([dep,{version}])=>[dep,{singleton:true,eager,version,requiredVersion:version}]));}

},
"../sdk/src/theme.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  colors: () => (colors)
});
var colors={background:'#0A0E1A',surface:'#131929',surfaceVariant:'#1C2438',primary:'#4F8EF7',onPrimary:'#FFFFFF',secondary:'#A0AEC0',onSurface:'#E2E8F0',onBackground:'#E2E8F0',priceUp:'rgba(46, 204, 113, 0.3)',priceDown:'rgba(231, 76, 60, 0.3)',priceUpText:'#2ECC71',priceDownText:'#E74C3C',border:'#2D3748',transparent:'rgba(0,0,0,0)'};

},
"../sdk/src/utils/assetIcon.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getAssetIconUri: () => (getAssetIconUri)
});
var ICON_BASE_URL='https://assets.coincap.io/assets/icons';var getAssetIconUri=symbol=>`${ICON_BASE_URL}/${symbol.toLowerCase()}@2x.png`;

},
"../sdk/src/utils/formatPrice.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatPrice: () => (formatPrice),
  formatValue: () => (formatValue)
});
var formatPrice=price=>{if(price===0){return'—';}return price.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:price>=1?2:6});};var formatValue=value=>value>0?value.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}):'—';

},
"../sdk/lib/dependencies.json"(module) {
module.exports = /*#__PURE__*/JSON.parse('{"react":{"name":"react","version":"19.2.8"},"react-native":{"name":"react-native","version":"0.87.1"},"@bottom-tabs/react-navigation":{"name":"@bottom-tabs/react-navigation","version":"1.4.0"},"@react-native-async-storage/async-storage":{"name":"@react-native-async-storage/async-storage","version":"3.1.1"},"@react-navigation/native":{"name":"@react-navigation/native","version":"7.4.1"},"@react-navigation/native-stack":{"name":"@react-navigation/native-stack","version":"7.19.2"},"react-native-bottom-tabs":{"name":"react-native-bottom-tabs","version":"1.4.0"},"react-native-safe-area-context":{"name":"react-native-safe-area-context","version":"5.10.0"},"react-native-screens":{"name":"react-native-screens","version":"4.28.0"},"@react-native-vector-icons/material-design-icons":{"name":"@react-native-vector-icons/material-design-icons","version":"13.1.4"},"super-app-showcase-sdk":{"name":"super-app-showcase-sdk","version":"0.0.2"},"@module-federation/enhanced":{"name":"@module-federation/enhanced","version":"2.9.1","shared":false},"react-native-edge-to-edge":{"name":"react-native-edge-to-edge","version":"1.8.2"},"react-native-reanimated":{"name":"react-native-reanimated","version":"4.7.0"},"react-native-worklets":{"name":"react-native-worklets","version":"0.13.0"},"react-native-gesture-handler":{"name":"react-native-gesture-handler","version":"3.3.0"},"@shopify/react-native-skia":{"name":"@shopify/react-native-skia","version":"2.12.0"},"victory-native":{"name":"victory-native","version":"42.0.1"},"@gorhom/bottom-sheet":{"name":"@gorhom/bottom-sheet","version":"5.2.14"}}')

},

}]);