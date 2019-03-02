import React, { Component } from 'react';
import { View, Animated, Easing, Text, TouchableOpacity } from 'react-native';

/**
 * ================================================================
 * 竖直滚动的文本跑马灯
 * Create by AbyssKitty on 2019/02/25
 * version 1.0
 * Update by AbyssKitty on 2019/03/01
 * version 1.2
 * ================================================================
 */

const styles = {
    bgContainerStyle : {
        justifyContent : 'flex-start',
        backgroundColor : '#FFFFFF',
        overflow : 'hidden'
    },
    viewStyle : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    textStyle : {
        fontSize : 16,
        color : '#000000'
    }
};

/*
 * ReactNative 竖直滚动的文本跑马灯
 * props：
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
 */
export default class MarqueeVertical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textWidth : 0,
            viewWidth : 0,
            animation : null,
            textList : [],
            maxIndex : 0,
            textIndex : 0,
            index : 1,
        }
    }

    static defaultProps = {
        duration : 600, 
        textList : [],
        width : 375,
        height : 50,
        delay : 1200,
        direction : 'up',
        numberOfLines : 1,
        onTextClick : () => {},
    }

    componentWillMount(){
        this.setState({
            textList : this.props.textList || [],
        })
        this.animatedTransformY = new Animated.Value(0);
    }

    componentDidMount(){
        let { textList, direction } = this.props;
        this.setState({
            maxIndex : textList.length + 2,
            textIndex : textList.length,
            index : direction == 'down' ? textList.length : 1,
        })
    }

    componentWillReceiveProps(nextProps){
        let newText = nextProps.textList || [];
        let oldText = this.props.textList || [];
        let newDirection = nextProps.direction || 'up';
        if (newText !== oldText) {
            this.state.animation && this.state.animation.stop();
            this.setState({
                textList : newText,
                maxIndex : newText.length + 2,
                textIndex : newText.length,
                index : newDirection == 'down' ? newText.length : 1,
                animation: null,
            });
        }
    }

    componentDidUpdate(){
        console.log('componentDidUpdate');
        let { index, maxIndex, textIndex } = this.state;
        let { duration, height, direction } = this.props;
        if(!this.state.animation){
            let myIndex = 0;
            let yValue = 0;
            let yToValue = 0;
            if(direction == 'down'){
                myIndex = index;
                yValue = myIndex * height;
                yToValue = 0;
                if(myIndex > 0){
                    yToValue = (myIndex-1) * height;
                    this.setState({
                        index : --this.state.index,
                    })
                }else{
                    yValue = textIndex * height;
                    yToValue = (textIndex-1) * height;
                    this.setState({
                        index : textIndex-1,
                    })
                }
            }else if(direction == 'up'){
                myIndex = index+1;
                yValue = (myIndex - 1) * height;
                yToValue = 0;
                if(myIndex >= maxIndex){
                    yValue = 1 * height;
                    yToValue = 2 * height;
                    this.setState({
                        index : 2,
                    })
                }else{
                    yToValue = myIndex * height;
                    this.setState({
                        index : ++this.state.index,
                    })
                }
            }
            
            this.animatedTransformY.setValue(-yValue);
            this.setState({
                animation : Animated.timing(this.animatedTransformY, {
                        toValue: -yToValue,
                        duration: duration,
                        useNativeDriver: true,
                        easing: Easing.linear,
                        delay : 1000,
                    }),
            }, () => {
                this.state.animation.start(() => {
                    this.setState({
                        animation: null,
                    });
                });
            })
        }
    }

    componentWillUnmount(){
        this.state.animation && this.state.animation.stop();
    }

    singleLineTextView(list){
        let { textStyle, viewStyle, onTextClick, width, height, numberOfLines } = this.props;
        if(list == null || list == '' || list == [] || list.length <= 0){
            return (
                <View style = {{width : width,height : height,flexDirection : 'row',justifyContent : 'flex-start',alignItems : 'center',backgroundColor : '#FFFF00'}}>
                    <Text style = {{fontSize : 16,color : '#FF0000'}}>{"Props Error : textList is null"}</Text>
                </View>
            );
        }
        let itemView = [];
        let mlist = [];
        mlist = mlist.concat(list);
        mlist.push(list[0]);
        mlist.unshift(list[list.length - 1]);
        for(let i = 0;i<mlist.length;i++){
            let item = mlist[i];
            itemView.push(
                <TouchableOpacity key = {i} activeOpacity = {0.9} onPress = {() => {
                    onTextClick(item);
                }}>
                <View style = {{
                    ...styles.viewStyle,
                    width : width,
                    height : height,
                    ...viewStyle
                }}>
                    <Text style = {{
                        ...styles.textStyle,
                        ...textStyle
                    }} numberOfLines = {numberOfLines}>{item.value}</Text>
                </View>
                </TouchableOpacity>
            );
        }
        return(
            <Animated.View style = {{width : width, transform: [{ translateY: this.animatedTransformY }]}}>
                { itemView }
            </Animated.View>
        )
    }

    render(){
        let { width, height, bgContainerStyle } = this.props;
        let { textList } = this.state;
        return(
            <View style = {{
                ...styles.bgContainerStyle,
                width : width,
                height : height,
                ...bgContainerStyle,
            }}
            opacity = {this.state.animation ? 1 : 0}
            >
                { this.singleLineTextView(textList) }
            </View>
        )
    }
}
