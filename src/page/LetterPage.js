import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity } from "react-native";

import CloseIcon from '../assets/images/svg/CloseIcon.svg';
import EditIcon from '../assets/images/svg/EditIcon.svg';
import LetterIcon from '../assets/images/svg/letter.svg';
import { Button } from "react-native-paper";
import LetterModal from "../components/LetterModal";
import axios from "axios";

const LetterItem = ({ item }) => (
  <View style={styles.letterContainer}>
      <Text style={styles.titleText}>{item.letter_title}</Text>
      <Text style={styles.contentText}>{item.letter_txt}</Text>
      <Text style={styles.dateText}>{item.write_date}</Text>
  </View>
);

const LetterPage = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [weeklyLetters,setWeeklyLetters] = useState([])
    const [userLetters, setUserLetters] = useState([]); // 사용자가 작성한 쪽지
    const [familyLetters, setFamilyLetters] = useState([]); // 가족의 쪽지
    const [userId, setUserId] = useState('user1'); // 로컬 스토리지에서 가져온 family_id
    const [familyId, setFamilyId] = useState('A1B5E6'); // 로컬 스토리지에서 가져온 family_id


    // 컴포넌트가 마운트되면 데이터 불러오기
        useEffect(() => {
            // 사용자가 작성한 쪽지 불러오기
            const loadUserLetters = async () => {
                try {
                    const response = await axios.get(`http://52.79.97.196:8080/letter/byUser/${userId}`);
                    setUserLetters(response.data);
                    console.log(response.data)
                } catch (error) {

                    console.log("유저 불러오기 오류",error)
                }
            };

            // 가족의 쪽지 불러오기
            const loadFamilyLetters = async () => {
                try {
                    const response = await axios.get(`http://52.79.97.196:8080/letter/byFamily/${familyId}`);
                    setFamilyLetters(response.data);
                    console.log(response.data)
                } catch (error) {
                    console.log("가족 불러오기 오류",error)
                }
            };

            // 이번주 공개된 쪽지 불러오기
            const loadWeeklyLetters = async () => {
                try {
                    const response = await axios.get(`http://52.79.97.196:8080/letter/weekly/${familyId}`);
                    setWeeklyLetters(response.data);
                } catch (error) {
                    // 에러 처리
                }
            };
            loadUserLetters();
            loadFamilyLetters();
            loadWeeklyLetters();

        }, []);

    // 쪽지 작성



    const openModal = () => {
        setModalVisible(true);
    };

    // 모달을 끄는 함수
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
      <View style={styles.container}>
          <LetterModal modalVisible={modalVisible} closeModal={closeModal} />
          <View style={styles.letterInfoBox}>
              <LetterIcon style={styles.letterIcon}/>
              <View style={styles.myLetterBox}>
                  <Text style={styles.myLetterText}>우리집 익명 편지함</Text>
                  <Text style={styles.myLetterNumber}>{familyLetters.length}</Text>
              </View>
              <View style={styles.familyLetterBox}>
                  <Text style={styles.familyLetterText}>내가 작성한 편지</Text>
                  <Text style={styles.familyLetterNumber}>{userLetters.length}</Text>
              </View>
          </View>
          <View style={styles.infoTextView}>
              <Text style={styles.infoTextAlert}>
                  이번주엔 <Text style={styles.infoTextNumber}>{weeklyLetters.length}</Text> 개의 편지가 도착했어요
              </Text>
              <TouchableOpacity style={styles.infoTextCreateButton} onPress={()=>openModal()}>
                  <Text style={styles.infoTextCreate}>작성하기 ></Text>
              </TouchableOpacity>
          </View>
          <FlatList
            horizontal={false}
            contentContainerStyle={styles.letterFlatList}
            data={weeklyLetters}
            keyExtractor={item => item.letter_id.toString()}
            renderItem={({ item }) => <LetterItem item={item} />}
          />
          {/*<FlatList*/}
          {/*  horizontal={false}*/}
          {/*  contentContainerStyle={styles.letterFlatList}*/}
          {/*  data={familyLetters}*/}
          {/*  keyExtractor={item => item.letter_id.toString()}*/}
          {/*  renderItem={({ item }) => <LetterItem item={item} />}*/}
          {/*/>*/}
          {/*<FlatList*/}
          {/*  horizontal={false}*/}
          {/*  contentContainerStyle={styles.letterFlatList}*/}
          {/*  data={userLetters}*/}
          {/*  keyExtractor={item => item.letter_id.toString()}*/}
          {/*  renderItem={({ item }) => <LetterItem item={item} />}*/}
          {/*/>*/}
      </View>
    );
};

const styles = StyleSheet.create({
    infoTextCreateButton:{
        zIndex:10,
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
        color:'#000000',
        fontSize: 16,
    },
    myLetterNumber:{
        color:'#000000',
        fontSize: 28,
    },
    familyLetterBox:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    familyLetterText: {
        color:'#000000',
        fontSize: 16,
    },
    familyLetterNumber:{
        color:'#000000',
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
        color: '#ce7c50', //강조색
        fontWeight: 'bold',
    },
    infoTextCreate:{
        fontSize: 16,
        color: '#da875b', //강조색

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
