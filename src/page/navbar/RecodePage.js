import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
//import QuestionPage  from "./QuestionPage";


const QuestionItem = ({ question, navigation }) => (
  <TouchableOpacity
    style={styles.questionItem}
    onPress={() => navigation.navigate('RecodeDetail', { question })}
  >
    <View style={styles.questionText}>
      <Text style={styles.questionId}>{question.question_id}.</Text>
      <Text style={styles.questionContent} numberOfLines={1}>
        {question.question_txt}
      </Text>
    </View>
    <Text style={styles.writeDate}>{question.write_date}</Text>
  </TouchableOpacity>
);

const RecodePage = ({ navigation }) => {
  const [questionBlockList, setQuestionBlockList] = useState([
    {
      question_id: 1,
      question_txt: '가장 기억에 남는 가족 여행은?',
      write_date: '2023-11-17',
    },
    {
      question_id: 2,
      question_txt: '가장 좋아하는 사람은?',
      write_date: '2023-10-17',
    },
    {
      question_id: 3,
      question_txt:
        '텍스트가 길 때를 대비하여 준비해보는 길지만 무슨 뜻이지도 모르는 한 줄의 문장',
      write_date: '2023-09-17',
    },
    {
      question_id: 4,
      question_txt:
        '나나나나나나나나나나나나나나나나나나나나나나나나나나나나나나?',
      write_date: '2023-08-17',
    },
    {
      question_id: 5,
      question_txt:
        '다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다다?',
      write_date: '2023-05-17',
    },
  ]);

  useEffect(() => {}, []);

  return (
    <View style={styles.recodeBackground}>
      <View style={styles.recodeText}>
        <Text style={styles.recodeTitle}>기록기록기록기록</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.questionFlatList}
        data={questionBlockList}
        keyExtractor={(item) => item.question_id.toString()}
        renderItem={({ item }) => <QuestionItem question={item} navigation={navigation} />}
      />
      <Button
        title='Go to Question Button for navigation test'
        color='#F7B599'
        onPress={ () => navigation.navigate('Question')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recodeBackground: {
    flex: 1,
    width: '100%',
    padding: 10,
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // marginTop: 60,
    // backgroundColor: 'cornflowerblue',
  },
  recodeText: {
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    // width: '100%',
    marginTop: 20,
    paddingLeft: 20,
    // marginLeft: 40,
    // backgroundColor: 'red'
  },
  recodeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  questionFlatList: {
    flex: 1,
    width: '100%',
    // alignItems: 'center',
    // flexDirection: 'row',
    // backgroundColor: 'coral',
    padding: 20,
  },
  questionItem: {
    // width: '90%',
    // height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
//    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#ffe6e0',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionText: {
    flex: 1,
    flexDirection: 'row',
  },
  questionId: {
    // flex: 1,
    fontSize: 14,
    // backgroundColor: 'teal',
  },
  questionContent: {
    // flex: 6,
    marginLeft: 5,
    fontSize: 14,
    // color: 'red',
    // backgroundColor: 'yellow',
  },
  writeDate: {
    // flex: 3,
    color: 'grey',
    fontSize: 10,
    // textAlign: ''
    // fontWeight: 'bold',
    // backgroundColor: 'coral',
  },
});

export default RecodePage;