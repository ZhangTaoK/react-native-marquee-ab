import React, { Component } from 'react';
import { View, Animated, Easing, Text, TouchableOpacity, Dimensions } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const MarqueeType = {
    Simple : 'simple', //最简单的滚动
    Multiple : 'multiple', //多列
    MultipleRoll : 'multiple_roll', //多列连续滚动
}
export const Direction = {
    Up : 'up',
    Down : 'down',
}

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
        direction : Direction.Up,
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
            index : direction == Direction.Down ? textList.length : 1,
        })
    }

    componentWillReceiveProps(nextProps){
        let newText = nextProps.textList || [];
        let oldText = this.props.textList || [];
        let newDirection = nextProps.direction || Direction.Up;
        if (newText !== oldText) {
            this.state.animation && this.state.animation.stop();
            this.setState({
                textList : newText,
                maxIndex : newText.length + 2,
                textIndex : newText.length,
                index : newDirection == Direction.Down ? newText.length : 1,
                animation: null,
            });
        }
    }

    componentDidUpdate(){
        let { index, maxIndex, textIndex } = this.state;
        let { duration, delay, height, direction } = this.props;
        if(!this.state.animation){
            let myIndex = 0;
            let yValue = 0;
            let yToValue = 0;
            if(direction == Direction.Down){
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
            }else if(direction == Direction.Up){
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
                        delay : delay,
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

    componentWillUnmount(){
        this.state.animation && this.state.animation.stop();
    }

    singleLineTextView(list){
        let { textStyle, viewStyle, onTextClick, width, height, numberOfLines, headViews } = this.props;
        if(list == null || list == '' || list == [] || list.length <= 0){
            return (
                <View />
            );
        }
        let headViewList = [];
        let mHeadViewList = [];
        let itemView = [];
        let mlist = [];
        if(headViews == null || list == '' || list == [] || list.length <= 0){}else{
            headViewList = headViewList.concat(headViews);
            mHeadViewList = mHeadViewList.concat(headViewList);
            mHeadViewList.push(headViewList[0]);
            mHeadViewList.unshift(headViewList[headViewList.length - 1]);
        }
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
                    { mHeadViewList ? mHeadViewList[i] : null }
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

const styles = StyleSheet.create({
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
        flex : 1,
        fontSize : 16,
        color : '#000000'
    }
});