import React, { Component } from 'react';
import { View, Animated, Easing, Text, TouchableOpacity } from 'react-native';

/**
 * ================================================================
 * 水平滚动的文本跑马灯
 * Create by AbyssKitty on 2019/02/25
 * Update by AbyssKitty on 2019/03/04
 * version 1.2.3
 * ================================================================
 */

const styles = {
    bgContainerStyle : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        backgroundColor : '#FFFFFF',
        overflow : 'hidden'
    },
    textMeasuringViewStyle: {
        flexDirection : 'row',
        opacity : 0,
    },
    textMeasuringTextStyle: {
        fontSize : 16,
    },
    textStyle : {
        fontSize : 16,
        color : '#000000',
    }
};
/*
 * ReactNative 水平滚动的文本跑马灯
 * props：
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
 */
export default class MarqueeHorizontal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation : null,
            textList : [],
            textWidth : 0,
            viewWidth : 0,
        }
    }

    static defaultProps = {
        duration : 10000, 
        speed : 0,
        textList : [],
        width : 375,
        height : 50,
        direction : 'left',
        reverse : false,
        separator : 20,
        onTextClick : () => {},
    }

    componentWillMount(){
        this.setState({
            textList : this.props.textList || [],
        })
        this.animatedTransformX = new Animated.Value(0);
    }

    componentDidUpdate(){
        let { textWidth, viewWidth } = this.state;
        let { duration, speed, width, direction } = this.props;
        let mDuration = duration;
        if(speed && speed > 0){
            mDuration = (width + textWidth) / speed * 1000;
        }
        if(!this.state.animation && textWidth && viewWidth){
            this.animatedTransformX.setValue(direction == 'left' ? width : (direction == 'right' ? -textWidth : width));
            this.setState({
                animation : Animated.timing(this.animatedTransformX, {
                        toValue: direction == 'left' ? -textWidth : (direction == 'right' ? width : -textWidth),
                        duration: mDuration,
                        useNativeDriver: true,
                        easing: Easing.linear,
                    }),
            }, () => {
                this.state.animation && this.state.animation.start(() => {
                    this.setState({
                        animation: null,
                    });
                });
            })
        }
    }

    componentWillReceiveProps(nextProps){
        let newText = nextProps.textList || [];
        let oldText = this.props.textList || [];
        if (newText !== oldText) {
        this.state.animation && this.state.animation.stop();
        this.setState({
            textList : newText,
            animation: null,
        });
        }
    }

    componentWillUnmount(){
        this.state.animation && this.state.animation.stop();
    }

    textOnLayout(e){
        let { textList, separator } = this.props;
        this.setState({
            textWidth : e.nativeEvent.layout.width + ((textList.length - 1) * separator),
        })
    }

    viewOnLayout(e){
        this.setState({
            viewWidth : e.nativeEvent.layout.width,
        })
    }

    textView(list){
        let { textStyle, onTextClick, reverse, separator } = this.props;
        let itemView = [];
        for(let i = 0;i<list.length;i++){
            let item = list[i];
            if(reverse){
                item.value = item.value.split("").reverse().join("");
            }
            itemView.push(
                <TouchableOpacity key = {''+i} activeOpacity = {0.9} onPress = {() => {
                    onTextClick(item)
                }}>
                <View style = {{flexDirection : 'row',marginRight : i < list.length - 1 ? separator : 0}}>
                    <Text style = {{
                        ...styles.textStyle,
                        ...textStyle
                    }}
                        numberOfLines = {1}
                    >{item.value}</Text>
                </View>
                </TouchableOpacity>
            );
        }
        return(
            <Animated.View
                style = {{flexDirection : 'row',width : this.state.textWidth,transform: [{ translateX: this.animatedTransformX }]}}
                onLayout={(event) => this.viewOnLayout(event)}
            >
                {itemView}
            </Animated.View>
        )
    }

    textLengthView(list){
        let { textStyle } = this.props;
        let text = '';
        for(let i = 0;i<list.length;i++){
            text += list[i].value;
        }
        return(
            <View style = {{
                ...styles.textMeasuringViewStyle,
                width : list.length * 1024
            }}>
                <Text style = {{
                    ...styles.textMeasuringTextStyle,
                    ...textStyle
                }}
                    onLayout={(event) => this.textOnLayout(event)}
                    numberOfLines = {1}
                >{text}</Text>
            </View>
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
            }} opacity = {this.state.animation ? 1 : 0}>
                { this.textView(textList) }
                { this.textLengthView(textList) }
            </View>
        )
    }
}
