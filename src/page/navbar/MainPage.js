import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import AnswerBlock from "../../components/answerBlock";

const MainPage = () => {
    return (
            <View style={styles.pageBackground}>
                <View style={styles.islandBackground}>
                    <View style={styles.dDayText}>
                    </View>
                    <View style={styles.letterText}></View>
                </View>
                <View  style={styles.questionBlock}>

                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF', // 예시 배경색
    },
    islandBackground: {
        width: '100%',
        height: 480,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderWidth: 1,
        borderTopWidth: 0   ,
        borderColor: '#000',
        backgroundColor: '#F6F5F1',
        shadowOffset: { width: 0, height: 10 },
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    pageBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FBE6E1',
    },
    questionBlock : {
        width: 100,
        height: 20,
        borderRadius: 15,
        background: '#FFF',
    },
    dDayText: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    letterText: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default MainPage;
