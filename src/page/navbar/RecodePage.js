import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import QuizIcon from "../../assets/images/svg/QuizIcon.svg";
import { UserContext } from '../../../App'
const RecodePage = () => {
    const { userId, familyId,setUserData } = useContext(UserContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{userId}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF', // 예시 배경색n
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue', // 예시 텍스트 색상
    },
});

export default RecodePage;
