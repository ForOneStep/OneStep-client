import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import LetterIcon from '../../assets/images/svg/letter.svg';
import LoudSpeaker from '../../assets/images/svg/loudSpeaker.svg';
import island1 from '../../assets/images/png/island1.png';
import island2 from '../../assets/images/png/island2.png';
import island3 from '../../assets/images/png/island3.png';
import island4 from '../../assets/images/png/island4.png';
import island5 from '../../assets/images/png/island5.png';
import island6 from '../../assets/images/png/island6.png';
import island7 from '../../assets/images/png/island7.png';
import island8 from '../../assets/images/png/island8.png';
import { UserContext } from '../../contexts/UserContext.js';
import LoadingPage  from "../LoadingPage";

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
    // const { userId, familyId } = React.useContext(UserContext);
    const userId= 'user1'
    const familyId= 'A1B5E6'
    const [question, setQuestion] = useState();
    const [familyMembers, setFamilyMembers] = useState();
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("User Data:", userId);
                console.log("User Data:", familyId);

                const userResponse = await fetch(`http://52.79.97.196:8080/user/${userId}`);
                const userData = await userResponse.json();
                setUserData(userData);
                console.log("User Data:", userData);

                const familyResponse = await fetch(`http://52.79.97.196:8080/user/userInfoByFamId/${familyId}`);
                const familyData = await familyResponse.json();
                setFamilyMembers(familyData);
                console.log("Family Members:", familyData);

                const questionResponse = await fetch(`http://52.79.97.196:8080/question/daily/${userData.family.fam_number}`);
                const questionData = await questionResponse.json();
                setQuestion(questionData);
                console.log("Question Data:", questionData);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
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
    if (isLoading) {
        return <LoadingPage />;
    }
    return (
      <View style={styles.pageBackground}>
          <View style={styles.islandBackground}>
              <ClosestBirth members={familyMembers} />
              <View style={styles.letterText}>
                  <LetterIcon
                    onPress={() => navigation.navigate('Letter')}
                    width={40} height={40} />
              </View>
              <Image source={islands[`island${userData.family.level}`] || islands.island1} style={styles.islandImg} />
              <Text style={styles.famliyName}>{`${userData.family.fam_nickname} 가족 섬`}</Text>
          </View>
          <View  style={styles.questionBlock}>
              <LoudSpeaker style={styles.loudSpeaker}/>
              <Text style={styles.questionText}> {question.question_txt} </Text>
          </View>
          <Text
            onPress={() => navigation.navigate('Question')}
            style={styles.goToAnwser}>답변하러 가기 ></Text>
      </View>
    );
};

const styles = StyleSheet.create({
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
        height: 400,
        alignItems:'center',
        justifyContent:'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#f9f8f5',
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
        color:'#00000077',
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
        top:20,
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
        color:'black',
        fontSize: 24, // 크기를 크게 설정
        fontWeight: 'bold', // 굵게 설정
    },
    dDayTextName:{
        color:'black',
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
        fontSize: 16, // 크기를 크게 설정
        fontWeight: 'bold', // 굵게 설정
        marginLeft:40,
    },
    goToAnwser:{
        top: 10,
        left : 120,
    }
});

export default MainPage;
