"use strict";
(self["rspackChunksas_wallet_web"] = self["rspackChunksas_wallet_web"] || []).push([["src_navigation_MainNavigator_tsx"], {
"../sdk/src/constants.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ASSETS: () => (ASSETS),
  ASSET_MAP: () => (ASSET_MAP),
  KRAKEN_PAIR_TO_SYMBOL: () => (KRAKEN_PAIR_TO_SYMBOL)
});
var ASSETS=[{symbol:'BTC',name:'Bitcoin',krakenPair:'XBT/USD'},{symbol:'ETH',name:'Ethereum',krakenPair:'ETH/USD'},{symbol:'SOL',name:'Solana',krakenPair:'SOL/USD'},{symbol:'XRP',name:'XRP',krakenPair:'XRP/USD'},{symbol:'ADA',name:'Cardano',krakenPair:'ADA/USD'}];var ASSET_MAP=Object.fromEntries(ASSETS.map(a=>[a.symbol,a]));var KRAKEN_PAIR_TO_SYMBOL={'XBT/USD':'BTC','ETH/USD':'ETH','SOL/USD':'SOL','XRP/USD':'XRP','ADA/USD':'ADA'};

},
"../sdk/src/web-nav/linking.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DEFAULT_PATH: () => (DEFAULT_PATH),
  PARAM_ADAPTERS: () => (PARAM_ADAPTERS),
  ROUTES: () => (ROUTES),
  buildPath: () => (buildPath)
});
/* import */ var _constants__rspack_import_0 = __webpack_require__("../sdk/src/constants.ts");
var ROUTES={Trading:'/trading',Wallet:'/wallet',Account:'/account',AssetList:'/trading',AssetDetails:'/trading/asset/:symbol',TradeSuccess:'/trading/trade-success/:symbol',WalletMain:'/wallet',AccountMain:'/account'};var DEFAULT_PATH='/trading';var PARAM_ADAPTERS={AssetDetails:{toPath:params=>({symbol:params.asset.symbol}),fromPath:(pathParams,state)=>state?.params??{asset:_constants__rspack_import_0.ASSET_MAP[pathParams.symbol]}},TradeSuccess:{toPath:params=>({symbol:params.symbol}),fromPath:(pathParams,state)=>state?.params??{symbol:pathParams.symbol}}};function buildPath(name,params){var pattern=ROUTES[name]??'/';var adapter=PARAM_ADAPTERS[name];if(!adapter||!params){return pattern;}var pathParams=adapter.toPath(params);return pattern.replace(/:([A-Za-z0-9_]+)/g,(_match,key)=>encodeURIComponent(pathParams[key]??''));}

},
"../sdk/src/web-nav/native-stack.web.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createNativeStackNavigator: () => (createNativeStackNavigator)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_router_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-router-dom/react-router-dom");
/* import */ var _native_web__rspack_import_2 = __webpack_require__("../sdk/src/web-nav/native.web.tsx");
/* import */ var _linking__rspack_import_3 = __webpack_require__("../sdk/src/web-nav/linking.ts");
/* import */ var react_jsx_runtime__rspack_import_4 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
function Header({title,canGoBack,onBack,backgroundColor,tintColor,titleColor}){return (0,react_jsx_runtime__rspack_import_4.jsxs)("div",{style:{display:'flex',flexDirection:'row',alignItems:'center',height:56,paddingLeft:8,paddingRight:8,backgroundColor,flexShrink:0},children:[canGoBack?(0,react_jsx_runtime__rspack_import_4.jsx)("button",{onClick:onBack,"aria-label":"Back",style:{border:0,background:'transparent',color:tintColor,fontSize:28,lineHeight:'28px',cursor:'pointer',width:40,height:40},children:'‹'}):(0,react_jsx_runtime__rspack_import_4.jsx)("div",{style:{width:8}}),(0,react_jsx_runtime__rspack_import_4.jsx)("span",{style:{color:titleColor,fontSize:18,fontWeight:600,marginLeft:8},children:title})]});}function createNativeStackNavigator(){var Screen=()=>null;var Navigator=({screenOptions,children})=>{var location=(0,react_router_dom__rspack_import_1.useLocation)();var navigation=(0,_native_web__rspack_import_2.useRouterNavigation)();var theme=(0,_native_web__rspack_import_2.useNavTheme)();var screens=react__rspack_import_0.Children.toArray(children).filter(react__rspack_import_0.isValidElement).map(child=>{var p=child.props;return{name:p.name,component:p.component,options:p.options};});var active;var matchParams={};var bestLen=-1;for(var s of screens){var pattern=_linking__rspack_import_3.ROUTES[s.name];if(!pattern){continue;}var m=(0,react_router_dom__rspack_import_1.matchPath)({path:pattern,end:true},location.pathname);if(m&&pattern.length>bestLen){active=s;matchParams=m.params;bestLen=pattern.length;}}if(!active&&screens.length>0){active=screens[0];}if(!active){return null;}var adapter=_linking__rspack_import_3.PARAM_ADAPTERS[active.name];var params=adapter?adapter.fromPath(matchParams,location.state):location.state?.params??{};var route={name:active.name,params};var resolved={...screenOptions,...(typeof active.options==='function'?active.options({route}):active.options)};var isInitial=active.name===screens[0].name;var showHeader=resolved.headerShown!==false;var Component=active.component;var nav=navigation;return (0,react_jsx_runtime__rspack_import_4.jsxs)("div",{style:{display:'flex',flexDirection:'column',flexGrow:1,minHeight:0,backgroundColor:resolved.contentStyle?.backgroundColor??theme.colors.background},children:[showHeader?(0,react_jsx_runtime__rspack_import_4.jsx)(Header,{title:resolved.title??active.name,canGoBack:!isInitial,onBack:nav.goBack,backgroundColor:resolved.headerStyle?.backgroundColor??theme.colors.card,tintColor:resolved.headerTintColor??theme.colors.text,titleColor:resolved.headerTitleStyle?.color??resolved.headerTintColor??theme.colors.text}):null,(0,react_jsx_runtime__rspack_import_4.jsx)("div",{style:{display:'flex',flexDirection:'column',flexGrow:1,minHeight:0},children:(0,react_jsx_runtime__rspack_import_4.jsx)(_native_web__rspack_import_2.NavContext.Provider,{value:{navigation:nav,route},children:(0,react_jsx_runtime__rspack_import_4.jsx)(Component,{navigation:nav,route:route})})})]});};return{Navigator,Screen};}

},
"../sdk/src/web-nav/native.web.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DarkTheme: () => (DarkTheme),
  NavContext: () => (NavContext),
  NavigationContainer: () => (NavigationContainer),
  useNavTheme: () => (useNavTheme),
  useNavigation: () => (useNavigation),
  useRoute: () => (useRoute),
  useRouterNavigation: () => (useRouterNavigation)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_router_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-router-dom/react-router-dom");
