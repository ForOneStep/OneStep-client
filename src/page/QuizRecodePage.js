import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import QuizItem from '../components/QuizItem';
import QuizPostPage from './QuizPostPage'

const QuizRecodePage = ({navigation}) => {
  const [quizData, setQuizData] = useState(null);
  const [canCreateQuiz, setCanCreateQuiz] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {

      const familyId = 'A1B5E6';
      const response = await fetch(`http://52.79.97.196:8080/quiz/quizList/${familyId}`);
      const data = await response.json();
      setQuizData(data);

      const canCreateResponse = await fetch(`http://52.79.97.196:8080/quiz/canQuiz/${familyId}`);
      const canCreateData = await canCreateResponse.json();
      setCanCreateQuiz(canCreateData);
      console.log(canCreateData)

      // console.log(data)
    };
    fetchQuizData();
  }, []);

  if (!quizData) {
    return <Text>Loading...</Text>;
  }
  console.log(quizData)
  return (
    <View style={styles.container}>
      <FlatList
          data={quizData.sort((a, b) => new Date(b.write_date) - new Date(a.write_date))}
          renderItem={({ item }) => <QuizItem quiz={item} navigation={navigation} />}
          keyExtractor={item => item.quiz_id.toString()}
      />
      <TouchableOpacity
        style={[styles.createButton, !canCreateQuiz && styles.disabledButton]}
        onPress={() => canCreateQuiz && navigation.navigate('QuizPost')}>
        <Text style={styles.buttonText}>{canCreateQuiz ? "퀴즈 만들기" : "오늘 이미 퀴즈가 생성되었어요."}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingBottom:50,
  },
  createButton: {
    position: 'absolute',
    width:'95%',
    justifyContent:'center',
    alignItems:'center',
    bottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f7b599',
  },
  disabledButton: {
    backgroundColor: '#d3d3d3', // 회색
  },
  buttonText: {
    color:'#000000',
    fontSize: 18,
  },
});

export default QuizRecodePage;
