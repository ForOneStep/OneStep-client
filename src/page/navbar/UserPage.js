import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import BirthdayCakeIcon from '../../assets/images/svg/BirthdayCakeIcon.svg';
import FamilyIcon from '../../assets/images/svg/FamilyIcon.svg';
import QuestionIcon from '../../assets/images/svg/QuestionIcon.svg';
import ThermometerIcon from '../../assets/images/svg/ThermometerIcon.svg';
import AnswerIcon from '../../assets/images/svg/AnswerIcon.svg';
import EditPostIcon from '../../assets/images/svg/EditPostIcon.svg';
import SettingIcon from '../../assets/images/svg/SettingIcon.svg';
import { Button } from "react-native-paper";

const UserPage = ({navigation}) => {
    const [user,setUser] = useState([])
    const imgurl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bbami_torty_cat.jpg/525px-Bbami_torty_cat.jpg'
    return (
        <View style={styles.container}>
            <View style={styles.groupInfo}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        <Text style={styles.titleName}>송도 김가네 </Text>가족
                    </Text>
                </View>
                <Text style={styles.hashTag}>#B2CN5</Text>
                <View style={styles.iconContainer}>
                    <View style={styles.iconTextContainer}>
                        <FamilyIcon  width={40} height={40} />
                        <Text>4명</Text>
                    </View>
                    <View style={styles.middleIconTextContainer}>
                        <QuestionIcon  width={40} height={40} />
                        <Text>답변</Text>
                        <Text>32개</Text>
                    </View>
                    <View style={styles.iconTextContainer}>
                        <ThermometerIcon  width={40} height={40} />
                        <Text>LV2</Text>
                    </View>
                </View>
                <Button style={styles.button}>섬 바로 가기</Button>
            </View>

            <View style={styles.userInfo}>
                <Image source={{ uri: imgurl }} style={styles.userImage}  />
                <View>
                    <Text style={styles.name}>김가네 막둥이</Text>
                    <View style={styles.birthdayContainer}>
                        <BirthdayCakeIcon style={styles.birthdayIcon}/>
                        <Text style={styles.birthdayText}>2001.09.27</Text>
                    </View>
                </View>
            </View>

            <View style={styles.etcInfo}>
                <TouchableOpacity onPress={() => navigation.navigate('UserInfoChange')}>
                    <View style={styles.optionItem}>
                        <EditPostIcon style={styles.icon}/>
                        <Text style={styles.text}> 프로필 수정 </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.optionItem}>
                    <AnswerIcon style={styles.icon}/>
                    <Text style={styles.text}> 자주 묻는 질문 </Text>
                </View>
                <View style={styles.optionItem}>
                    <SettingIcon style={styles.icon}/>
                    <Text style={styles.text}> 설정 </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    userImage: {
        width: 64,
        height: 64,
        borderRadius: 50,
        borderWidth:1,
        borderColor:'black',
        marginRight: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom:10,
        marginLeft:10,
        color:'black',
    },

    birthdayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    birthdayIcon: {
        marginRight: 5,
    },
    birthdayText: {
        marginLeft:10,
        fontSize: 16,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom:10,
        borderBottomWidth:1,
    },
    icon: {
        marginRight: 10,

    },
    text: {
        fontSize: 20,
    },
    groupInfo:{
        backgroundColor:'#ffffff',
        height:300,
        width: '100%',
        zIndex:10,

        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

        justifyContent:'center',
        alignItems:'center',

        paddingHorizontal:40,

        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
            height: 2, // 상하 그림자 위치
        },
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3.84,   // 그림자 반경

        elevation: 5, // Android에만 적용되는 그림자 깊이
    },
        titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    titleName: {
            fontSize: 28,
            fontWeight: 'bold',
            color:'black',
        },
    title: {
            fontSize: 16,
            color:'black',
            marginLeft: 5,
            marginBottom:10,
        },
        hashTag: {
            color: 'gray',

            fontSize: 16,
            marginBottom:10,
        },
        iconContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
        },
        middleIconTextContainer:{
            alignItems: 'center',

            borderRightWidth:1,
            borderLeftWidth:1,
            borderRightColor:'#747474',
            borderLeftColor:'#747474',
            flex:1,


        },
        iconTextContainer: {
            alignItems: 'center',
            justifyContent:'space-around',
            flex:1,

        },
        button: {
            marginTop:40,
            backgroundColor: '#f7b599',
            color:'black',
            width:'100%',
        },



    etcInfo: {
        flex: 1,
        width: '100%',
        paddingTop:20,
        paddingHorizontal:40,
        justifyContent:'start',
        alignItems:'start',
    },
    userInfo:{
        backgroundColor:'#fbe6e1',
        height:140,
        width: '100%',
        top:-30,
        paddingTop:30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'start',
        paddingLeft:40,
        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
            height: 2, // 상하 그림자 위치
        },
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3.84,   // 그림자 반경

        elevation: 5, // Android에만 적용되는 그림자 깊이
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f5f1', // 예시 배경색
    },
});

export default UserPage;
