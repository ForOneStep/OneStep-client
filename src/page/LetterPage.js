import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import LetterIcon from '../assets/images/svg/letter.svg';

const LetterPage = ({navigation}) => {
    const [myLetter,setMyLetter] = useState(1)
    const [familyLetter,setFamilyLetter] = useState(1)
    const [lettersData,setLettersData] = useState([
        {"letter_id":2,"writer_id":"user1","family_id":"아이디1","letter_title":"제목1","letter_txt":"내용1","write_date":"2023-10-11","letter_state":1},
        {"letter_id":3,"writer_id":"user2","family_id":"아이디1","letter_title":"제목3","letter_txt":"내용3","write_date":"2023-10-11","letter_state":1}
    ])
    const [modalVisible, setModalVisible] = useState(true);
    const [titlelnputValue, setTitleInputValue] = useState('');
    const [contentInputValue, setContentInputValue] = useState('');

    const openModal = () => {
        setModalVisible(true);
    };

    // 모달을 끄는 함수
    const closeModal = () => {
        setModalVisible(false);
    };

    // 타이틀 인풋 값이 바뀌면 타이틀 값을 바꾸는 함수
    const handleTitleInputChange = (text) => {
        setTitleInputValue(text);
    };

    // 컨텐츠 인풋 값이 바뀌면 컨텐츠 값을 바꾸는 함수
    const handleContentInputChange = (text) => {
        setContentInputValue(text);
    };

    // 버튼을 누르면 타이틀 값과 컨텐츠 값을 백엔드로 보내는 함수
    const handleSubmit = () => {
        // 서버로 데이터를 보내는 코드는 주석으로만 표시합니다
        // fetch('/api/submit', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     title: titleInputValue,
        //     content: contentInputValue,
        //   }),
        // });

        // 모달을 닫고, 입력 필드를 초기화합니다
        closeModal();
        setTitleInputValue('');
        setContentInputValue('');
    };

    return (
        <View style={styles.container}>

            <View style={styles.letterInfoBox}>
                <LetterIcon style={styles.letterIcon}/>
                <View style={styles.myLetterBox}>
                    <Text style={styles.myLetterText}>우리집 익명 편지함</Text>
                    <Text style={styles.myLetterNumber}>43</Text>
                </View>
                <View style={styles.familyLetterBox}>
                    <Text style={styles.familyLetterText}>내가 작성한 편지</Text>
                    <Text style={styles.familyLetterNumber}>3</Text>
                </View>
            </View>
            <View style={styles.infoTextView}>
                <Text style={styles.infoTextAlert}>
                    이번주엔 <Text style={styles.infoTextNumber}>3</Text> 개의 편지가 도착했어요
                </Text>
                <Text
                  style={styles.infoTextCreate}
                  onPress={openModal}
                >
                    작성하기
                </Text>

            </View>
            <FlatList
                horizontal={false}
                contentContainerStyle={styles.letterFlatList}
                data={lettersData}
                keyExtractor={item => item.letter_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.letterContainer}>
                        <Text style={styles.titleText}>{item.letter_title}</Text>
                        <Text style={styles.contentText}>{item.letter_txt}</Text>
                        <Text style={styles.dateText}>{item.write_date}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start',
        backgroundColor: '#f6f5f1', // 예시 배경색
    },
    letterInfoBox:{
        flexDirection:'row',
        height: 120,
        top:0,
        marginTop: 20,
        marginHorizontal:10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'start',
        backgroundColor: '#f5e7e2',
        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
            height: 1, // 상하 그림자 위치
        },
        shadowOpacity: 0.4, // 그림자 투명도
        shadowRadius: 1,   // 그림자 반경

        elevation: 5, // Android에만 적용되는 그림자 깊이

    },
    myLetterBox:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: 'white',
    },
    myLetterText: {
        color:'#F7B599',
        fontSize: 16,
    },
    myLetterNumber:{
        color:'#F7B599',
        fontSize: 28,
    },
    familyLetterBox:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    familyLetterText: {
        color:'#F7B599',
        fontSize: 16,
    },
    familyLetterNumber:{
        color:'#F7B599',
        fontSize: 28,
    },

    infoTextView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        top:30,
        marginHorizontal:16,
    },
    infoTextAlert:{

        fontSize: 16,
        color: '#000',
    },
    infoTextNumber:{
        fontSize: 20,
        color: '#e7b79e', //강조색
        fontWeight: 'bold',
    },
    infoTextCreate:{
        fontSize: 16,
        color: '#e7b79e', //강조색

    },

    letterContainer: {
        padding: 20,
        backgroundColor:'#FFF',
        borderRadius:15,
        marginTop:20,
        marginHorizontal:10,
        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
            height: 2, // 상하 그림자 위치
        },
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3.84,   // 그림자 반경

        elevation: 5, // Android에만 적용되는 그림자 깊이
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentText: {
        fontSize: 16,
        marginTop:5,
    },
    dateText: {
        fontSize: 14,
        color: '#888',
        marginTop:10,
    },
    letterIcon: {
        position: 'absolute',
        left: -8,
        top: -20,
        transform: [{ scaleX: -1 }],
    },
    letterFlatList:{
        paddingBottom: 100,
        top : 20,
        flex: 1,

    },
});

export default LetterPage;
