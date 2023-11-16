import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { Button, Card } from "react-native-paper";
import LetterIcon from '../../assets/images/svg/letter.svg';
import { UserContext } from "../../contexts/UserContext";

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
        <LetterIcon style={styles.letterIcon}/>
        <Text style={styles.questionDate}>#{question.question_date} 번째 질문</Text>
        <Text style={styles.questionContent}>{question.question_txt}</Text>
    </View>
);

const QuestionPage = () => {
    const { userId, familyId } = React.useContext(UserContext);
    const [question, setQuestion] = useState({"question_date":"2023-10-1","question_txt":"질문1"});
    const [answerBlockList, setAnswerBlockList] = useState([]);

    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                console.log('userId:', userId);
                console.log('familyId:', familyId);

                // 질문 데이터 가져오기
                // const questionResponse = await fetch(`http://52.79.97.196:8080/question/daily/${familyId}`);
                // const questionData = await questionResponse.json();
                // setQuestion(questionData);
                //
                // // 답변 데이터 가져오기
                // consst answerResponse = await fetch(`http://52.79.97.196:8080/answer/read/${questionData.question_id}/${familyId}`);
                // const answerData = await answerResponse.json();
                // setAnswerBlockList(answerData);
                //

                // console.log('질문:', questionData);
                // console.log('답변:',estionData);

            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        fetchQuestionData();
    }, [familyId]);
    return (
      <View style={styles.container}>
          <QuestionItem question={question} />
          <FlatList
            contentContainerStyle={styles.answerFlatList}
            data={answerBlockList}
            keyExtractor={item => item.answer_id.toString()}
            renderItem={({ item }) => <AnswerItem item={item} />}
          />
          <Button style={styles.creatAnswerButton}>
              <Text style={styles.answerButtonText}>내 대답 작성하기</Text>
          </Button>
      </View>
    );
};

const styles = StyleSheet.create({

    container:{
      flex:1,
    },
    questionItem:{
        padding: 20,
        backgroundColor:'#ffe6e0',
        borderRadius:15,
        marginTop:30,
        marginBottom:10,
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
    questionDate: {
        color: '#f7b599',
        position: 'absolute',
        top: 10,
        left:20,
        fontSize: 12, // 작은 크기로 설정

    },
    letterIcon: {
        position: 'absolute',
        left: -8,
        top: -20,
        transform: [{ scaleX: -1 }],
    },
    answerFlatList:{
        paddingBottom: 100,
        // flex: 1,
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
    creatAnswerButton:{
        position:'absolute',
        backgroundColor:'#fbe6e1',
        height: 60,
        borderRadius:15,
        bottom:10,
        left:10,
        right:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#00000077',
        borderWidth:1,
    },
    answerButtonText:{
    color:'black',

        fontSize: 16, // 크기를 크게 설정
      },
});

export default QuestionPage;
