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
| prop | type  | default | required | description |
|:----:|:----:|:-------:|:---:|:---:|
|duration|number|10000ms|yes|执行完成整个动画所需要的时间(ms)不常用|
|speed|number|0|no|平均的滚动速度，跑马灯使用这个属性（建议传入60）|
|textList|array|[]|yes|滚动的文字数组，具体数据格式请参照textList.item|
|width|number|375|yes|宽度，不能使用flex|
|height|number|50|yes|高度，不能使用flex|
|direction|string|left|yes|动画方向(向左向右滚动)`left` or `right`|
|reverse|bool|false|yes|是否将整个文本数据倒叙显示|
|separator|number|20|yes|两个item之间的间隙|
|bgContainerStyle|object||no|背景样式|
|textStyle|object||no|文本样式|
|onTextClick|func||yes|点击事件回调：(item) => void|
 
#### MarqueeVertical props
| prop | type  | default | required | description |
|:----:|:----:|:-------:|:---:|:---:|
|duration|number|600|yes|执行整个动画的完成时间(ms)|
|textList|array|[]|yes|滚动的文字数组，具体数据格式请参照textList.item|
|width|number|375|no|宽度，不能使用flex|
|height|number|50|no|高度，不能使用flex|
|delay|number|12000|yes|文本停顿时间(ms)|
|direction|string|up|yes|动画方向(向上向下滚动)`up` or `down`|
|numberOfLines|number|1|yes|同一个数据的文本行数|
|headViews|array|[]|no|在文本最前面加上一个自定义view，效果如图例所示，用法请参照事例用法，length长度与textList必须一致|
|viewStyle|object||yes|每一行文本的样式|
|bgContainerStyle|object||no|背景样式|
|textStyle|object||no|文本样式|
|onTextClick|func||yes|点击事件回调：(item) => void|

#### textList.item props
| prop | type  | default | required | description |
|:----:|:----:|:-------:|:---:|:---:|
|label|string||yes|用作点击事件的回调|
|value|string||yes|文本显示|
|[object]|[object]||no|可随意添加数据供自己特殊需求使用|

##### 事例数据
```
[{label : 1,value : '小肥羊'},...]
```

# Usage

## 1.import
 
```
import { MarqueeHorizontal,MarqueeVertical } from 'react-native-marquee-ab';
```

## 2.Use

### 详细事例代码：
[https://github.com/ZhangTaoK/react-native-marquee-ab/blob/master/old/1.2.6/TestPage.js](https://github.com/ZhangTaoK/react-native-marquee-ab/blob/master/old/1.2.6/TestPage.js)

### 注意事项：
由于宽度只能使用数值所以如果想要宽度满屏的话需要这样使用，这样获取到宽度再赋值给width就可以了
```
import { Dimensions } from 'react-native';

...
 mWidth = Dimensions.get('window').width;  //整个屏幕的宽度
...

```

博客地址：https://blog.csdn.net/sinat_30949835/article/details/87919455

下一版本：
执行完成后的回调
多行文本的支持

