/**
 * Create by 798839618@qq.com on 2020-10-01 (Quick Creation)
 * =============================================
 * className : 
 * =============================================
 */
import React, {Component} from 'react';
import { StyleSheet, Text, Image, View, Animated, Easing, TouchableOpacity, Dimensions,  } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const MarqueeType = {
    Simple : 'simple', //最简单的滚动
    Swiper : 'Swiper', //切换的滚动
}
export const Direction = {
    Left : 'left',
    Right : 'right',
}

export default class MarqueeHorizontal extends Component {
    static defaultProps = {
        itemMaxWidth: 1024,            //默认1024也就是2.7屏 itemMaxWidth * data.length > 总文本长度
        width: 375,                    //必须指定宽度
        height: 50,                    //必须指定高度
        autoPlay: false,               //是否自动播放
        duration : 10000,              //执行完动画的总时间（不常用）
        speed: 0,                      //执行动画的速度
        delay: 0,                      //首次加载延时执行动画的时间
        useNativeDriver: true,         //是否启动原生驱动
        iterations: -1,                //循环次数，默认（-1无限循环）
        separator: 20,                 //每个item之间的间隔
        type: MarqueeType.Simple,      //marquee类型
        direction: Direction.Left,     //运动方向
        isEndToEnd: false,             //是否首尾相连
        reverse: false,                //是否倒叙

                     //停顿时间 (only swiper)
                     //
                     //
                     //
                     //
                     //
                     //
        onClick: () => {},             //点击事件回调
    }

    constructor(props) {
        super(props);
        this.state = { 
            list : [],                 //源数据
            animation : null,          //动画对象
            viewWidth : deviceWidth,   //文本数据实际宽度

            swiperList : [],           //滚动中的数据
            swiperIndex : -1,           //当前滚动的下标
        };
        this.animatedTransformX = new Animated.Value(0);
    }

    componentWillMount(){
        this.setState({
            list : this.props.data || [],
            swiperList : this.props.data || [],
        })
    }

    componentDidMount(){
        if(this.props.autoPlay) this.start(); 
        
    }

    componentDidUpdate(prevProps,prevState){
        console.log('componentDidUpdate',this.props.type);
        if(this.props.type == MarqueeType.Simple){
            if(this.state.viewWidth != prevState.viewWidth){
                //宽度计算出现差别说明数据源遭到修改，需要重新运行动画
                this.start(); 
            }
        }else if(this.props.type == MarqueeType.Swiper){
            // console.log(this.state.swiperList , prevState.swiperList);
            if(!this.state.animation){
                console.log('执行swiper动画');
                let list = this.state.list;
                let index = this.state.swiperIndex;
                if(index == -1){ index = 1 }
                let swiperList = [];
                swiperList.push(list[index]);
                if(list.length-1 == index) {
                    swiperList.push(list[0]);
                }else{ 
                    swiperList.push(list[index+1]);
                }
                console.log('swiper=', index, swiperList);

                this.setState({
                    swiperIndex : list.length-1 < index+1 ? 0 : ++index,
                    swiperList,
                })
                this.start();
            }
        }
    }

    componentWillReceiveProps(nextProps){
        let newData = nextProps.data || [];
        let oldData = this.props.data || [];
        if (newData !== oldData) {
            this.state.animation && this.state.animation.stop();
            this.setState({
                list : newData,
                animation: null,
            });
            // this.start(); 
        }
    }

    componentWillUnmount(){
        this.state.animation && this.state.animation.stop();
    }

    init(){
        let { width, speed, direction, isEndToEnd, duration } = this.props;
        let mDuration = duration;
        if(speed > 0) mDuration = ((isEndToEnd ? 0 : width ) + this.state.viewWidth) / speed * 1000;
        let mTransformXValue = direction == Direction.Left ? width : direction == Direction.Right ? -this.state.viewWidth : width;
        let mTransformXToValue = direction == Direction.Left ? -this.state.viewWidth : direction == Direction.Right ? width : -this.state.viewWidth;
        if(isEndToEnd){
            mTransformXValue = direction == Direction.Left ? 0 : direction == Direction.Right ? -this.state.viewWidth : 0;
            mTransformXToValue = direction == Direction.Left ? -this.state.viewWidth : direction == Direction.Right ? 0 : -this.state.viewWidth;
        }

        this.animatedTransformX.setValue(mTransformXValue);
        console.log('init',this.state.viewWidth);
        this.setState({
            animation :
                Animated.loop(
                    Animated.timing(this.animatedTransformX, {
                            toValue: mTransformXToValue,
                            duration: mDuration,
                            useNativeDriver: this.props.useNativeDriver,
                            easing: Easing.linear,
                            delay: this.props.delay,
                        }),
                { iterations : this.props.iterations })
        });
    }

    initSwiper(){
        let { width, direction, duration } = this.props;
        this.animatedTransformX.setValue(0);
        this.setState({
            animation : Animated.timing(this.animatedTransformX, {
                            toValue: -width,
                            duration: duration,
                            useNativeDriver: this.props.useNativeDriver,
                            easing: Easing.linear,
                            delay: this.props.delay,
                        })
        },() => {
            this.state.animation && this.state.animation.start(() => {
                this.setState({
                    animation: null,
                });
            });
        });

    }

