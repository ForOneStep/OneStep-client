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

const QuestionItem = ({ question, navigation, order }) => (
    <TouchableOpacity
        style={styles.questionItem}
        onPress={() => navigation.navigate('RecodeDetail', { questionHeader: question })}
    >
        <View style={styles.questionText}>
           <Text style={styles.questionContent} numberOfLines={1}>
               {order}. {question.question_txt}
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
                data={questionBlockList.reverse()}
                keyExtractor={(item) => item.question_id.toString()}
                renderItem={({ item, index }) => {
                    const order = questionBlockList.length - index; // 순서 계산
                    return <QuestionItem question={item} order={order} navigation={navigation} />;
                }}
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

        color:'#262627',
        fontSize: 20,
        fontWeight: 'bold',
    },
    questionFlatList: {
        flexGrow: 1, // 추가
        width: '100%',
        padding: 20,
    },
    questionItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        borderRadius: 6,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#FFE6E0",
        shadowColor: "#000",
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
        flexDirection: "row",
        alignItems: "center",
        marginBottom:20,
    },
    questionContent: {
        flex: 1,
        fontSize: 16,
        padding:5,
        color: "#262627",
    },
    writeDate: {
        color: "#999999",
        fontSize: 12,
        position:"absolute",
        right:10,
        bottom:10,
    },
});

export default RecodePage;
