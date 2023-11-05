import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet, Image } from "react-native";

import island8 from '../assets/images/png/island8.png';
const LoadingPage = () => {
  const texts = ['섬 만드는중...', '좋은 질문 준비하는중...', '대충 아무말111','대충 아무말222','대충 아무말333','대충 아무말444'];
  const animation = useRef(new Animated.Value(0)).current;
  const inputRange = [0, 1, 2];
  const currentIndex = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: currentIndex.current + 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
      currentIndex.current += 1;
      if (currentIndex.current > texts.length - 1) {
        currentIndex.current = 0;
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={island8} style={styles.islandImg} />
      {texts.map((text, index) => {
        const translateY = animation.interpolate({
          inputRange,
          outputRange: [30 * (index - 1), 30 * index, 30 * (index + 1)],
          extrapolate: 'clamp',
        });
        const opacity = animation.interpolate({
          inputRange,
          outputRange: [index - 1 === currentIndex.current ? 1 : 0, index === currentIndex.current ? 1 : 0, index + 1 === currentIndex.current ? 1 : 0],
          extrapolate: 'clamp',
        });
        return (
          <Animated.Text key={index} style={[styles.text, { opacity, transform: [{ translateY }] }]}>
            {text}
          </Animated.Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbe6e1', // 예시 배경색
  },
    islandImg:{
      width: 320,
      height: 320,
      top:20,
    },

});

export default LoadingPage;
