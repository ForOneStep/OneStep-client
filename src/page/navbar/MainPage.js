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
    const { userId, familyId } = React.useContext(UserContext);
    const [question, setQuestion] = useState({"question_id":34,"date":"2023-11-14","question_txt":"우리 가족은 서로에게 어떤 점에서 칭찬할 만한 가치가 있을까요?"});
    const [familyMembers, setFamilyMembers] = useState([
        {
            "user_id": "user1",
            "user_name": "김이름",
            "user_nickname": "닉네임1",
            "user_role": "",
            "user_phone_number": "",
            "user_birth": "2001-01-01",
            "profile_path": null
        },
        {
            "user_id": "user2",
            "user_name": "김이름22",
            "user_nickname": "닉네임2",
            "user_role": "",
            "user_phone_number": "",
            "user_birth": "2000-01-06",
            "profile_path": null
        },
        {
            "user_id": "user3",
            "user_name": "김이름333",
            "user_nickname": "닉네임3",
            "user_role": "",
            "user_phone_number": "",
            "user_birth": "2004-01-09",
            "profile_path": null
        },
        {
            "user_id": "user4",
            "user_name": "김이름444",
            "user_nickname": "닉네임4",
            "user_role": "",
            "user_phone_number": "",
            "user_birth": "2002-01-01",
            "profile_path": null
        }
    ]);
    const [userData, setUserData] = useState({
        "user_id": "user1",
        "family": {
            "fam_id": "아이디1",
            "fam_nickname": "닉네임1",
            "level": 5,
            "is_valid": true,
            "fam_number": 0,
            "fam_anniversary": "1991-01-01"
        },
        "user_name": "김이름",
        "user_nickname": "닉네임1",
        "user_role": "",
        "user_phone_number": "",
        "user_birth": "2000-01-01",
        "token": "",
        "profile_path": ""
    });

    useEffect(() => {
        // Fetch today's question
        // fetch(`http://52.79.97.196:8080/question/daily/${familyId}`)
        //   .then((response) => response.json())
        //   .then((data) => {
        //       setQuestion(data);
        //   })
        //   .catch((error) => console.error('Error fetching question:', error));

        // Fetch family members
        // fetch(`http://52.79.97.196:8080/user/userInfoByFamId/${familyId}`)
        //   .then((response) => response.json())
        //   .then((data) => {
        //       setFamilyMembers(data);
        //   })
        //   .catch((error) => console.error('Error fetching family members:', error));
        //
        // // Fetch user information
        // fetch(`http://52.79.97.196:8080/user/${userId}`)
        //   .then((response) => response.json())
        //   .then((data) => {r
        //       setUserData(data)
        //   })
        //   .catch((error) => console.error('Error fetching user information:', error));

        // console.log(question)
        // You can add more API calls as needed

    }, []); // Empt
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
