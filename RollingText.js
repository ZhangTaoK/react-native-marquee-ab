import React, { Component } from 'react';
import { View, Animated, Easing, Text, TouchableOpacity } from 'react-native';

/**
 * ================================================================
 * 横排文本跑马灯
 * Create by AbyssKitty on 2019/02/25
 * version 1.0
 * Update by AbyssKitty on 2019/02/25
 * version 1.0
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
 * ReactNative 文本横排跑马灯
 * 
 * props：
 * 1. duration (ms) 选填 执行时间 : 传入毫秒数，执行完整个动画的时间，默认为10秒传入10000。
 * 2. speed (px/s) 选填 滚动速度 : 传入一秒钟执行多少像素的动画，用来替代duration，一般使用这个属性来控制滚动速度 默认为0，建议传入60。
 * 3. textList ([{label : '1',value : '这是滚动文本'},...]) 必填 文本数组 : 滚动的文字数组，必须按照固定格式传参，value用作文本显示，label用作点击事件回调。
 * 4. width (num) 选填 整个组件的宽度 ！！宽度不能使用flex！！
 * 5. height (num) 选填 整个组件的高度 ！！高度不能使用flex！！
 * 6. bgContainerStyle (obj style) 选填 背景样式
 * 7. textStyle (obj style) 选填 文本样式
 * 8. onTextClick (fun) 点击事件回调 : 返回点击的textList中的item
 */
export default class RollingText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textWidth : 0,
            viewWidth : 0,
            animation : null,
            textList : [],
        }
    }

    static defaultProps = {
        //总持续时间 默认10秒
        duration : 10000, 
        //用于替代 duration 的属性，滚动的速度 1px/s,数值越大 速度越快，默认0
        speed : 0,
        //传入数组文本，固定格式[{label : '1',value : '这是滚动文本'},...]
        textList : [],
        //整个组件的宽度
        width : 375,
        //整个组件的高度
        height : 50,
        //点击事件回调，返回点击的textList中的item
        onTextClick : () => {},
    }

    componentWillMount(){
        //组件加载前的生命周期
        this.setState({
            textList : this.props.textList || [],
        })
        this.animatedTransformX = new Animated.Value(0);
    }

    componentDidMount(){
        //render 成功渲染后的生命周期
    }

    componentWillUpdate(){
        //组件刷新前
    }

    componentDidUpdate(){
        //组件刷新后调用
        /*
         * 第一次进入这里改变了state的view的总长度 在这里执行动画的开始
         * 之后state的animation设置为空，递归执行本生命周期重新开始新的动画
         */
        let { textWidth, viewWidth } = this.state;
        let { duration, speed, width } = this.props;
        let mDuration = duration;
        if(speed && speed > 0){
            mDuration = (width + textWidth) / speed * 1000;
        }
        if(!this.state.animation && textWidth && viewWidth){   
            this.animatedTransformX.setValue(width);
            this.setState({
                animation : Animated.timing(this.animatedTransformX, {
                        toValue: -textWidth,
                        duration: mDuration,
                        useNativeDriver: true,
                        easing: Easing.linear,
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

    componentWillReceiveProps(nextProps){
        //生命周期props 当传过来的数据发生改变时的处理方式
        //支持textList为动态数据
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
        //组件被卸载
        this.state.animation && this.state.animation.stop();
    }

    /**
     * 检测text文本总长度
     * @param {*} e layout
     */
    textOnLayout(e){
        this.setState({
            textWidth : e.nativeEvent.layout.width,
        })
    }

    /**
     * 已废弃
     * 检测view长度
     * @param {*} e layout
     */
    viewOnLayout(e){
        // console.log('viewOnLayout width='+e.nativeEvent.layout.width);
        this.setState({
            viewWidth : e.nativeEvent.layout.width,
        })
    }

    /**
     * 文本显示
     * @param {*} list 文本数组
     */
    textView(list){
        let { textStyle, onTextClick } = this.props;
        let itemView = [];
        for(let i = 0;i<list.length;i++){
            let item = list[i];
            itemView.push(
                <TouchableOpacity key = {''+i} activeOpacity = {0.9} onPress = {() => {
                    onTextClick(item)
                }}>
                <View style = {{flexDirection : 'row'}}>
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

    /**
     * 用来计算 text 文本的总长度 每一个item(text)的最大长度只支持到 1024
     * @param {*} list 文本数组
     */
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
