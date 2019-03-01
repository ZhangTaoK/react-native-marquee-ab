# react-native-marquee-ab

[ReactNative](https://github.com/facebook/react-native) Marquee，Support iOS and Android。

使用了react-native中的Animated组件，利用纯js代码，实现Marquee(走马灯)组件。

### 实现功能
* 支持文本的水平滚动（向左、向右）
* 支持文本的竖直滚动（向上、向下）
* 支持多条文本数据
* 支持每一条文本数据的点击事件
* 支持自定义滚动速度
* 支持自定义样式

其他请阅读本组件支持的Api

### 事例演示

#### Version 1.2.0
![image](https://github.com/ZhangTaoK/react-native-marquee-ab/blob/master/marquee-ab-demo-gif-001.gif) ![image](https://github.com/ZhangTaoK/react-native-marquee-ab/blob/master/marquee-ab-demo-gif-002.gif)
#### Old version 1.0.0
![image](https://github.com/ZhangTaoK/react-native-rolling-text/blob/master/ScreenRecording_02-25-2019-14-46-06.gif)

# Install

### 直接把js文件下载到您的项目中，直接使用。

* [MarqueeHorizontal.js](https://github.com/ZhangTaoK/react-native-marquee-ab/blob/master/MarqueeHorizontal.js)
* [MarqueeVertical.js](https://github.com/ZhangTaoK/react-native-marquee-ab/blob/master/MarqueeVertical.js)

### npm

暂不支持

# Props

 本组件支持以下Api，如需要新的Api欢迎提出新的issues
 
#### MarqueeHorizontal props

 * 1. duration (ms) 选填 执行时间 : 传入毫秒数，执行完整个动画的时间，默认为10秒传入10000。
 * 2. speed (px/s) 选填 滚动速度 : 传入一秒钟执行多少像素的动画，用来替代duration，一般使用这个属性来控制滚动速度 默认为0，建议传入60。
 * 3. textList ([{label : '1',value : '这是滚动文本'},...]) 必填 文本数组 : 滚动的文字数组，必须按照固定格式传参，value用作文本显示，label用作点击事件回调。
 * 4. width (num) 选填 整个组件的宽度 ！！宽度不能使用flex！！
 * 5. height (num) 选填 整个组件的高度 ！！高度不能使用flex！！
 * 6. direction (string) 方向，值有 left、right
 * 7. reverse (boolean) 是否倒叙整个字符串
 * 8. separator (num) 两个item之间的间隙，默认20
 * 9. bgContainerStyle (obj style) 选填 背景样式
 * 10. textStyle (obj style) 选填 文本样式
 * 11. onTextClick (fun) 点击事件回调 : 返回点击的textList中的item
 
#### MarqueeVertical props

 * 1. duration (ms) 选填 执行时间 : 传入毫秒数，执行完整个动画的时间，默认为600毫秒。
 * 2. textList ([{label : '1',value : '这是滚动文本'},...]) 必填 文本数组 : 滚动的文字数组，必须按照固定格式传参，value用作文本显示，label用作点击事件回调。
 * 3. width (num) 选填 整个组件的宽度 ！！宽度不能使用flex！！
 * 4. height (num) 选填 整个组件的高度 ！！高度不能使用flex！！
 * 5. delay (ms) 文本停顿时间，默认1200毫秒
 * 6. direction (string) 方向，值有 up、down
 * 7. numberOfLines (num) 同一个数据的文本行数，默认为1
 * 8. viewStyle (obj style) 每一行文本的样式
 * 9. bgContainerStyle (obj style) 选填 背景样式
 * 10. textStyle (obj style) 选填 文本样式
 * 11. onTextClick (fun) 点击事件回调 : 返回点击的textList中的item

# Usage

## 1.import
 
//这里根据你的实际文件存放路径引入文件
```
import MarqueeHorizontal from './MarqueeHorizontal';
import MarqueeVertical from './MarqueeVertical';
```

npm
暂不支持

## 2.Use
```
import { View, Dimensions } from 'react-native';

//这里根据你的实际文件存放路径引入文件
import MarqueeHorizontal from './MarqueeHorizontal';
import MarqueeVertical from './MarqueeVertical';

...
    render() {
        let mWidth = Dimensions.get('window').width;
        return(
            <View style = {{flex : 1,backgroundColor : '#FFFFFF'}}>

                <View style = {{height : 10,backgroundColor : '#FFFFFF',width : '100%'}}/>

                <MarqueeHorizontal
                    textList = {[
                        {label : '1',value : 'item1:一闪一闪亮晶晶，满天都是小星星'},
                        {label : '2',value : 'item2:两只老虎跑的快'},
                        {label : '3',value : 'item3:蓝蓝的天上白云飘，白云下面小肥羊儿跑'},
                    ]}
                    speed = {60}
                    width = {mWidth}
                    height = {50}
                    direction = {'left'}
                    reverse = {false}
                    bgContainerStyle = {{backgroundColor : '#FFFF00'}}
                    textStyle = {{fontSize : 16,color : '#FF0000'}}
                    onTextClick = {(item) => {
                        alert(''+JSON.stringify(item));
                    }}
                />

                <View style = {{height : 10,backgroundColor : '#FFFFFF',width : '100%'}}/>
                
                <MarqueeHorizontal
                    textList = {[
                        {label : '1',value : 'item1:一闪一闪亮晶晶，满天都是小星星'},
                        {label : '2',value : 'item2:两只老虎跑的快'},
                        {label : '3',value : 'item3:蓝蓝的天上白云飘，白云下面小肥羊儿跑'},
                    ]}
                    speed = {60}
                    width = {mWidth}
                    height = {50}
                    direction = {'right'}
                    reverse = {false}
                    bgContainerStyle = {{backgroundColor : '#FFFF00'}}
                    textStyle = {{fontSize : 16,color : '#FF0000'}}
                    onTextClick = {(item) => {
                        alert(''+JSON.stringify(item));
                    }}
                />

                <View style = {{height : 10,backgroundColor : '#FFFFFF',width : '100%'}}/>

                <MarqueeVertical
                    textList = {[
                        {label : '1',value : 'item1:一闪一闪亮晶晶，满天都是小星星'},
                        {label : '2',value : 'item2:两只老虎跑的快'},
                        {label : '3',value : 'item3:蓝蓝的天上白云飘，白云下面小肥羊儿跑'},
                    ]}
                    width = {mWidth}
                    height = {50}
                    direction = {'up'}
                    numberOfLines = {1}
                    bgContainerStyle = {{backgroundColor : '#FFFF00'}}
                    textStyle = {{fontSize : 16,color : '#FF0000'}}
                    onTextClick = {(item) => {
                        alert(''+JSON.stringify(item));
                    }}
                />

                <View style = {{height : 10,backgroundColor : '#FFFFFF',width : '100%'}}/>

                <MarqueeVertical
                    textList = {[
                        {label : '1',value : 'item1:一闪一闪亮晶晶，满天都是小星星'},
                        {label : '2',value : 'item2:两只老虎跑的快'},
                        {label : '3',value : 'item3:蓝蓝的天上白云飘白云下面小肥羊儿跑羊儿哪里跑。'},
                    ]}
                    width = {mWidth}
                    height = {50}
                    direction = {'down'}
                    numberOfLines = {1}
                    bgContainerStyle = {{backgroundColor : '#FFFF00'}}
                    textStyle = {{fontSize : 16,color : '#FF0000'}}
                    onTextClick = {(item) => {
                        alert(''+JSON.stringify(item));
                    }}
                />

                <View style = {{height : 10,backgroundColor : '#FFFFFF',width : '100%'}}/>

                <View style = {{width : mWidth,height : 50,backgroundColor : '#FFFFFF',flexDirection : 'row',justifyContent : 'center',alignItems : 'center'}}>
                    <View style = {{width : mWidth / 2,height : 50,backgroundColor : '#FFFF00',borderRadius : 50 / 2,paddingHorizontal : 50 / 2}}>
                        <MarqueeHorizontal
                            textList = {[
                                {label : '1',value : 'item1:一闪一闪亮晶晶，满天都是小星星'},
                                {label : '2',value : 'item2:两只老虎跑的快'},
                                {label : '3',value : 'item3:蓝蓝的天上白云飘，白云下面小肥羊儿跑'},
                            ]}
                            speed = {60}
                            width = {mWidth / 2 - 50}
                            height = {50}
                            direction = {'left'}
                            separator = {30}
                            reverse = {false}
                            bgContainerStyle = {{backgroundColor : '#FFFF00'}}
                            textStyle = {{fontSize : 16,color : '#FF0000'}}
                            onTextClick = {(item) => {
                                alert(''+JSON.stringify(item));
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
...

```

注意事项：
由于宽度只能使用数值所以如果想要宽度满屏的话需要这样使用，这样获取到宽度再赋值给width就可以了
```
import { Dimensions } from 'react-native';

...
 mWidth = Dimensions.get('window').width;  //整个屏幕的宽度
...

```

编辑中... 博客教程地址：https://blog.csdn.net/sinat_30949835/article/details/87919455
