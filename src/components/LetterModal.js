import React, { useState } from "react";
import { Modal, View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from "react-native";
import CloseIcon from '../assets/images/svg/CloseIcon.svg';
import axios from 'axios';
const LetterModal = ({ modalVisible, closeModal, addSetR}) => {
    const { userId, familyId } = React.useContext(UserContext);
    const [titleInputValue, setTitleInputValue] = useState('');
    const [contentInputValue, setContentInputValue] = useState('');
    // const userId = 'user1';
    // const familyId = 'A1B5E6';

    // 타이틀 인풋 값이 바뀌면 타이틀 값을 바꾸는 함수
    const handleTitleInputChange = (text) => {
        setTitleInputValue(text);
    };

    // 컨텐츠 인풋 값이 바뀌면 컨텐츠 값을 바꾸는 함수
    const handleContentInputChange = (text) => {
        setContentInputValue(text);
    };

    // 버튼을 누르면 타이틀 값과 컨텐츠 값을 백엔드로 보내는 함수
    const handleSubmit = async () => {
        // 오늘 날짜를 가져와서 yyyy-mm-dd 형식으로 변환
        const today = new Date();
        try {
            const response = await axios.post('http://52.79.97.196:8080/letter/write', {
                "writer_id": "user1",
                "letter_title": titleInputValue,
                "letter_txt": contentInputValue,
            });

            if (response.status === 200) {
                // 쪽지 작성 성공
                console.log("성공")
            } else {
                console.log("실패")
            }
            addSetR()
        } catch (error) {

            console.log("실패",error)
        }
        closeModal();
        setTitleInputValue('');
        setContentInputValue('');
    };
    return (
        <Modal
            style={styles.inputModal}
            visible={modalVisible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <Text style={styles.title}>편지 작성</Text>
                        <TouchableOpacity style={styles.closeIcon} onPress={() => closeModal()}>
                            <CloseIcon width={32} height={32} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.titleInput}
                        value={titleInputValue}
                        onChangeText={handleTitleInputChange}
                        placeholder="제목을 입력해주세요"
                    />
                    <TextInput
                        style={styles.contentInput}
                        value={contentInputValue}
                        onChangeText={handleContentInputChange}
                        placeholder="내용을 입력해주세요"
                        multiline
                    />
                    <Button style={styles.submitButton} title="Submit" onPress={handleSubmit} >
                        제출 하기
                    </Button>
                </View>
            </View>
        </Modal>
    );
};

/* Styles */
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 외부를 반투명한 검은색으로 설정
    },
    submitButton:{
        backgroundColor:'#fbe6e1',
    },
    closeIcon:{
        position:"absolute",
        right:0,
        top:0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        flex: 1,
    },
    modalView: {
        width: '80%',
        height: '70%',
        backgroundColor: 'white', // 모달 창의 배경색을 흰색으로 설정
        borderRadius: 20, // 모달 창의 모서리를 둥글게 설정
        padding: 35, // 모달 창 내부의 패딩 설정
        shadowColor: "#000", // 그림자 색상 설정
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치 설정
        shadowOpacity: 0.25, // 그림자 투명도 설정
        shadowRadius: 3.84, // 그림자 반경 설정
        elevation: 5, // 그림자 깊이 설정 (안드로이드만 해당)
    },
    titleInput: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        marginBottom: 20,
    },
    contentInput: {
        flex: 1,
        width: '100%',
        textAlignVertical: 'top', // 안드로이드에서 텍스트를 상단에 정렬
    },
    inputModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 외부를 반투명한 검은색으로 설정
    },
});

export default LetterModal;
