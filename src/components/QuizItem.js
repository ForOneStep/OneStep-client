import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";

const CorrectUsers = ({ user }) => (
  <Text style={styles.correctAnswerText}>{user}</Text>
);

const IncorrectUsers = ({ user, answer }) => (
  <Text style={styles.answerText}>{user} ({answer})</Text>
);
const QuizItem = ({ quiz, navigation }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const correctUsers = quiz.quizAnswers.filter(item => item.quiz_state === 1);
  const incorrectUsers = quiz.quizAnswers.filter(item => item.quiz_state === 0);

  const colorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(colorAnimation, {
      toValue: isAnswerVisible ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [isAnswerVisible]);

  const bgColorInterpolate = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['darkgray', '#f2f2f2']
  });

  const textColorInterpolate = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['darkgray', 'black']
  });

  return (
    <View style={styles.quizContainer}>
      <Text style={styles.writerText}>{quiz.writer_id} 님의 퀴즈</Text>
      <Text>{quiz.write_date} </Text>
      <Text style={styles.quizText}> {quiz.quiz_txt}</Text>
      <TouchableWithoutFeedback onPress={() => setIsAnswerVisible(true)}>
        <Animated.View style={[styles.correctAnswer, {backgroundColor: bgColorInterpolate}]}>
          <Animated.Text style={{color: textColorInterpolate}}>
            정답 : {quiz[`answer${quiz.quiz_ans}`]}
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <FlatList
        data={correctUsers}
        renderItem={({ item }) => <CorrectUsers user={item.user_id} />}
        keyExtractor={item => item.quizAnswer_id.toString()}
      />
      <FlatList
        data={incorrectUsers}
        renderItem={({ item }) => <IncorrectUsers user={item.user_id} answer={quiz[`answer${item.quiz_ans}`]} />}
        keyExtractor={item => item.quizAnswer_id.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  quizContainer: {
    margin: 10,
    padding: 10,
    width:350,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height:24,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  writerText: {
    fontSize: 15,
    // fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
    marginLeft:8,
  },
  quizText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  correctAnswer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
    backgroundColor:'#f2f2f2',
    padding:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height:24,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  // backgroundColor:'#ffc0bf',
  answerText: {
    fontSize: 17,
    color: '#000000',
    marginBottom: 10,

    borderRadius: 10,
    padding:7,

    paddingLeft:10,
    shadowColor: '#000',

    backgroundColor:'#ffc0bf',
    shadowOffset: {
      width: 2,
      height:24,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  correctAnswerText:{
    fontSize: 17,
    color: '#000000',
    marginBottom: 10,
    padding:7,
    paddingLeft:10,
    borderRadius: 10,
    backgroundColor:'#d5f5b7',

    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height:24,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

});

export default QuizItem;