/* import */ var _linking__rspack_import_2 = __webpack_require__("../sdk/src/web-nav/linking.ts");
/* import */ var react_jsx_runtime__rspack_import_3 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
var DarkTheme={dark:true,colors:{primary:'#4F8EF7',background:'#0A0E1A',card:'#131929',text:'#E2E8F0',border:'#2D3748',notification:'#E74C3C'}};var ThemeContext=react__rspack_import_0.createContext(DarkTheme);var useNavTheme=()=>react__rspack_import_0.useContext(ThemeContext);var NavContext=react__rspack_import_0.createContext(null);function useNavigation(){var ctx=react__rspack_import_0.useContext(NavContext);if(!ctx){throw new Error('useNavigation must be used inside a navigator');}return ctx.navigation;}function useRoute(){var ctx=react__rspack_import_0.useContext(NavContext);if(!ctx){throw new Error('useRoute must be used inside a navigator');}return ctx.route;}function useRouterNavigation(){var navigate=(0,react_router_dom__rspack_import_1.useNavigate)();return react__rspack_import_0.useMemo(()=>({navigate:(name,params)=>navigate((0,_linking__rspack_import_2.buildPath)(name,params),{state:{params}}),goBack:()=>navigate(-1),setParams:()=>{}}),[navigate]);}var Root=({theme,children,onReady})=>{react__rspack_import_0.useEffect(()=>{onReady?.();},[onReady]);var value=theme??DarkTheme;return (0,react_jsx_runtime__rspack_import_3.jsx)(ThemeContext.Provider,{value:value,children:(0,react_jsx_runtime__rspack_import_3.jsx)("div",{style:{display:'flex',flexDirection:'column',height:'100%',minHeight:0,flexGrow:1,backgroundColor:value.colors.background},children:children})});};var NavigationContainer=({theme,children,onReady})=>{var inRouter=(0,react_router_dom__rspack_import_1.useInRouterContext)();var content=(0,react_jsx_runtime__rspack_import_3.jsx)(Root,{theme:theme,onReady:onReady,children:children});return inRouter?content:(0,react_jsx_runtime__rspack_import_3.jsx)(react_router_dom__rspack_import_1.BrowserRouter,{children:content});};

},
"./src/components/HoldingRow.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react_strict_dom_runtime__rspack_import_5 = __webpack_require__("../../node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react-native@0.87_2d167a3d0161e3b7e64ae3803b774873/node_modules/react-strict-dom/dist/web/runtime.js");
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_strict_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-strict-dom/react-strict-dom");
/* import */ var super_app_showcase_sdk__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/super-app-showcase-sdk/super-app-showcase-sdk");
/* import */ var _ValueCell__rspack_import_3 = __webpack_require__("./src/components/ValueCell.tsx");
/* import */ var react_jsx_runtime__rspack_import_4 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
var styles={icon:{kzqmXN:"x187nhsf",kZKoxP:"xn3w4p2",kaIpWk:"x13pz1uv",kWkggS:"xz72fr2",$$css:true},info:{k1xSpc:"x78zum5",kXwgrk:"xdt5ytf",kzQI83:"x1iyjqo2",kmuXW:"xs83m0k",kCS8Yb:"x1r8uery",koQZXg:"x1tpqehw",kOIVth:"x1ed6fcf",$$css:true},name:{kMwMTN:"x6yczcj",kGuDYH:"x1j61zf2",k63SB2:"x1s688f",$$css:true},quantity:{kMwMTN:"x1mior43",kGuDYH:"x4z9k3i",$$css:true}};var HoldingRow=({holding,asset})=>{return (0,react_jsx_runtime__rspack_import_4.jsx)(super_app_showcase_sdk__rspack_import_2.FlashRow,{variant:"card",children:flash=>(0,react_jsx_runtime__rspack_import_4.jsxs)(react_jsx_runtime__rspack_import_4.Fragment,{children:[(0,react_jsx_runtime__rspack_import_4.jsx)("img",{src:(0,super_app_showcase_sdk__rspack_import_2.getAssetIconUri)(holding.symbol),alt:asset.name,...(0,react_strict_dom_runtime__rspack_import_5.merge)(react_strict_dom_runtime__rspack_import_5.defaultStyles.img,styles.icon)}),(0,react_jsx_runtime__rspack_import_4.jsxs)("div",{...(0,react_strict_dom_runtime__rspack_import_5.merge)(react_strict_dom_runtime__rspack_import_5.defaultStyles.div,styles.info),children:[(0,react_jsx_runtime__rspack_import_4.jsx)("span",{...(0,react_strict_dom_runtime__rspack_import_5.merge)(react_strict_dom_runtime__rspack_import_5.defaultStyles.span,styles.name),children:asset.name}),(0,react_jsx_runtime__rspack_import_4.jsxs)("span",{...(0,react_strict_dom_runtime__rspack_import_5.merge)(react_strict_dom_runtime__rspack_import_5.defaultStyles.span,styles.quantity),children:[holding.quantity," ",holding.symbol]})]}),(0,react_jsx_runtime__rspack_import_4.jsx)(_ValueCell__rspack_import_3["default"],{symbol:holding.symbol,quantity:holding.quantity,flash:flash})]})});};/* export default */ const __rspack_default_export = (react__rspack_import_0_default().memo(HoldingRow));

},
"./src/components/List.web.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react_strict_dom_runtime__rspack_import_3 = __webpack_require__("../../node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react-native@0.87_2d167a3d0161e3b7e64ae3803b774873/node_modules/react-strict-dom/dist/web/runtime.js");
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_strict_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-strict-dom/react-strict-dom");
/* import */ var react_jsx_runtime__rspack_import_2 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
var styles={scroll:{k1xSpc:"x78zum5",kXwgrk:"xdt5ytf",kzQI83:"x1iyjqo2",kmuXW:"xs83m0k",kCS8Yb:"x1r8uery",kORKVm:"x1odjw0f",$$css:true},content:{kmVPX3:"x1tamke2",$$css:true}};var List=({data,keyExtractor,renderItem,header})=>(0,react_jsx_runtime__rspack_import_2.jsx)("div",{...(0,react_strict_dom_runtime__rspack_import_3.merge)(react_strict_dom_runtime__rspack_import_3.defaultStyles.div,styles.scroll),children:(0,react_jsx_runtime__rspack_import_2.jsxs)("div",{...(0,react_strict_dom_runtime__rspack_import_3.merge)(react_strict_dom_runtime__rspack_import_3.defaultStyles.div,styles.content),children:[header,data.map(item=>(0,react_jsx_runtime__rspack_import_2.jsx)((react__rspack_import_0_default().Fragment),{children:renderItem({item})},keyExtractor(item)))]})});/* export default */ const __rspack_default_export = (List);

},
"./src/components/TotalBalance.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react_strict_dom_runtime__rspack_import_5 = __webpack_require__("../../node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react-native@0.87_2d167a3d0161e3b7e64ae3803b774873/node_modules/react-strict-dom/dist/web/runtime.js");
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_strict_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-strict-dom/react-strict-dom");
/* import */ var super_app_showcase_sdk__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/super-app-showcase-sdk/super-app-showcase-sdk");
/* import */ var _constants__rspack_import_3 = __webpack_require__("./src/constants.ts");
/* import */ var react_jsx_runtime__rspack_import_4 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
var styles={balanceCard:{k1xSpc:"x78zum5",kXwgrk:"xdt5ytf",kGNEyG:"x6s0dn4",kOIVth:"x17d4w8g",kWkggS:"x405yxy",kaIpWk:"xgqmno8",kmVPX3:"xggk2y7",$$css:true},balanceLabel:{kMwMTN:"x1mior43",kGuDYH:"xif65rj",$$css:true},balanceAmount:{kMwMTN:"x6yczcj",kGuDYH:"xqozcyj",k63SB2:"x1xlr1w8",kcqcaj:"xss6m8b",$$css:true},balanceSubtext:{kMwMTN:"x1mior43",kGuDYH:"xfifm61",$$css:true}};var TotalBalance=()=>{var prices=(0,super_app_showcase_sdk__rspack_import_2.usePrices)();var total=_constants__rspack_import_3.HOLDINGS.reduce((sum,h)=>sum+h.quantity*(prices[h.symbol]??0),0);return (0,react_jsx_runtime__rspack_import_4.jsxs)("div",{...(0,react_strict_dom_runtime__rspack_import_5.merge)(react_strict_dom_runtime__rspack_import_5.defaultStyles.div,styles.balanceCard),children:[(0,react_jsx_runtime__rspack_import_4.jsx)("span",{...(0,react_strict_dom_runtime__rspack_import_5.merge)(react_strict_dom_runtime__rspack_import_5.defaultStyles.span,styles.balanceLabel),children:"Total Portfolio Value"}),(0,react_jsx_runtime__rspack_import_4.jsx)("span",{...(0,react_strict_dom_runtime__rspack_import_5.merge)(react_strict_dom_runtime__rspack_import_5.defaultStyles.span,styles.balanceAmount),children:(0,super_app_showcase_sdk__rspack_import_2.formatValue)(total)}),(0,react_jsx_runtime__rspack_import_4.jsx)("span",{...(0,react_strict_dom_runtime__rspack_import_5.merge)(react_strict_dom_runtime__rspack_import_5.defaultStyles.span,styles.balanceSubtext),children:"Updates in real-time"})]});};/* export default */ const __rspack_default_export = (TotalBalance);

},
"./src/components/ValueCell.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react_strict_dom_runtime__rspack_import_4 = __webpack_require__("../../node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react-native@0.87_2d167a3d0161e3b7e64ae3803b774873/node_modules/react-strict-dom/dist/web/runtime.js");
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_strict_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-strict-dom/react-strict-dom");
/* import */ var super_app_showcase_sdk__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/super-app-showcase-sdk/super-app-showcase-sdk");
/* import */ var react_jsx_runtime__rspack_import_3 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
var styles={valueContainer:{k1xSpc:"x78zum5",kXwgrk:"xdt5ytf",kGNEyG:"xuk3077",kOIVth:"x1ed6fcf",$$css:true},value:{kMwMTN:"x6yczcj",kGuDYH:"x1j61zf2",k63SB2:"x1s688f",kcqcaj:"xss6m8b",$$css:true},price:{kMwMTN:"x1mior43",kGuDYH:"xfifm61",kcqcaj:"xss6m8b",$$css:true}};var ValueCell=react__rspack_import_0.memo(({symbol,quantity,flash})=>{var price=(0,super_app_showcase_sdk__rspack_import_2.useAssetPrice)(symbol);var value=price*quantity;var prevRef=react__rspack_import_0.useRef(0);react__rspack_import_0.useEffect(()=>{if(prevRef.current!==0&&value!==prevRef.current){flash(value>prevRef.current);}prevRef.current=value;},[value,flash]);return (0,react_jsx_runtime__rspack_import_3.jsxs)("div",{...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.div,styles.valueContainer),children:[(0,react_jsx_runtime__rspack_import_3.jsx)("span",{...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.span,styles.value),children:(0,super_app_showcase_sdk__rspack_import_2.formatValue)(value)}),(0,react_jsx_runtime__rspack_import_3.jsx)("span",{...(0,react_strict_dom_runtime__rspack_import_4.merge)(react_strict_dom_runtime__rspack_import_4.defaultStyles.span,styles.price),children:(0,super_app_showcase_sdk__rspack_import_2.formatPrice)(price)})]});});/* export default */ const __rspack_default_export = (ValueCell);

},
"./src/constants.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  HOLDINGS: () => (HOLDINGS)
});
var HOLDINGS=[{symbol:'BTC',quantity:1},{symbol:'ETH',quantity:0.5}];

},
"./src/navigation/MainNavigator.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _react_navigation_native_stack__rspack_import_1 = __webpack_require__("../sdk/src/web-nav/native-stack.web.tsx");
/* import */ var _screens_WalletScreen__rspack_import_2 = __webpack_require__("./src/screens/WalletScreen.tsx");
/* import */ var super_app_showcase_sdk__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/super-app-showcase-sdk/super-app-showcase-sdk");
/* import */ var react_jsx_runtime__rspack_import_4 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
var Stack=(0,_react_navigation_native_stack__rspack_import_1.createNativeStackNavigator)();var MainNavigator=()=>{return (0,react_jsx_runtime__rspack_import_4.jsx)(Stack.Navigator,{screenOptions:{headerStyle:{backgroundColor:super_app_showcase_sdk__rspack_import_3.colors.background},headerTintColor:super_app_showcase_sdk__rspack_import_3.colors.onBackground,contentStyle:{backgroundColor:super_app_showcase_sdk__rspack_import_3.colors.background}},children:(0,react_jsx_runtime__rspack_import_4.jsx)(Stack.Screen,{name:"WalletMain",component:_screens_WalletScreen__rspack_import_2["default"],options:{title:'My Wallet'}})});};/* export default */ const __rspack_default_export = (MainNavigator);

},
"./src/screens/WalletScreen.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react_strict_dom_runtime__rspack_import_8 = __webpack_require__("../../node_modules/.pnpm/react-strict-dom@0.0.54_postcss@8.5.32_react-dom@19.2.8_react@19.2.8__react-native@0.87_2d167a3d0161e3b7e64ae3803b774873/node_modules/react-strict-dom/dist/web/runtime.js");
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var react_strict_dom__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-strict-dom/react-strict-dom");
/* import */ var super_app_showcase_sdk__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/super-app-showcase-sdk/super-app-showcase-sdk");
/* import */ var _constants__rspack_import_3 = __webpack_require__("./src/constants.ts");
/* import */ var _components_HoldingRow__rspack_import_4 = __webpack_require__("./src/components/HoldingRow.tsx");
/* import */ var _components_List__rspack_import_5 = __webpack_require__("./src/components/List.web.tsx");
/* import */ var _components_TotalBalance__rspack_import_6 = __webpack_require__("./src/components/TotalBalance.tsx");
/* import */ var react_jsx_runtime__rspack_import_7 = __webpack_require__("../../node_modules/.pnpm/react@19.2.8/node_modules/react/jsx-runtime.js");
var styles={container:{k1xSpc:"x78zum5",kXwgrk:"xdt5ytf",kzQI83:"x1iyjqo2",kmuXW:"xs83m0k",kCS8Yb:"x1r8uery",kWkggS:"xc972ru",$$css:true},header:{k1xSpc:"x78zum5",kXwgrk:"xdt5ytf",kOIVth:"x1665zp3",k1K539:"x1e56ztr",$$css:true},sectionTitle:{kMwMTN:"x6yczcj",kGuDYH:"xosj86m",k63SB2:"x1s688f",$$css:true}};var renderHolding=({item})=>(0,react_jsx_runtime__rspack_import_7.jsx)(_components_HoldingRow__rspack_import_4["default"],{holding:item,asset:super_app_showcase_sdk__rspack_import_2.ASSET_MAP[item.symbol]});var WalletScreen=()=>{return (0,react_jsx_runtime__rspack_import_7.jsxs)("div",{...(0,react_strict_dom_runtime__rspack_import_8.merge)(react_strict_dom_runtime__rspack_import_8.defaultStyles.div,styles.container),children:[(0,react_jsx_runtime__rspack_import_7.jsx)(super_app_showcase_sdk__rspack_import_2.ConnectionBanner,{}),(0,react_jsx_runtime__rspack_import_7.jsx)(_components_List__rspack_import_5["default"],{data:_constants__rspack_import_3.HOLDINGS,keyExtractor:item=>item.symbol,renderItem:renderHolding,header:(0,react_jsx_runtime__rspack_import_7.jsxs)("div",{...(0,react_strict_dom_runtime__rspack_import_8.merge)(react_strict_dom_runtime__rspack_import_8.defaultStyles.div,styles.header),children:[(0,react_jsx_runtime__rspack_import_7.jsx)(_components_TotalBalance__rspack_import_6["default"],{}),(0,react_jsx_runtime__rspack_import_7.jsx)("span",{...(0,react_strict_dom_runtime__rspack_import_8.merge)(react_strict_dom_runtime__rspack_import_8.defaultStyles.span,styles.sectionTitle),children:"My Holdings"})]})})]});};/* export default */ const __rspack_default_export = (WalletScreen);

},

}]);