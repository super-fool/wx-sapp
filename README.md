WebView就是一个内置的浏览器，微信中能打开网页就是因为其内置了一个WebView容器。

WeiXin JS接口封装了**原生接口**作为**微信原生接口**提供给我们进行调用。WeiXinJSBridge API就属于其中的一个接口。

2015年，微信发布了一整套网页开发工具：JS-SDK.(SDK = software development kit)

JS-SDK 是对 WeiXinJSBridge API 的一个包装或者说是他的超集。

微信为解决受屏加载过长(即白屏时间),从而在JS-SDK中新增了一个功能：**微信Web资源离线存储**。
这个功能只针对公众号中的文章，将这些文章中的静态资源存储在微信本地，每个公众号最多可缓存5M.
但是对于CSS，JS加载过多的页面时，还是会有白屏问题，而且还会存在页面切换生硬和点击延迟等。

为了提供更快的加载速度，更强大的能力，更高效的开发，便产生了**小程序**。

> 小程序与网页的区别:
1. 小程序的渲染层和逻辑层是分开的，逻辑层是运行在JSCore中的，无法去调用DOM/BOM API及JQ和VUE等包含DOM的框架库。
2. 小程序所在意的兼容性只有IOS和Android.
 
运行环境 | 逻辑层 | 渲染层 
-  | - | - 
IOS     | JSCore | WKWebView 
Android |  V8    | Chromium  
开发工具 | NWJS   | chrome webview 


# 小程序

## 架构

### JSON配置
JSON 是一种数据格式，我们通常用来表示**静态配置**

`app.json`：全局配置清单，包括页面路径，通用样式，[参考配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)

### app.json
> pages: 页面路径
是一个数组, 第一项作为首页.

- window: 全局默认配置

- plugins: 声明需要的插件,需要在**设置-第三方服务-插件管理**进行配置;可以配合 subpackages进行分包加载插件; functionalPages:来声明开发功能页.

- preloadRule: 进行分包预下载.

- navigateToMiniProgramAppIdList: 跳转至其他小程序.

- usingComponents: 声明全局自定义组件.

- permission: 接口权限相关设置.

### project.config.json

个性化配置清单
[参考配置](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html)



## WXML 模板
是一个被封装了多个微信标签(组件)的*HTML模板*, 例如:`view,button`; 在这些标签中也封装了微信的标签属性,例如:`wx:if`

> 目的就是:**让开发人员只关注状态管理和业务逻辑**,实现`OOP/COP`模式,而不是`POP`模式.

## WXSS 模板
样式属性与`CSS`一致, 只不过新增了`rpx`尺寸单位. 减少了适配性的问题.

## 框架

小程序分为了**逻辑层**和**视图层**

### 逻辑层

#### 全局函数：app.js
小程序进入后，第一步会调用`app.js`全局脚本。在里面只有一个`App(options)`函数,里面注入了以下几个监听函数及一个全局对象：
```js
onLaunch(){},// init
onUnlaunch(){}, // destory
onShow(){}, // inited & show
onHide(){}, // hide
onPageNotFound(){}, // not found
userInfoReadyCallback(){}, // 这个
globalData: {}, // 全局数据
```
所有函数的this都是指向该`App(options)`这个参数。

通过`getApp()`获取全局实例。

#### 页面函数：page.js
