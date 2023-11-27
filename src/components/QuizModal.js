import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import { UserContext } from "../../App";

const QuizModal = ({ quiz,modalVisibleFalse }) => {
  const [answer, setAnswer] = useState(1); // 사용자의 답변을 저장하는 state를 추가합니다.
  const { userId, familyId } = useContext(UserContext);

  const submitAnswer = async () => {
    try {
      const response = await fetch('http://52.79.97.196:8080/quiz/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quiz_id: quiz.quiz_id, // 퀴즈 ID
          user_id: userId, // 사용자 ID
          quiz_ans: answer+1 // 사용자의 답변
        })
      });

      const text = await response.text();
      modalVisibleFalse()
      try {
        const data = JSON.parse(text);
        console.log('Parsed Data:', data);
      } catch(error) {
        console.log('JSON parsing failed, probably text response received');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
console.log(quiz)
  return (
    <View style={styles.container}>
      <View style={styles.quizItem}>
        <Text style={styles.writerText}>{quiz.writer_nickname} 님의 퀴즈!</Text>
        <Text style={styles.quizText}>Q.{quiz.quiz_txt}</Text>
        <TouchableOpacity onPress={() => setAnswer(0)}>
          <Text style={answer === 0 ? styles.selectAnswer : styles.answerText}> 1. {quiz.answer1}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAnswer(1)}>
          <Text style={answer === 1 ? styles.selectAnswer : styles.answerText}> 2. {quiz.answer2}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAnswer(2)}>
          <Text style={answer === 2 ? styles.selectAnswer : styles.answerText}> 3. {quiz.answer3}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAnswer(3)}>
          <Text style={answer === 3 ? styles.selectAnswer : styles.answerText}> 4. {quiz.answer4}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitAnswer}>
          <Text tyle={styles.submitButtonText}>답변 제출 </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  quizItem:{
    backgroundColor:'#fbfaf9',
    padding:20,
    width:290,
    marginTop:20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center',
  },
  submitButtonText:{
    fontSize: 24,
    fontWeight: 'bold',
    color:'#262627',
  },
  submitButton:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#e7b79e',
    padding:10,
    marginTop:20,
    width:250,
    marginVertical:10,
    borderRadius: 20,
    color: '#262627',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  writerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262627',
    marginBottom: 10,
  },
  quizText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262627',
    marginBottom: 10,
  },
  answerText: {
    backgroundColor:'#ffffff',
    width:250,
    padding:10,
    marginVertical:10,
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 20,
    color: '#262627',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  selectAnswer: {
    backgroundColor:'#f4e6e1',
    width:250,
    padding:10,
    marginVertical:10,
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 20,
    color: '#262627',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  answerContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#ffffff',

  },
  answerItem:{

  }
});

export default QuizModal;
