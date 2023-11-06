import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet, Image } from "react-native";

import island8 from '../assets/images/png/island8.png';

const LoadingPage = () => {
  const texts = ['text1', 'text2', 'text3', 'text4', 'text5', 'text6'];


  return (
    <View style={styles.container}>
      <Image source={island8} style={styles.islandImg} />

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