    start = async() => {
        if(this.props.type == MarqueeType.Simple){
            await this.init();
            await this.state.animation && this.state.animation.start();
        }else if(this.props.type == MarqueeType.Swiper){
            await this.initSwiper();
        }
    }

    stop = () => {
        this.state.animation && this.state.animation.stop();
    }

    reset = () => {
        this.state.animation && this.state.animation.reset();
    }

    textOnLayout = (e) => {
        let { data, separator, isEndToEnd } = this.props;
        this.setState({ viewWidth : e.nativeEvent.layout.width + (data.length - (isEndToEnd ? 0 : 1)) * separator });
    }

    /**
     * 注：请保证 endView&animationTextView&layout 方法中Text组件样式的一致性，否则会出现宽度误差。
     * 
     */
    endView(){
        let list = this.state.list;
        let { separator, onClick, isEndToEnd, width, reverse, textStyle } = this.props;
        let itemView = [];
        list.map((item,index) => {
            let text = item.value;
            if(reverse){
                text = text.split("").reverse().join("");
            }
            itemView.push(
                <TouchableOpacity key={'end'+index} activeOpacity={0.8} onPress={() => { 
                    onClick(item);
                }}>
                    <View style={{ flexDirection : 'row',marginRight : index < list.length - 1 ? separator : 0,
                        marginLeft : index== 0 && isEndToEnd ? separator : 0,
                    }}>
                        <Text style={[styles.textStyle,{lineHeight: this.props.height},textStyle]} numberOfLines={1}>
                            {text}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return(
            <View style={{width : width, flexDirection : 'row', overflow : 'hidden'}}>
                { itemView }
            </View>
        );
    }

    /**
     * 注：请保证 endView&animationTextView&layout 方法中Text组件样式的一致性，否则会出现宽度误差。
     * 
     */
    animationTextView(){
        let list = this.state.list;
        let { separator, onClick, isEndToEnd, width, reverse, textStyle } = this.props;
        let itemView = [];
        list.map((item,index) => {
            let text = item.value;
            if(reverse){
                text = text.split("").reverse().join("");
            }
            itemView.push(
                <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => { 
                    onClick(item); 
                }}>
                    <View style={{ flexDirection : 'row',marginRight : index < list.length - 1 ? separator : 0,
                        marginLeft : index== 0 && isEndToEnd ? separator : 0,
                    }}>
                        <Text style = {[styles.textStyle,{lineHeight: this.props.height},textStyle]} numberOfLines={1}>
                            { 
                                text
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return(
            <Animated.View
                style={{flexDirection : 'row', width : this.state.viewWidth + (isEndToEnd ? width : 0), transform: [{ translateX: this.animatedTransformX }] }}
            >
                { itemView }
                { 
                    isEndToEnd ?
                    this.endView() 
                    :
                    null
                }
            </Animated.View>
        )
    }

    /**
     * 注：请保证 endView&animationTextView&layout 方法中Text组件样式的一致性，否则会出现宽度误差。
     * 计算文本总宽度方法。
     * 通过onLayout获取文本总宽度。
     * itemMaxWidth*length必须保证大于文本总宽度。
     */
    layout(){
        let { textStyle } = this.props;
        let list = this.state.list;
        let text = '';
        for(let i = 0;i<list.length;i++){
            text += list[i].value;
        }
        return(
            <View style = {[styles.layoutView,{
                width : list.length * this.props.itemMaxWidth,
            }]}>
                <Text style = {[styles.textStyle,{lineHeight: this.props.height},textStyle]} onLayout={(event) => this.textOnLayout(event)} numberOfLines = {1} >{text}</Text>
            </View>
        )
    }

    /**
     * swiperTextView
     */
    swiperTextView(){
        let { width, textStyle, onClick } = this.props;
        let list = this.state.swiperList;
        let itemView = [];
        list.map((item,index) => {
            itemView.push(
                <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => { 
                    onClick(item); 
                }}>
                    <View style={{ flexDirection : 'row',width}}>
                        <Text style = {[styles.textStyle,{lineHeight: this.props.height},textStyle]} numberOfLines={1}>
                            {item.value}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        })

        return(
            <Animated.View
                style={{flexDirection : 'row', width : width*2, transform: [{ translateX: this.animatedTransformX }] }}
            >
                { itemView }
            </Animated.View>
        )
    }

    render(){
        let { width, height, bgContainerStyle, type } = this.props;
        if(type == MarqueeType.Simple){
            return (
                <View style={[styles.container,bgContainerStyle,{width,height}]} opacity={this.state.animation ? 1:0}>
                    {this.animationTextView()}
                    {this.layout()}
                </View>
            );
        }else if(type == MarqueeType.Swiper){
            return (
                <View style={[styles.container,bgContainerStyle,{width,height}]} opacity={this.state.animation ? 1:0}>
                    {this.swiperTextView()}
                </View>
            );
        }else{
            return (
                <View style={[styles.container,bgContainerStyle,{width,height}]} opacity={this.state.animation ? 1:0}>
                    {this.animationTextView()}
                    {this.layout()}
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        backgroundColor : '#FFFFFF',
        overflow : 'hidden'
    },
    layoutView: {
        flexDirection : 'row',
        height : 0,
        opacity: 0,
    },
    textStyle: {
        fontSize: 16,
        color: '#111111',
    },
    row: {
        flexDirection : 'row',
    },
});