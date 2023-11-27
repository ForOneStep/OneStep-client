import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";
import { View, StyleSheet, Text, Image } from "react-native";
import { Modal, Button } from 'react-native'; // 모달과 버튼 컴포넌트를 import 합니다.

import LetterIcon from '../../assets/images/svg/letter.svg';
import QuizIcon from '../../assets/images/svg/QuizIcon.svg';
import LoudSpeaker from '../../assets/images/svg/loudSpeaker.svg';
import island1 from '../../assets/images/png/island1.png';
import island2 from '../../assets/images/png/island2.png';
import island3 from '../../assets/images/png/island3.png';
import island4 from '../../assets/images/png/island4.png';
import island5 from '../../assets/images/png/island5.png';
import island6 from '../../assets/images/png/island6.png';
import island7 from '../../assets/images/png/island7.png';
import island8 from '../../assets/images/png/island8.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingPage  from "../LoadingPage";
import QuizModal  from "../../components/QuizModal";
import { UserContext } from '../../../App'
import axios from "axios";

const ClosestBirth = ({ members }) => {
    const today = new Date();
    let closestBirthday = null;

    members.forEach(member => {
            const birthDate = new Date(member.user_birth);
            birthDate.setFullYear(today.getFullYear());

            // If the birthday has already occurred this year, set it to next year
            if (today > birthDate) {
                birthDate.setFullYear(today.getFullYear() + 1);
            }

            const timeDifference = birthDate.getTime() - today.getTime();
            const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            if (!closestBirthday || daysRemaining < closestBirthday.daysRemaining) {
                closestBirthday = {
                    name: member.user_name,
                    daysRemaining: daysRemaining
                };
            }
    })

    return (
      <View style={styles.dDayText}>
          <Text style={styles.dDayTextDate}>{`D-${closestBirthday.daysRemaining}`}</Text>
          <Text style={styles.dDayTextName}>{`${closestBirthday.name}님 생일`}</Text>
      </View>
    );
};

