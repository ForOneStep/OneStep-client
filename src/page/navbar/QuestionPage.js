import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AnswerBlock from "../../components/answerBlock";
import answerBlock from "../../components/answerBlock";
import { Button, Card } from "react-native-paper";

const AnswerItem = ({ item }) => (
    <View style={styles.answerItem}>
        <Text style={styles.user_nickname}>{item.user_nickname}</Text>
        <Text style={styles.answer_txt}>{item.answer_txt}</Text>
        <Text style={styles.write_date}>{item.write_date}</Text>
        <Text style={styles.like}>{item.like.length}</Text>
    </View>
);
const QuestionItem = ({ question }) => (
    <View style={styles.questionItem}>
        <Text style={styles.questionId}>질문 ID: {question.question_id}</Text>
        <Text style={styles.questionContent}>질문 내용: {question.question_txt}</Text>
    </View>
);

const QuestionPage = () => {
  const [answerBlockList,setAnswerBlockList] = useState([
      {
          "answer_id": 7,
          "question_id": 1,
          "user_id": "user1",
          "user_nickname": "닉네임1",
          "profile_path": "",
          "answer_txt": "ABc",
          "answer_img": null,
          "write_date": "2023-10-17",
          "like": []
      },
      {
          "answer_id": 8,
          "question_id": 1,
          "user_id": "user2",
          "user_nickname": "닉네임2",
          "profile_path": "",
          "answer_txt": "aaa",
          "answer_img": null,
          "write_date": "2023-10-10",
          "like": [
              {
                  "likeId": {
                      "answerId": 8,
                      "userId": "user1"
                  }
              },
              {
                  "likeId": {
                      "answerId": 8,
                      "userId": "user2"
                  }
              },
              {
                  "likeId": {
                      "answerId": 8,
                      "userId": "user3"
                  }
              }
          ]
      },
      {
          "answer_id": 9,
          "question_id": 1,
          "user_id": "user3",
          "user_nickname": "닉네임3",
          "profile_path": "",
          "answer_txt": "aaa",
          "answer_img": null,
          "write_date": "2023-10-10",
          "like": []
      }
  ])
  useEffect(() => {

  }, []);
    return (
      <View>
          <QuestionItem question={{ question_id: 1, question_txt: '질문1' }} />
        <FlatList
            data={answerBlockList}
            keyExtractor={item => item.answer_id.toString()}
            renderItem={({ item }) => <AnswerItem item={item} />}
        />
      </View>
    );
};

const styles = StyleSheet.create({
    questionItem:{
        padding: 20,
        backgroundColor:'#ffe6e0',
        borderRadius:15,
        marginTop:20,
        marginHorizontal:10,
        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
            height: 2, // 상하 그림자 위치
        },
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3.84,   // 그림자 반경

        elevation: 5, // Android에만 적용되는 그림자 깊이
    },
    questionContent: {
        fontSize: 18,
        marginLeft: 20, // 왼쪽 여백 추가
        textAlign: 'left', // 텍스트를 왼쪽 정렬
        marginVertical:15,
    },
    questionId: {
        color: '#f7b599',
        position: 'absolute',
        top: 10,
        left:10,
        fontSize: 12, // 작은 크기로 설정

    },
    answerItem:{
        padding: 20,
        backgroundColor:'#FFF',
        borderRadius:15,
        marginTop:20,
        marginHorizontal:10,
        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
            height: 2, // 상하 그림자 위치
        },
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3.84,   // 그림자 반경

        elevation: 5, // Android에만 적용되는 그림자 깊이

    },
    user_nickname:{
        color:'black',
        fontSize: 18, // 크기를 크게 설정
        fontWeight: 'bold', // 굵게 설정
        marginBottom:10,
    },
    answer_txt:{
        fontSize: 18, // 크기를 크게 설정

    },
    write_date:{

    },
    like:{

    },
});

export default QuestionPage;
