import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { UserContext } from "../../App";

const QuizPostPage = () => {
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="퀴즈 내용"
          onChangeText={setQuizTxt}
        />
      </View>
      {[answer1, answer2, answer3, answer4].map((answer, index) => (
        <View style={styles.inputContainer} key={index}>
          <RadioButton
            value={index + 1}
            status={quiz_ans == String(index + 1) ? 'checked' : 'unchecked'}
            onPress={() => setQuizAns(String(index + 1))}
          />
          <TextInput
            style={styles.input}
            placeholder={`답변 ${index + 1}`}
            onChangeText={(text) => {
              if (index === 0) setAnswer1(text);
              else if (index === 1) setAnswer2(text);
              else if (index === 2) setAnswer3(text);
              else if (index === 3) setAnswer4(text);
            }}
          />
        </View>
      ))}
      <Button title="퀴즈 생성" onPress={submitQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
});

export default QuizPostPage;
