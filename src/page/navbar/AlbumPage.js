import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const Post = ({ item }) => {
    return (
      <View style={styles.post}>
          <View style={styles.headerContainer}>
              <Image source={{ uri: item.imgUrl }} style={styles.profileImage} />
              <Text style={styles.username}>{item.username}</Text>
              <View style={styles.dateContainer}>
                  <Text style={styles.date}>{item.date}</Text>
              </View>
          </View>
          <Image source={{ uri: item.imgUrl }} style={styles.image} />
          <Text style={styles.text}>{item.text}</Text>
      </View>
    );
};

const AlbumPage = () => {
    const [data, setData] = useState([
        { id: 1, username:'엄마', imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/ChinchillaPersian.jpg', text: '오늘짜 귀여운 우리집 고양이 근황 ^^', date: '2023.11.06' },
        { id: 2, username:'유저 2',imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bbami_torty_cat.jpg/700px-Bbami_torty_cat.jpg', text: '텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1', date: '날짜2' },
        { id: 3, username:'유저 1',imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/ChinchillaPersian.jpg', text: '텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1', date: '날짜1' },
        { id: 4, username:'유저 1',imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bbami_torty_cat.jpg/700px-Bbami_torty_cat.jpg', text: '텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1텍스트1', date: '날짜2' },
        // 추가 데이터...
    ]);

    return (
      <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => <Post item={item} />}
            keyExtractor={item => item.id.toString()}
          />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor:'#f2f2f2',
    },
    post: {
        marginBottom: 20,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor:'#fff',

        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
            height: 2, // 상하 그림자 위치
        },
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3.84,   // 그림자 반경

        elevation: 5, // Android에만 적용되는 그림자 깊이
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold',
        flex: 1,
    },
    dateContainer: {
        alignItems: 'flex-end',
    },
    date: {
        fontSize: 12,
        color: 'gray',
    },
    image: {
        width: '100%',
        height: 300,

        borderColor: '#ddd',
        borderWidth: 1,
    },
    text: {
        marginTop: 20,
        fontSize: 16,
    },
});
export default AlbumPage;
