import React,{useState} from 'react';
import { View, StyleSheet, Text } from "react-native";
import AnswerBlock from "../../components/answerBlock";
import LetterIcon from '../../assets/images/svg/letter.svg';
const MainPage = () => {
    const [dDay,setDDay] = useState()
    const [letterAlert,setLetterAlert] = useState()
    const [question,setQuestion] = useState()
    const [level,setLevel] = useState()


    return (
            <View style={styles.pageBackground}>
                <View style={styles.islandBackground}>
                    <View style={styles.dDayText}>
                        <Text style={styles.dDayTextDate}>D-39</Text>
                        <Text style={styles.dDayTextName}>"이름"님 생일</Text>
                    </View>
                    <View style={styles.letterText}>
                        <LetterIcon width={40} height={40} />
                    </View>
                </View>
                <View  style={styles.questionBlock}>
                    <Text style={styles.questionText}> 가장 기억에 남는 가족 여행은? </Text>
                </View>
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
    }

});

export default MainPage;
