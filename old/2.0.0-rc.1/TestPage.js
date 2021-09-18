/**
 * Create by 吃小笼包嘛 on 2020 (Quick Creation)
 * =============================================
 * className : ceshi123
 * =============================================
 */
import React, {Component} from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Button } from 'react-native';
import MarqueeHorizontal, { MarqueeType, Direction } from './marquee/MarqueeHorizontal';
import OldMH from './marquee/OldMH';

export default class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { value : '年年雪里，常插梅花醉。' },
                // { value : '挼尽梅花无好意，赢得满衣清泪。' },
                { value : '今年海角天涯，萧萧两鬓生华。' },
                { value : '看取晚来风势，故应难看梅花。' },
            ]
        };
        this.mq = null;
    }

    componentDidMount(){
        // setTimeout(() => {
        //     this.setState({
        //         data: [
        //             { value : '梅花醉。梅花醉。梅花醉。' },
        //             // { value : '挼尽梅花无好意，赢得满衣清泪。' },
        //             { value : '鬓生华。鬓生华。鬓生华。' },
        //             { value : '看梅花。看梅花。看梅花。' },
        //         ]
        //     })
        // }, 2000);
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={{width : '100%',flexDirection : 'row',flexWrap : 'wrap'}}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { 
                        this.mq.start();
                    }}>
                        <Text style = {{fontSize : 16,color : '#000000',padding : 10}}>{'启动'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { 
                        this.mq.stop();
                    }}>
                        <Text style = {{fontSize : 16,color : '#000000',padding : 10}}>{'停止'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { 
                        this.mq.reset();
                    }}>
                        <Text style = {{fontSize : 16,color : '#000000',padding : 10}}>{'重置'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { 
                        this.mq.init();
                    }}>
                        <Text style = {{fontSize : 16,color : '#000000',padding : 10}}>{'初始化'}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity activeOpacity={0.8} onPress={() => { 
                        this.mq.loop();
                    }}>
                        <Text style = {{fontSize : 16,color : '#000000',padding : 10}}>{'loop'}</Text>
                    </TouchableOpacity> */}
                </View>

                <Text style = {styles.title}>{'Simple (普通跑马灯)'}</Text>
                <MarqueeHorizontal
                    ref={ref => this.mq = ref}
                    data={this.state.data}
                    type={MarqueeType.Simple}
                    delay={300}
                    duration={5000}
                    speed={170}
                    itemMaxWidth={1024}
                    direction={Direction.Left}
                    autoPlay={true}
                    iterations={-1}  //循环次数
                    separator={20}
                    // reverse={true}
                    isEndToEnd={true}
                    onClick={(item) => { 
                        alert(JSON.stringify(item));
                        console.log('click', item);
                    }}
                    textStyle={{
                        fontSize: 14,
                    }}
                />
                <Text style = {styles.title}>{'swiper (横向切换)'}</Text>
                <MarqueeHorizontal
                    ref={ref => this.mq = ref}
                    data={this.state.data}
                    type={MarqueeType.Swiper}
                    delay={3000}
                    duration={1500}
                    itemMaxWidth={1024}
                    direction={Direction.Left}
                    autoPlay={true}
                    iterations={-1}  //循环次数
                    separator={20}
                    isEndToEnd={true}
                    onClick={(item) => { 
                        alert(JSON.stringify(item));
                        console.log('click', item); 
                    }}
                />
{/* 
                <OldMH 
                    textList={[
                        { value : '年年雪里，常插梅花醉。年年雪里，常插梅花醉。年年雪里，常插梅花醉。年年雪里，常插梅花醉。年年雪里，常插梅花醉。' },
                        { value : '挼尽梅花无好意，赢得满衣清泪。' },
                        { value : '今年海角天涯，萧萧两鬓生华。' },
                        { value : '看取晚来风势，故应难看梅花。' },
                    ]}
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        color: '#111111',
        lineHeight: 35,
        marginHorizontal: 30,
        marginTop: 15,
    },
});