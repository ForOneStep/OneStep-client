import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import axios from 'axios';
import FormData from 'form-data'; // 수정된 부분
import { UserContext } from '../../../App'
import LetterIcon from '../../assets/images/svg/letter.svg';
import IslandPng from '../../assets/images/png/island1.png'
const AnswerItem = ({ item }) => {
  return(
    <View style={styles.answerItem}>
        <Text style={styles.user_nickname}>{item.user_nickname}</Text>
        <Text style={styles.answer_txt}>{item.answer_txt}</Text>
        <Text style={styles.write_date}>{item.write_date}</Text>
        {/*<Text style={styles.like}>{item.like.length}</Text>*/}
    </View>)
};

const QuestionItem = ({ question }) => {
    if (!question) {
        return (
            <View style={styles.questionItem}>
                <Text>로딩 중...</Text>
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
const QuestionPage = () => {
    const { userId, familyId } = React.useContext(UserContext);
    const [comment, setComment] = useState('');
    const [question, setQuestion] = useState();
    const [answerBlockList, setAnswerBlockList] = useState({"canRead":false,"answers":[{"answer_id":158,"question_id":154,"user_id":"user1","user_nickname":"피글렛","profile_path":"https://conteswt-bucket.s3.ap-northeast-2.amazonaws.com/profile/pig.jpeg","answer_txt":"테스트용 답변2222222222222","answer_img":null,"write_date":"2023-11-17","like":[]}]});
    const [userData, setUserData] = useState();
    const [refreshKey, setRefreshKey] = useState(0);

    // const userId = 'user1';
    // const familyId = 'A1B5E6';

    const handleCommentChange = (text) => {
        setComment(text);
    };

    const handleCommentSubmit = async () => {
        let data = new FormData();
        data.append('answerTxt', comment);
        // const path = RNFetchBlob.fs.dirs.DocumentDir + '/empty.txt'; // 빈 파일 경로
        // await RNFetchBlob.fs.writeFile(path, '', 'utf8'); // 빈 파일 생성

        // data.append('answerTxt', '테스트용 답변');
        // data.append('img', {
        //     uri: path,
        //     type: 'text/plain',
        //     name: 'empty.txt',
        // });

        try {
                const response = await axios({
                    method: 'post',
                    url: `http://52.79.97.196:8080/answer/create/${question.question_id}/${userId}`,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data : data
                });
            console.log(response.data);
            setRefreshKey(oldKey => oldKey + 1);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                const userResponse = await axios.get(`http://52.79.97.196:8080/user/${userId}`);
                setUserData(userResponse.data);
                console.log(userResponse.data.family.fam_number)
                const questionResponse = await axios.get(`http://52.79.97.196:8080/question/daily/${userResponse.data.family.fam_number}`);
                setQuestion(questionResponse.data);
                const answerResponse = await axios.get(`http://52.79.97.196:8080/answer/read/${questionResponse.data.question_id}/${familyId}`);
                setAnswerBlockList(answerResponse.data);
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };
        fetchQuestionData();
    }, [refreshKey]);
    return (
      <View style={styles.container}>
          <QuestionItem question={question} />
          <FlatList
            contentContainerStyle={styles.answerFlatList}
            data={answerBlockList.answers}
            keyExtractor={item => item.answer_id.toString()}
            renderItem={({ item }) => <AnswerItem item={item} />}
          />
          <View style={styles.commentInputContainer}>
              <TextInput
                  style={styles.commentInput}
                  placeholder="댓글을 입력하세요..."
                  value={comment}
                  onChangeText={handleCommentChange}
                  placeholderTextColor="#999999"
              />
              <TouchableOpacity style={styles.commentButton} onPress={handleCommentSubmit}>
                  <Text style={styles.commentButtonText}>전송</Text>
              </TouchableOpacity>
          </View>
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
        // marginLeft: 10,
        textAlign: 'left',
        alignSelf:'center',
        marginTop:20,
        color:'#262627',
    },
    questionDate: {
        color: '#262627',
        position: 'absolute',
        fontWeight: 'bold',
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
        color: '#262627',
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

export default QuestionPage;
