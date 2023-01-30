import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native'

interface TextListItem {
  label: string;
  value: string;
}

interface IMarqueeVertical {
  duration?: number;
  textList?: TextListItem[];
  headViews?: any[];
  width?: number;
  height?: number;
  delay?: number;
  direction?: 'up' | 'down';
  numberOfLines?: number;
  onTextClick?: () => {};
  bgContainerStyle?: ViewProps;
  viewStyle?: ViewProps;
  textStyle?: ViewProps;
}

export function MarqueeVertical(props: IMarqueeVertical) {
  const {
    duration = 600,
    textList = [],
    headViews = [],
    width = 375,
    height = 50,
    delay = 1200,
    direction = 'up',
    numberOfLines = 1,
    onTextClick = () => {},
    bgContainerStyle,
    textStyle,
    viewStyle,
  } = props

  const [index, setIndex] = useState(direction === 'down' ? textList.length : 1)
  const [maxIndex, setMaxIndex] = useState(textList.length + 2)
  const [textIndex, setTextIndex] = useState(textList.length)
  const animatedTransformY = useRef(new Animated.Value(0)).current
  const timer = useRef()

  useEffect(() => {
    setMaxIndex(textList.length + 2)
    setTextIndex(textList.length)
    setIndex(direction === 'down' ? textList.length : 1)
  }, [direction, textList.length])

  useEffect(() => {
    clearInterval(timer.current)

    timer.current = setInterval(() => {
      let myIndex = 0
      let yValue = 0
      let yToValue = 0
      if (direction === 'down') {
        myIndex = index
        yValue = myIndex * height
        yToValue = 0
        if (myIndex > 0) {
          yToValue = (myIndex - 1) * height
          setIndex(index - 1)
        } else {
          yValue = textIndex * height
          yToValue = (textIndex - 1) * height
          setTextIndex(textIndex - 1)
        }
      } else if (direction === 'up') {
        myIndex = index + 1
        yValue = (myIndex - 1) * height
        yToValue = 0
        if (myIndex >= maxIndex) {
          yValue = 1 * height
          yToValue = 2 * height
          setIndex(2)
        } else {
          yToValue = myIndex * height

          setIndex(index + 1)
        }
      }
      Animated.sequence([
        Animated.timing(animatedTransformY, {
          toValue: -yValue,
          duration: 0,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(animatedTransformY, {
          toValue: -yToValue,
          duration,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]).start()
    }, delay)
    return () => {
      clearInterval(timer.current)
    }
  }, [
    animatedTransformY,
    delay,
    direction,
    duration,
    height,
    index,
    maxIndex,
    textIndex,
  ])

  const singleLineTextView = useCallback(() => {
    if (
      textList === null ||
      textList === '' ||
      textList === [] ||
      textList.length <= 0
    ) {
      return <View />
    }
    let headViewList = []
    let mHeadViewList = []
    const itemView = []
    let mlist = []
    if (
      headViews == null ||
      textList === '' ||
      textList === [] ||
      textList.length <= 0
    ) {
      return <View />
    }
    headViewList = headViewList.concat(headViews)
    mHeadViewList = mHeadViewList.concat(headViewList)
    mHeadViewList.push(headViewList[0])
    mHeadViewList.unshift(headViewList[headViewList.length - 1])

    mlist = mlist.concat(textList)
    mlist.push(textList[0])
    mlist.unshift(textList[textList.length - 1])

    return (
      <Animated.View
        style={{
          width,
          transform: [{ translateY: animatedTransformY }],
        }}
      >
        {mlist.map((item, idx) => (
          <TouchableOpacity
            key={idx.toString()}
            activeOpacity={0.9}
            onPress={() => {
              onTextClick(item)
            }}
          >
            <View
              style={{
                ...styles.viewStyle,
                width,
                height,
                ...viewStyle,
              }}
            >
              {mHeadViewList ? mHeadViewList[idx] : null}
              <Text
                style={{
                  ...styles.textStyle,
                  ...textStyle,
                }}
                numberOfLines={numberOfLines}
              >
                {item.value}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>
    )
  }, [
    animatedTransformY,
    headViews,
    height,
    numberOfLines,
    onTextClick,
    textList,
    textStyle,
    viewStyle,
    width,
  ])

  return (
    <View
      style={{
        ...styles.bgContainerStyle,
        width,
        height,
        ...bgContainerStyle,
      }}
    >
      {singleLineTextView()}
    </View>
  )
}

const styles = {
  bgContainerStyle: {
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textStyle: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
}
