import React,{useState} from 'react';
import { View, StyleSheet, Text } from "react-native";
import AnswerBlock from "../../components/answerBlock";

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

                    </View>
                </View>
                <View  style={styles.questionBlock}>

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
        shadowOffset: { width: 0, height: 10 },
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    questionBlock : {
        width: '90%',
        height: 100,
        marginTop: 40,
        borderRadius: 15,
        backgroundColor: '#FFF',
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
        fontSize: 24, // 크기를 크게 설정
        fontWeight: 'bold', // 굵게 설정
    },
    dDayTextName:{
        fontSize: 16, // 크기를 크게 설정
        marginLeft:10,
        marginBottom:3,
    },
    letterText: {
        position: 'absolute',
        top: 10,
        right: 10,
    },

});

export default MainPage;
