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
        <Text style={styles.questionDate}>#{question.date}일 질문</Text>
        <Text style={styles.questionContent}>{question.question_txt}</Text>
    </View>
);

const QuestionPage = () => {
    // const { userId, familyId } = React.useContext(UserContext);
    const [question, setQuestion] = useState();
    const [answerBlockList, setAnswerBlockList] = useState([]);
    const [userData, setUserData] = useState();
    const userId = 'user1'
    const familyId = 'A1B5E6'

    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                const userResponse = await fetch(`http://52.79.97.196:8080/user/${userId}`);
                const userData = await userResponse.json();
                setUserData(userData);

                const questionResponse = await fetch(`http://52.79.97.196:8080/question/daily/${userData.family.fam_number}`);
                const questionData = await questionResponse.json();
                setQuestion(questionData);

                const answerResponse = await fetch(`http://52.79.97.196:8080/answer/read/${questionData.question_id}/${familyId}`);
                const answerData = await answerResponse.json();
                setAnswerBlockList(answerData);
                // console.log(`http://52.79.97.196:8080/answer/read/${questionData.question_id}/${familyId}`)
                // console.log("answerData:", answerData)
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        fetchQuestionData();
    }, []);
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
        backgroundColor:'#F7B599',
        height: 40,
        borderRadius:10,
        bottom:10,
        left:10,
        right:10,
        justifyContent:'center',
        alignItems:'center',
    },
    answerButtonText:{
    color:'black',

        fontSize: 16, // 크기를 크게 설정
      },
});

export default QuestionPage;
