import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { UserContext } from "../../App";

const QuizPostPage = () => {
  const [canCreateQuiz, setCanCreateQuiz] = useState(false);
  const [quiz_txt, setQuizTxt] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [quiz_ans, setQuizAns] = useState('');
  const { userId, familyId } = useContext(UserContext);
  const submitQuiz = async () => {
    const quizData = {
      user_id: userId,
      quiz_txt,
      answer1,
      answer2,
      answer3,
      answer4,
      quiz_ans
    };


    const response = await fetch('http://52.79.97.196:8080/quiz/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quizData)
    });
    const data = await response.json();
    console.log(data);  // 응답 결과를 콘솔에 출력
  };

  return (
    <View style={styles.container}>
      <Text style={styles.quizTitle}>Quiz</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Quiz 내용"
          onChangeText={setQuizTxt}
          style={[styles.input, {color: '#262627'}]}
          placeholderTextColor="#999"
        />
      </View>
      {[answer1, answer2, answer3, answer4].map((answer, index) => (
        <View style={styles.inputContainer} key={index}>
          <RadioButton
            value={index + 1}
            status={quiz_ans == String(index + 1) ? 'checked' : 'unchecked'}
            onPress={() => setQuizAns(String(index + 1))}
            color='#F7B599'
          />
          <TextInput
            style={[styles.input, {color: '#262627'}]}
            placeholderTextColor="#999"
            placeholder={`${index + 1}. `}
            onChangeText={(text) => {
              if (index === 0) setAnswer1(text);
              else if (index === 1) setAnswer2(text);
              else if (index === 2) setAnswer3(text);
              else if (index === 3) setAnswer4(text);
            }}
          />
        </View>
      ))}
      <TouchableOpacity
        style={styles.quizButton}
        onPress={submitQuiz}
      >
        <Text style={styles.quizButtonText}>Quiz 만들기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f2f2f2',
    padding: 20,
  },
  quizTitle: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 70,
  },
  quizButton: {
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 30,
    backgroundColor: '#F7B599',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quizButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default QuizPostPage;
