import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnswerBlock from "../../components/answerBlock";

const MainPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>질문 페이지</Text>

      <AnswerBlock  name={'아무튼 이름'} content={'아무튼 내용 내용 내용'} date={'2023'} comments={[]} ></AnswerBlock>
      <AnswerBlock  name={'저런 이름'} content={'아무튼 내용 아무런 내용'} date={'2023'} comments={[]} ></AnswerBlock>
      <AnswerBlock  name={'아무 이름'} content={'아무튼 대충 대충 내용'} date={'2023'} comments={[]} ></AnswerBlock>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F5F1', // 예시 배경색
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue', // 예시 텍스트 색상
  },
});

export default MainPage;
