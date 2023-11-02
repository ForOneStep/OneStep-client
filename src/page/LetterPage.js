import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";


const LetterPage = ({navigation}) => {
    const [myLetter,setMyLetter] = useState(1)
    const [familyLetter,setFamilyLetter] = useState(1)
    const [lettersData,setLettersData] = useState([
        {"letter_id":2,"writer_id":"user1","family_id":"아이디1","letter_title":"제목1","letter_txt":"내용1","write_date":"2023-10-11","letter_state":1},
        {"letter_id":3,"writer_id":"user2","family_id":"아이디1","letter_title":"제목3","letter_txt":"내용3","write_date":"2023-10-11","letter_state":1}
    ])

    return (
        <View style={styles.container}>
            <View style={styles.letterInfoBox}>
                <View style={styles.myLetterBox}>
                    <Text style={styles.myLetterText}>우리집 익명 편지함</Text>
                    <Text style={styles.myLetterNumber}>43</Text>
                </View>
                <View style={styles.familyLetterBox}>
                    <Text style={styles.familyLetterText}>내가 작성한 편지</Text>
                    <Text style={styles.familyLetterNumber}>3</Text>
                </View>
            </View>
            <FlatList
                data={lettersData}
                keyExtractor={item => item.letter_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.letterContainer}>
                        <Text style={styles.titleText}>제목: {item.letter_title}</Text>
                        <Text style={styles.contentText}>내용: {item.letter_txt}</Text>
                        <Text style={styles.dateText}>작성일: {item.write_date}</Text>
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
        alignItems: 'center',
        backgroundColor: '#f6f5f1', // 예시 배경색
    },
    letterInfoBox:{
        flexDirection:'row',
        width: '90%',
        height: 160,
        top:0,
        marginTop: 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'start',
        backgroundColor: '#f5e7e2',
        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
            height: 2, // 상하 그림자 위치
        },
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3.84,   // 그림자 반경

        elevation: 5, // Android에만 적용되는 그림자 깊이

    },
    myLetterBox:{
    },
    myLetterText: {
        color:'#F7B599',
        fontSize: 12,
    },
    myLetterNumber:{
        color:'#F7B599',
        fontSize: 20,
    },
    familyLetterBox:{

    },
    familyLetterText: {
        color:'#F7B599',
        fontSize: 12,
    },
    familyLetterNumber:{
        color:'#F7B599',
        fontSize: 20,
    },

    letterContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentText: {
        fontSize: 16,
    },
    dateText: {
        fontSize: 14,
        color: '#888',
    },
});

export default LetterPage;
