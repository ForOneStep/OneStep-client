import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity } from "react-native";

import CloseIcon from '../assets/images/svg/CloseIcon.svg';
import EditIcon from '../assets/images/svg/EditIcon.svg';
import LetterIcon from '../assets/images/svg/letter.svg';
import { Button } from "react-native-paper";

const LetterPage = ({navigation}) => {
    const [myLetter,setMyLetter] = useState(1)
    const [familyLetter,setFamilyLetter] = useState(1)
    const [lettersData,setLettersData] = useState([
        {"letter_id":2,"writer_id":"user1","family_id":"아이디1","letter_title":"제목1","letter_txt":"내용1","write_date":"2023-10-11","letter_state":1},
        {"letter_id":3,"writer_id":"user2","family_id":"아이디1","letter_title":"제목3","letter_txt":"내용3","write_date":"2023-10-11","letter_state":1}
    ])
    const [modalVisible, setModalVisible] = useState(true);
    const [titleInputValue, setTitleInputValue] = useState('');
    const [contentInputValue, setContentInputValue] = useState('');

    const openModal = () => {
        console.log(modalVisible)
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

        closeModal();
        setTitleInputValue('');
        setContentInputValue('');
    };

    return (
        <View style={styles.container}>
            <Modal
              style={styles.inputModal}
              visible={modalVisible}
              // presentationStyle={"formSheet"}
              animationType="slide"
              transparent={true}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>모달 화면</Text>
                        <TouchableOpacity style={styles.closeIcon} onPress={() => closeModal()}>
                            <CloseIcon  width={32} height={32} />
                        </TouchableOpacity>
                        <EditIcon style={styles.editIcon}  width={24} height={24}/>
                        <TextInput
                          style={styles.titleInput}
                          value={titleInputValue} onChangeText={handleTitleInputChange} />
                        <TextInput
                          style={styles.contentInput}
                          value={contentInputValue} onChangeText={handleContentInputChange} />
                        <Button title="Submit" onPress={handleSubmit} />
                    </View>
                </View>
            </Modal>
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

                <TouchableOpacity style={styles.infoTextCreateButton} onPress={()=>openModal()}>
                    <Text
                      style={styles.infoTextCreate}>
                        작성하기 >
                    </Text>
                </TouchableOpacity>

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
    infoTextCreateButton:{
        zIndex:10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 외부를 반투명한 검은색으로 설정
    },
    closeIcon:{
        position:"absolute",
        right:10,
        top:10,
    },
    editIcon:{

    },
    modalView:{
        width:'80%',
        height:'70%',

        backgroundColor: 'white', // 모달 창의 배경색을 흰색으로 설정
        borderRadius: 20, // 모달 창의 모서리를 둥글게 설정
        padding: 35, // 모달 창 내부의 패딩 설정
        alignItems: 'center', // 모달 창 내부의 항목들을 가운데 정렬
        shadowColor: "#000", // 그림자 색상 설정
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치 설정
        shadowOpacity: 0.25, // 그림자 투명도 설정
        shadowRadius: 3.84, // 그림자 반경 설정
        elevation: 5, // 그림자 깊이 설정 (안드로이드만 해당)
    },
    container: {
        flex: 1,
        width:'100%',
        backgroundColor: '#f6f5f1', // 예시 배경색
    },
    inputModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 외부를 반투명한 검은색으로 설정
    },
    titleInput:{

    },
    contentInput:{

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
