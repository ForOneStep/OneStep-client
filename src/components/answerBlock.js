import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnswerBlock = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>이름이</Text>
            <Text style={styles.content}>내용내용내용내용내용내용내용내용내용내용내용내용</Text>
            <View>
                <Text> 하트 </Text>
                <Text> 댓글 </Text>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:"100%",
        borderRadius:200,
        backgroundColor: '#FFFFFF', // 예시 배경색
    },
    name:{

    },
    content:{

    }
});

export default AnswerBlock;