const MainPage = ({ navigation }) => {
    // AsyncStorage에서 값을 불러오기
    // const userId = await AsyncStorage.getItem('userId');
    // const familyId = await AsyncStorage.getItem('familyId');
    const { userId, familyId } = useContext(UserContext);
    // const userId= 'user1'
        // const familyId= 'A1B5E6'
    const [modalVisible, setModalVisible] = useState(false); // 모달의 표시 여부를 관리하는 state를 추가합니다.
    const [quiz,setQuiz] =useState();
    const [question, setQuestion] = useState();
    const [familyMembers, setFamilyMembers] = useState();
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const moveAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fetchData = async () => {
            console.log(userId,familyId)
            try {
                const [quizResponse, userResponse, familyResponse] = await axios.all([
                    axios.get(`http://52.79.97.196:8080/quiz/todayQuiz/${familyId}`),
                    axios.get(`http://52.79.97.196:8080/user/${userId}`),
                    axios.get(`http://52.79.97.196:8080/user/userInfoByFamId/${familyId}`),
                ]);

                const quizData = quizResponse.data;
                const userData = userResponse.data;
                const familyData = familyResponse.data;

                setQuiz(quizData);
                setUserData(userData);
                setFamilyMembers(familyData);

                const questionResponse = await axios.get(`http://52.79.97.196:8080/question/daily/1`)
                // const questionResponse = await axios.get(`http://52.79.97.196:8080/question/daily/${userData.family.fam_number}`)
                const questionData = questionResponse.data;
                setQuestion(questionData);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const fetchQuizData = async () => {
            try {
                const quizResponse = await fetch(`http://52.79.97.196:8080/quiz/todayQuiz/${familyId}`);
                const quizData = await quizResponse.json();
                setQuiz(quizData)
                // quizData가 null이 아니거나 quizData.quizAnswers에 userId가 없으면 모달을 표시합니다.
                console.log(quizData)
                if (quizData && !quizData.quizAnswers.filter(answer => answer.quiz_state !== 2).some(answer => answer.user_id === userId)){
                    // console.log(userId)
                    setModalVisible(true);
                }
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };
        fetchQuizData();

        Animated.loop(
            Animated.sequence([
                Animated.timing(moveAnimation, {
                    toValue: 20,
                    duration: 2000,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.timing(moveAnimation, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
            ]),
            {
                iterations: Infinity,
            }
        ).start();
    }, [userId, familyId]);
    const islands = {
        island1,
        island2,
        island3,
        island4,
        island5,
        island6,
        island7,
        island8,
    };
    const modalVisibleFalse = () => {
        setModalVisible(false)
    }
    if (isLoading) {
        return <LoadingPage />;
    }
    return (
      <View style={styles.pageBackground}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
          >
              <QuizModal quiz={quiz} modalVisibleFalse={modalVisibleFalse}></QuizModal>
          </Modal>
          <View style={styles.islandBackground}>
              <ClosestBirth members={familyMembers} />
              <View style={styles.iconContainer}>
                  <QuizIcon
                    onPress={() => navigation.navigate('QuizRecode')}
                    style={styles.quizIcon}
                    width={42} height={42}/>
                  <LetterIcon
                    onPress={() => navigation.navigate('Letter')}
                    width={40} height={40} />
              </View>
              <Animated.Image source={islands[`island${userData.family.level}`] || islands.island1} style={[styles.islandImg, { transform: [{ translateY: moveAnimation }] }]} />
              <Text style={styles.famliyName}>{`${userData.family.fam_nickname} 가족 섬`}</Text>
          </View>
          <TouchableOpacity   style={styles.questionBlock}
                              onPress={() => navigation.navigate('Question')}>
              <LoudSpeaker style={styles.loudSpeaker}/>
              <Text style={styles.questionText}> {question.question_txt} </Text>
          </TouchableOpacity>
          <Text
            onPress={() => navigation.navigate('Question')}
            style={styles.goToAnwser}>답변하러 가기 ></Text>
      </View>
    );
};

const styles = StyleSheet.create({
    quizIcon:{
      marginRight:20,
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
    },
    pageBackground: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#FBE6E1',
        justifyContent: 'start', // 주 축에서 중앙 정렬
        alignItems: 'center', // 교차 축에서 중앙 정렬
    },
    islandBackground: {
        width: '100%',
        height: 500,
        alignItems:'center',
        justifyContent:'space-around',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#fbfaf8',
        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
            height: 2, // 상하 그림자 위치
        },
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3.84,   // 그림자 반경

        elevation: 5, // Android에만 적용되는 그림자 깊이

    },
    questionBlock : {
        width: '90%',
        paddingRight:20,
        height: 80,
        marginTop: 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'start',
        backgroundColor: '#FFF',
        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
            height: 2, // 상하 그림자 위치
        },
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3.84,   // 그림자 반경

        elevation: 5, // Android에만 적용되는 그림자 깊이

    },
    famliyName:{
        color:'#262627',
        fontSize: 24, // 크기를 크게 설정
        fontWeight: 'bold', // 굵게 설정
    },
    loudSpeaker:{
        position:'absolute',
      left:-16,
      top:-24,
    },
    islandImg:{
        width: 320,
        height: 320,
        top:60,
    },
    dDayText: {
        position: 'absolute',
        top: 20,
        left: 20,
        display: 'flex',
        flexDirection:'row',
        alignItems:'flex-end',
    },
    dDayTextDate:{
        color:'#262627',
        fontSize: 24, // 크기를 크게 설정
        fontWeight: 'bold', // 굵게 설정
    },
    dDayTextName:{
        color:'#262627',
        fontSize: 16, // 크기를 크게 설정
        marginLeft:10,
        marginBottom:3,
    },
    letterText: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    questionText:{
        color:'#262627',
        fontSize: 16, // 크기를 크게 설정
        // fontWeight: 'bold', // 굵게 설정
        marginLeft:40,
    },
    goToAnwser:{
        color:'#262627',
        top: 10,
        left : 120,
    }
});

export default MainPage;
