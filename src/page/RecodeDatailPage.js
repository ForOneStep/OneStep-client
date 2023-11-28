import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from "react-native";
import LetterIcon from "../assets/images/svg/letter.svg";
import axios from "axios";
import { UserContext } from "../../App";
import CommentIcon from "../assets/images/svg/CommentIcon.svg";

const AnswerItem = ({ item }) => {
    const [comment,setComment] = useState('')
    const [showComments, setShowComments] = useState(false) // 댓글 영역 표시 상태

    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                // console.log(`http://52.79.97.196:8080/comment/viewComment/${item.answer_id}`)
                const comResponse = await axios.get(`http://52.79.97.196:8080/comment/viewComment/${item.answer_id}`);
                setComment(comResponse.data);
                // console.log(comResponse.data)
            }
            catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }

        }
        fetchQuestionData()
    }, []);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    return(
        <View style={styles.answerItem}>
            <Text style={styles.user_nickname}>{item.user_nickname}</Text>
            {item.answer_img &&
                <Image style={styles.answerImg}
                       source={{ uri: item.answer_img }}></Image>
                }
            <Text style={styles.answer_txt}>{item.answer_txt}</Text>
            <Text style={styles.write_date}>{item.write_date}</Text>
            {/*<Text style={styles.like}>{item.like.length}</Text>*/}
            <CommentIcon
                onPress={toggleComments}
                style={styles.commentIcon}
                width={32} height={32}
            />
            {showComments &&
                <View>
                    {comment.map((comment, index) => ( // com이 댓글 데이터를 담고 있는 배열이라고 가정
                        <View key={index} style={styles.commentItem}>
                            <Image style={styles.profileImg} source={{ uri: comment.writer_profile }} />
                            <View style={styles.commentContent}>
                                <Text style={styles.nickname}>{comment.writer_nickname}</Text>
                                <Text style={styles.commentTxt}>{comment.comment_txt}</Text>
                                <Text style={styles.aWriteDate}>{comment.write_date}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                }

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
    console.log(question)
    return (
        <View style={styles.questionItem}>
            <LetterIcon style={styles.letterIcon} />
            <Text style={styles.questionDate}>{question.question_date} 일 질문</Text>
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
                // console.log(answerBlock)
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
    commentSubButton:{
    },
    commentItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    nickname: {
        fontWeight: 'bold',
        marginBottom: 5,

        color:'#262627'
    },
    commentTxt: {
        marginBottom: 5,
        color:'#262627'
    },
    aWriteDate: {
        fontSize: 12,
        color: '#999',
        alignSelf:'flex-end'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    commentIcon:{
        zIndex:100,
        width:32,
        height:32,
        marginRight:10,
        alignSelf:'flex-end',
        // right:10,
        // bottom:10,
        // position:"absolute",
    },
    answerImg:{

        borderRadius: 15,
        width: '100%',
        height: 300,
        marginBottom: 10,

    },
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

        fontWeight: 'bold',
        // marginLeft: 10,
        textAlign: 'left',
        alignSelf:'center',
        marginTop:20,
        color:'#262627',
    },
    questionDate: {
        color: '#262627',
        position: 'absolute',
        top: 10,
        left: 20,
        fontSize: 16,
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
        color: '#262627',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    answer_txt: {
        color: '#262627',
        fontSize: 18,
        marginBottom: 10,
    },
    write_date: {
        top:10,
        right:10,
        position:"absolute",
        // alignSelf: 'flex-end',
        color: '#262627',
    },
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
