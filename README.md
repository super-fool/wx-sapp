WebView就是一个内置的浏览器，微信中能打开网页就是因为其内置了一个WebView容器。

WeiXin JS接口封装了**原生接口**作为**微信原生接口**提供给我们进行调用。WeiXinJSBridge API就属于其中的一个接口。

2015年，微信发布了一整套网页开发工具：JS-SDK.(SDK = software development kit)

JS-SDK 是对 WeiXinJSBridge API 的一个包装或者说是他的超集。

微信为解决受屏加载过长(即白屏时间),从而在JS-SDK中新增了一个功能：**微信Web资源离线存储**。
这个功能只针对公众号中的文章，将这些文章中的静态资源存储在微信本地，每个公众号最多可缓存5M.
但是对于CSS，JS加载过多的页面时，还是会有白屏问题，而且还会存在页面切换生硬和点击延迟等。

为了提供更快的加载速度，更强大的能力，更高效的开发，便产生了**小程序**。

## 小程序与网页的区别
1. 小程序的渲染层和逻辑层是分开的，逻辑层是运行在JSCore中的，无法去调用DOM/BOM API及JQ和VUE等包含DOM的框架库。
2. 小程序所在意的兼容性只有IOS和Android.
 
运行环境 | 逻辑层 | 渲染层 
-  | - | - 
IOS     | JSCore | WKWebView 
Android |  V8    | Chromium  
开发工具 | NWJS   | chrome webview 




