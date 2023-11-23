import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Button,
} from 'react-native';
import axios from 'axios';
import { UserContext } from "../../../App";

const QuestionItem = ({ question, navigation }) => (
    <TouchableOpacity
        style={styles.questionItem}
        onPress={() => navigation.navigate('RecodeDetail', { questionHeader: question })}
    >
        <View style={styles.questionText}>
            <Text style={styles.question_date}>{question.question_date}.</Text>
            <Text style={styles.questionContent} numberOfLines={1}>
                {question.question_txt}
            </Text>
        </View>
        <Text style={styles.writeDate}>{question.question_date}</Text>
    </TouchableOpacity>
);

const RecodePage = ({ navigation }) => {
    const [questionBlockList, setQuestionBlockList] = useState([]);

    const { userId, familyId } = useContext(UserContext);
    useEffect(() => {
        axios.get(`http://52.79.97.196:8080/question/list/${familyId}`)
            .then(response => {
                setQuestionBlockList(response.data);

                console.log(questionBlockList)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <View style={styles.recodeBackground}>
            <View style={styles.recodeText}>
                <Text style={styles.recodeTitle}>기록</Text>
            </View>
            <FlatList
                contentContainerStyle={styles.questionFlatList}
                data={questionBlockList}
                keyExtractor={(item) => item.question_id.toString()}
                renderItem={({ item }) => <QuestionItem question={item} navigation={navigation} />}
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
    question_date: {
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
