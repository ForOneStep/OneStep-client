import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlbumPage = () => {
    const [potoItem,setPotoItem] = useState([{

    }])
    return (
        <View style={styles.container}>
            <Text style={styles.text}>AlbumPage</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF', // 예시 배경색
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue', // 예시 텍스트 색상
    },
});

export default AlbumPage;
