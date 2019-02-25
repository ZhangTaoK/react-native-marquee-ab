# react-native-rolling-text

react-native版本，横向滚动跑马灯。支持多个text数据，支持自定义宽度，支持点击事件回调。

props：
 1. duration (ms) 选填 执行时间 : 传入毫秒数，执行完整个动画的时间，默认为10秒传入10000。
 2. speed (px/s) 选填 滚动速度 : 传入一秒钟执行多少像素的动画，用来替代duration，一般使用这个属性来控制滚动速度 默认为0，建议传入60。
 3. textList ([{label : '1',value : '这是滚动文本'},...]) 必填 文本数组 : 滚动的文字数组，必须按照固定格式传参，value用作文本显示，label用作点击事件回调。
 4. width (num) 选填 整个组件的宽度 ！！宽度不能使用flex！！
 5. height (num) 选填 整个组件的高度 ！！宽度不能使用flex！！
 6. bgContainerStyle (obj style) 选填 背景样式
 7. textStyle (obj style) 选填 文本样式
 8. onTextClick (fun) 点击事件回调 : 返回点击的textList中的item

使用教程：
 1.下载 RollingText.js 文件 放到项目中。
 2.直接引入直接使用，无需添加其他代码。

事例代码：
```
//引入RollingText.js文件
import RollingText from './RollingText';

......

render() {
    return (
        <View style = {{ flex : 1 ,backgroundColor : '#FFFFFF' }}>
            <RollingText 
                textList = {[{label : '1',value : '1234567890abcdefghigklmnopqrstuvwxyz啊吧从的额分个好i个看了吗你哦平去人是他uv我想有在'},{label : '2',value : '  哟哟哟哟哟哟哟哟哟哟哟哟哟哟哟'},{label : '3',value : '  喝口水的交话费了喝口水的交话费了'}]}
                speed = {60}
                width = {100}
                height = {40}
                bgContainerStyle = {{backgroundColor : '#FFFF00'}}
                textStyle = {{fontSize : 12,color : '#FF0000'}}
                onTextClick = {(item) => {
                    console.log(item);
                    Alert.alert(''+JSON.stringify(item));
                }}
            />

            <RollingText 
                textList = {this.state.list}
                speed = {60}
                width = {300}
                height = {40}
                bgContainerStyle = {{backgroundColor : '#FFFF00'}}
                textStyle = {{fontSize : 15,color : '#FF0000'}}
                onTextClick = {(item) => {
                    console.log(item);
                    Alert.alert(''+JSON.stringify(item));
                    if(this.state.list.length < 5){
                        this.setState({
                            list : [
                                {label : '1',value : 'kllskdjgjsioiejfalksdhjlashdgsjkdhfssd'},
                                {label : '2',value : '    如果是辽阔的国际化卢萨卡；积分；阿尔回复；就考试大纲as；的接口规范；是的'},
                                {label : '3',value : '    公司肯德基疯狂夺金'},
                                {label : '4',value : '    工商联快递费吉林省大发牢骚'},
                                {label : '5',value : '    gois就你付款金黄色的'}
                            ]
                        })
                    }
                }}
            />
        </View>
    );
}
```
注意事项：
由于宽度只能使用数值所以如果想要宽度满屏的话需要这样使用，这样获取到宽度再赋值给width就可以了
```
import { Dimensions } from 'react-native';

Dimensions.get('window').width, //整个屏幕的宽度
```
