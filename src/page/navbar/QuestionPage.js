import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import AnswerBlock from "../../components/answerBlock";
import answerBlock from "../../components/answerBlock";
import { Button, Card } from "react-native-paper";

const QuestionPage = () => {
  const [answerBlockList,setAnswerBlockList] = useState([
    {name:'이름',content:'내용',date:'2023',id:'1'},
    {name:'이름',content:'내용',date:'2023', id:'2'}
  ])

  return (
    <View style={styles.container}>
      {/* 오늘의 질문 카드 */}
      {/* 질문 내용을 상태에서 가져와야 합니다. */}
      {/* 임시로 하드코딩된 문자열을 사용했습니다. */}
      <Card style={{margin:10}}>
        <Card.Title title="오늘의 질문" />
        <Card.Content><Text>질문 내용</Text></Card.Content>
      </Card>

      {/* 대답 카드들 */}
      {answerBlockList.map((answer) => {
        return(
          <AnswerBlock  key={answer.id} name={answer.name}
                        content={answer.content} date={answer.date}
                        comments={[]} ></AnswerBlock>
        )
      })}

      {/* 내 대답 추가 버튼 */}
      <Button
        mode="contained"
        onPress={() => console.log('Add Answer Pressed')}
        style={{ margin: 10 }}
      >
        내 대답 추가
      </Button>
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

export default QuestionPage;
