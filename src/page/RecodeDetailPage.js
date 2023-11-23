import React from 'react';
import { View, Text } from 'react-native';

const AnswerItem = ({ item }) => {
    return(
        <View style={styles.answerItem}>
            <Text style={styles.user_nickname}>{item.user_nickname}</Text>
            <Text style={styles.answer_txt}>{item.answer_txt}</Text>
            <Text style={styles.write_date}>{item.write_date}</Text>
            <Text style={styles.like}>{item.like.length}</Text>
        </View>)
};

const RecodeDetailPage = () => {
//  const { question } = route.params;

    return (
        <View>
            <Text>Question ID: test test</Text>
            <Text>Question Text: test test</Text>
            <Text>Write Date: test test</Text>
        </View>
    );
};

export default RecodeDetailPage;
