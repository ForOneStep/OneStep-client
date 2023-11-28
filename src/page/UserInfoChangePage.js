import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { UserContext } from '../../App'
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInfoChangePage = ({navigation}) => {
    const { userId, familyId, setUserData } = useContext(UserContext);
    const [inputUserId, setInputUserId] = useState(userId);
    const [inputFamilyId, setInputFamilyId] = useState(familyId);

  const handleChange = async () => {
    try {
      await AsyncStorage.setItem('userId', inputUserId);
      await AsyncStorage.setItem('familyId', inputFamilyId);

      // AsyncStorage.setItem 작업이 완료된 후 navigation.goBack() 실행

    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  }

    return (
        <View style={styles.container}>
            <TextInput
                value={inputUserId}
                onChangeText={setInputUserId}
                placeholder="userId를 입력하세요"
                style={[styles.input, {color: '#262627'}]}
                placeholderTextColor="#999"
            />
            <TextInput
                value={inputFamilyId}
                onChangeText={setInputFamilyId}
                placeholder="familyId를 입력하세요"
                style={[styles.input, {color: '#262627'}]}
                placeholderTextColor="#999"

            />
            <Button title="변경하기" onPress={handleChange} />
            <Text style={styles.text}>현제 userId : {userId}</Text>
            <Text style={styles.text}>현제 familyId : {familyId}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
    },
});
export default UserInfoChangePage;
