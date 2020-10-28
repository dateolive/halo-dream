## Halo-dream 博客小程序

本项目为小程序入门项目，适合练手，但需要一定的前端基础及一点后端知识。

后续还会陆续开发更多功能，由于是第一个版本 **Halo-dream v1.0.0** 会存在不少问题欢迎大家多给我提 **Issues或者Pull requests** 

项目使用过程中有问题可以联系我``微信:15013962014 ``

> ✍ Halo-dream 一款基于wordpress的个人独立博客系统

[![Github](https://img.shields.io/badge/Author-dateolive-FF4500.svg?style=flat-square)](https://github.com/dateolive)
[![](https://img.shields.io/github/languages/code-size/dateolive/halo-dream.svg?style=flat-square)](https://github.com/dateolive/halo-dream)
[![GitHub LICENSE](https://img.shields.io/github/license/dateolive/halo-dream.svg?style=flat-square)](https://github.com/dateolive/halo-dream/blob/main/LICENSE)
[![star](https://img.shields.io/github/stars/dateolive/halo-dream.svg?label=Stars&style=social)](https://github.com/dateolive/halo-dream)


------------------------------

<details><summary>目录</summary>

- [简介](#简介)
- [快速开始](#快速开始)
- [文档](#文档)
- [演示](#演示)
- [许可证](#许可证)
- [后续功能](#后续功能)
- [感谢](#感谢)
- [捐赠](#捐赠)

</details>

## 简介

**Halo-dream**，基于WordPress和WP REST API的博客小程序，界面简洁，轻快，功能强大

> ✍ Halo-dream 一款基于wordpress的个人独立博客系统
> 项目地址：https://github.com/dateolive/halo-dream

## 快速开始

**注：开源不易，使用请说明小程序来源**

```bash
git clone https://github.com/dateolive/halo-dream.git
```

代码下载后，用小程序 IDE 打开后即可使用，修改service文件夹下的config.js中的BASEURL。

**如果需要真机调试，请在打开项目时，填上自己的小程序 id**


## 文档

修改``config.js``文件的BASEURL变量，改为你的 **wordpress** 博客的地址，在使用之前请确认是否装有WP REST API插件和REST API TO MiniProgram插件

**注：网址必须是HTTPS的，且在设置小程序id后，把自己博客的地址``如：https://www.datealive.top``，``https://datealive.top``，还有`` https://html2wxml.qwqoffice.com ``添加到微信公众平台的 ``request 合法域名``中**

```
const BASEURL="https://datealive.top" //你的博客地址
export{
  BASEURL
}
```
> 如果需要更改部分图片，可以修改对应的wxml页面的图片url，或者images下的图片


> 文档正在不断完善中，遇到问题请加作者微信提问或者提交 [**Issues**](https://github.com/dateolive/halo-dream/issues) 等你吐槽...


## 小程序演示

![Halo-Dream](https://www.datealive.top/wp-content/uploads/2020/10/16037043811.png "Halo-Dream")


## 许可证

[![GitHub LICENSE](https://img.shields.io/github/license/dateolive/halo-dream.svg?style=flat-square)](https://github.com/dateolive/halo-dream/blob/main/LICENSE)

> Halo-dream使用Apache License 2.0协议开源，请尽量遵守开源协议。

## 实现功能

- [x] 文章轮播
- [x] 个人名片
- [x] 博文展示
- [x] 评论展示
- [x] 搜索文章功能
- [x] 分类功能
- [x] 热点文章排行榜
- [x] 友链显示功能
- [x] 文章评论功能
- [x] b站追番页面

## 其他功能有idea待实现

## 项目更新日志

### 2020年10月28日 更新版本至 v1.3.0

* b站追番追剧页面实现
* 评论区优化
* 登录功能优化

### 2020年10月27日 更新版本至 v1.2.0

* 评论功能实现
* 完善评论区头像问题

### 2020年10月26日 更新版本至 v1.1.0

* 项目添加动画特效
* 文章详情页面优化
* 友情链接开发

## 感谢

感谢下面这些项目：

- **[ColorUI](https://github.com/weilanwl/ColorUI)：鲜亮的高饱和色彩，专注视觉的小程序组件库**
- **[html2wxml](https://github.com/qwqoffice/html2wxml)：用于微信小程序的HTML和Markdown格式的富文本渲染组件，支持代码高亮**

## 捐赠

> 如果 **Halo-dream** 帮到你在微信装 **X** ，可以众筹请作者一杯奶茶（注：捐赠请备注名称哦）

| 支付宝  | 微信  |
| :------------: | :------------: |
| <img src="https://imapi.datealive.top/zanshang/img/alipayimg.jpg" width="150"/>  | <img src="https://imapi.datealive.top/zanshang/img/weipayimg.jpg" width="150" />  |

## 感谢以下捐赠者

> 作者会加油的  ღ( ´･ᴗ･` )比心


| 日期 | 名称 | 方式 | 金额 | 留言 |
| :------------: | :------------: | :------------: | :------------: | :------------: |
| 2020-10-26 | * chang | 微信 | 5.00 | 赞一波 |




## Stargazers over time
[![Stargazers over time](https://starchart.cc/dateolive/halo-dream.svg)](https://starchart.cc/dateolive/halo-dream)
