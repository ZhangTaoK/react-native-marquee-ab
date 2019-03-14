# react-native-marquee-ab

[![npm](https://img.shields.io/npm/v/react-native-marquee-ab.svg)](https://www.npmjs.com/package/react-native-marquee-ab)
[![npm](https://img.shields.io/npm/dm/react-native-marquee-ab.svg)](https://www.npmjs.com/package/react-native-marquee-ab)
[![npm](https://img.shields.io/npm/dt/react-native-marquee-ab.svg)](https://www.npmjs.com/package/react-native-marquee-ab)
[![npm](https://img.shields.io/npm/l/react-native-marquee-ab.svg)](https://github.com/ZhangTaoK/react-native-marquee-ab/blob/master/LICENSE)


[ReactNative](https://github.com/facebook/react-native) Marquee，Support iOS and Android。

使用了react-native中的Animated组件，利用纯js代码，实现Marquee(走马灯)组件。

### 实现功能
* 支持文本的水平滚动（向左、向右）
* 支持文本的竖直滚动（向上、向下）
* 支持多条文本数据
* 支持每一条文本数据的点击事件
* 支持自定义滚动速度
* 支持自定义样式
* 支持竖直滚动在头部添加自定义view

其他请阅读本组件支持的Api

### 事例演示

#### Version 1.2.6
![image](https://github.com/ZhangTaoK/react-native-marquee-ab/blob/master/react-native-marquee-ab-demo.gif)

# Install

### npm
```
npm i react-native-marquee-ab --save
```

# Props

 本组件支持以下Api，如需要新的Api欢迎提出新的issues
 
#### MarqueeHorizontal props

 *  duration (ms) 选填 执行时间 : 传入毫秒数，执行完整个动画的时间，默认为10秒传入10000。
 *  speed (px/s) 选填 滚动速度 : 传入一秒钟执行多少像素的动画，用来替代duration，一般使用这个属性来控制滚动速度 默认为0，建议传入60。
 *  textList ([{label : '1',value : '这是滚动文本'},...]) 必填 文本数组 : 滚动的文字数组，必须按照固定格式传参，value用作文本显示，label用作点击事件回调。
 *  width (num) 选填 整个组件的宽度 ！！宽度不能使用flex！！
 *  height (num) 选填 整个组件的高度 ！！高度不能使用flex！！
 *  direction (string) 方向，值有 left、right
 *  reverse (boolean) 是否倒叙整个字符串
 *  separator (num) 两个item之间的间隙，默认20
 *  bgContainerStyle (obj style) 选填 背景样式
 *  textStyle (obj style) 选填 文本样式
 *  onTextClick (fun) 点击事件回调 : 返回点击的textList中的item
 
#### MarqueeVertical props

 *  duration (ms) 选填 执行时间 : 传入毫秒数，执行完整个动画的时间，默认为600毫秒。
 *  textList ([{label : '1',value : '这是滚动文本'},...]) 必填 文本数组 : 滚动的文字数组，必须按照固定格式传参，value用作文本显示，label用作点击事件回调。
 *  width (num) 选填 整个组件的宽度 ！！宽度不能使用flex！！
 *  height (num) 选填 整个组件的高度 ！！高度不能使用flex！！
 *  delay (ms) 文本停顿时间，默认1200毫秒
 *  direction (string) 方向，值有 up、down
 *  numberOfLines (num) 同一个数据的文本行数，默认为1
 *  viewStyle (obj style) 每一行文本的样式
 *  bgContainerStyle (obj style) 选填 背景样式
 *  textStyle (obj style) 选填 文本样式
 *  headViews 选填 滚动的header
 *  onTextClick (fun) 点击事件回调 : 返回点击的textList中的item

# Usage

## 1.import
 
```
import { MarqueeHorizontal,MarqueeVertical } from 'react-native-marquee-ab';
```

## 2.Use

### 详细事例代码：
[https://github.com/ZhangTaoK/react-native-marquee-ab/blob/master/example/src/pages/TestPage.js](https://github.com/ZhangTaoK/react-native-marquee-ab/blob/master/example/src/pages/TestPage.js)

### 注意事项：
由于宽度只能使用数值所以如果想要宽度满屏的话需要这样使用，这样获取到宽度再赋值给width就可以了
```
import { Dimensions } from 'react-native';

...
 mWidth = Dimensions.get('window').width;  //整个屏幕的宽度
...

```

博客地址：https://blog.csdn.net/sinat_30949835/article/details/87919455
