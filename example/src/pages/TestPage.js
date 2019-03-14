import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
} from 'react-native';

//这里是事例，引用了绝对路径上的文件，测试专用。
import MarqueeHorizontal from '../marquee/MarqueeHorizontal';
import MarqueeVertical from '../marquee/MarqueeVertical';
//正式使用请使用这里
// import { MarqueeHorizontal,MarqueeVertical } from 'react-native-marquee-ab';

export default class TestPage extends Component{
    // setTimeout(() => {
    //     InteractionManager.runAfterInteractions(() => {
    //          ***
    //     });
    // },100);
    render() {
        let mWidth = Dimensions.get('window').width;
        return(
            <View style = {{flex : 1,backgroundColor : '#FFFFFF'}}>

                <View style = {{height : 50,backgroundColor : '#FFFFFF',width : '100%'}}/>

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
                    headViews = {[
                        <Image 
                            source = {require('../images/hot.png')}
                            style = {{width : 46,height : 28}}
                        />,
                        <View/>,
                        <View/>,
                    ]}
                    delay = {2000}
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
                    headViews = {[
                        <View style = {{backgroundColor : '#FF0000',padding : 5,borderRadius : 3,marginHorizontal : 5}}>
                            <Text style = {{color : '#FFFFFF'}}>{'hd1'}</Text>
                        </View>,
                        <View style = {{backgroundColor : '#FF0000',padding : 5,borderRadius : 3,marginHorizontal : 5}}>
                            <Text style = {{color : '#FFFFFF'}}>{'hd2'}</Text>
                        </View>,
                        <View style = {{backgroundColor : '#FF0000',padding : 5,borderRadius : 3,marginHorizontal : 5}}>
                            <Text style = {{color : '#FFFFFF'}}>{'热门'}</Text>
                        </View>,
                    ]}
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
}
