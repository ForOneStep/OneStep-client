import React,{useState} from 'react';
import { View, StyleSheet, Text, Image } from "react-native";
import AnswerBlock from "../../components/answerBlock";
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



const MainPage = ({ navigation }) => {
    const [dDay,setDDay] = useState()
    const [letterAlert,setLetterAlert] = useState()
    const [question,setQuestion] = useState()
    const [level,setLevel] = useState(8)

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
                    <View style={styles.dDayText}>
                        <Text style={styles.dDayTextDate}>D-39</Text>
                        <Text style={styles.dDayTextName}>"이름"님 생일asd</Text>
                    </View>
                    <View style={styles.letterText}>
                        <LetterIcon
                            onPress={() => navigation.navigate('Letter')}
                            width={40} height={40} />
                    </View>
                    <View>
                        <Image source={islands[`island${level}`]} style={styles.islandImg} />
                    </View>
                </View>
                <View  style={styles.questionBlock}>
                    <LoudSpeaker style={styles.loudSpeaker}/>
                    <Text style={styles.questionText}> 가장 기억에 남는 가족 여행은? </Text>
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
        backgroundColor: '#F6F5F1',
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
