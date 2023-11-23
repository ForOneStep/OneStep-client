import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import LetterIcon from "../assets/images/svg/letter.svg";
import axios from "axios";
import { UserContext } from "../../App";

const AnswerItem = ({ item }) => {
    return(
        <View style={styles.answerItem}>
            <Text style={styles.user_nickname}>{item.user_nickname}</Text>
            <Text style={styles.answer_txt}>{item.answer_txt}</Text>
            <Text style={styles.write_date}>{item.write_date}</Text>
            <Text style={styles.like}>{item.like.length}</Text>
        </View>)
};

const QuestionItem = ({ question }) => {
    // {"is_group_question": false, "question_date": "2023-11-06", "question_id": 7, "question_txt": "가족 중 누구가 처음으로 결혼을 하셨을 때 어떤 기이셨나요?"}
    if (!question) {
        return (
            <View style={styles.questionItem}>
                {/*<Text>로딩 중...</Text>*/}
            </View>
        );
    }

    return (
        <View style={styles.questionItem}>
            <LetterIcon style={styles.letterIcon} />
            <Text style={styles.questionDate}>#{question.date}일 질문</Text>
            <Text style={styles.questionContent}>{question.question_txt}</Text>
        </View>
    );
};


const RecodeDetailPage = ({route}) => {
    const { questionHeader } = route.params;
    const { familyId } = useContext(UserContext);
    const [answerBlockList, setAnswerBlockList] = useState({"canRead":false,"answers":[{"answer_id":158,"question_id":154,"user_id":"user1","user_nickname":"피글렛","profile_path":"https://conteswt-bucket.s3.ap-northeast-2.amazonaws.com/profile/pig.jpeg","answer_txt":"테스트용 답변2222222222222","answer_img":null,"write_date":"2023-11-17","like":[]}]});


    // questionHeader
    useEffect(() => {

        const fetchQuestionData = async () => {
            try {
                const answerBlockResponse = await axios.get(`http:/52.79.97.196:8080/answer/read/${questionHeader.question_id}/${familyId}`)
                const answerBlock = answerBlockResponse.data;
                setAnswerBlockList(answerBlock);
                console.log(answerBlock)
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };
        fetchQuestionData();
    }, []);
    return (
        <View style={styles.container}>
            <QuestionItem question={questionHeader} />
            <FlatList
                contentContainerStyle={styles.answerFlatList}
                data={answerBlockList.answers}
                keyExtractor={item => item.answer_id.toString()}
                renderItem={({ item }) => <AnswerItem item={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    questionItem: {
        padding: 20,
        backgroundColor: '#ffe6e0',
        borderRadius: 15,
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    questionContent: {
        fontSize: 18,
        marginLeft: 20,
        textAlign: 'left',
        marginVertical: 15,
    },
    questionDate: {
        color: '#f7b599',
        position: 'absolute',
        top: 10,
        left: 20,
        fontSize: 12,
    },
    letterIcon: {
        position: 'absolute',
        left: -8,
        top: -20,
        transform: [{ scaleX: -1 }],
    },
    answerFlatList: {
        paddingBottom: 100,
    },
    answerItem: {
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginTop: 20,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    user_nickname: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    answer_txt: {
        fontSize: 18,
    },
    write_date: {},
    like: {},
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        marginVertical: 20,
        marginTop: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    commentInput: {
        flex: 1,
        height: 40,
        marginRight: 10,
    },
    commentButton: {
        backgroundColor: '#F7B599',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    commentButtonText: {
        color: 'black',
        fontSize: 16,
    },
    createAnswerButton: {
        position: 'absolute',
        backgroundColor: '#F7B599',
        height: 40,
        borderRadius: 10,
        bottom: 10,
        left: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerButtonText: {
        color: 'black',
        fontSize: 16,
    },
});

export default RecodeDetailPage;
