import React, { Component } from 'react';
import { View, Animated, Easing, Text, TouchableOpacity, InteractionManager } from 'react-native';

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

    textOnLayout = (e) => {
        let width = e.nativeEvent.layout.width;
        let { textList, separator } = this.props;
        this.setState({
            textWidth : width + ((textList.length - 1) * separator),
        })
    }

    viewOnLayout = (e) => {
        let width = e.nativeEvent.layout.width;
        this.setState({
            viewWidth : width,
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
