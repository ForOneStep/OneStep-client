import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const Comment = ({ comment }) => {
    return (
      <View style={styles.commentContainer}>
          <Text style={styles.commentUser}>{comment.user_nickname}</Text>
          <Text style={styles.commentText}>{comment.comment_txt}</Text>
          <Text style={styles.commentDate}>{comment.write_date}</Text>
      </View>
    );
};

const Post = ({ item, navigation }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('AlbumDetailPage', { item })}>
          <View style={styles.post}>
              <View style={styles.headerContainer}>
                  <Image source={{ uri: item.profile_path }} style={styles.profileImage} />
                  <Text style={styles.username}>{item.user_nickname}</Text>
                  <View style={styles.dateContainer}>
                      <Text style={styles.date}>{item.write_date}</Text>
                  </View>
              </View>
              <Image source={{ uri: item.photo_img }} style={styles.image} />
              <Text style={styles.text}>{item.photo_txt}</Text>
              {/*<FlatList*/}
              {/*  data={item.viewPhotoBookCommentDTO}*/}
              {/*  renderItem={({ item }) => <Comment comment={item} />}*/}
              {/*  keyExtractor={(item, index) => index.toString()}*/}
              {/*/>*/}
          </View>
      </TouchableOpacity>
    );
};

const AlbumPage = ({navigation}) => {
    const [data, setData] = useState([
        {
            "photo_id": 9,
            "user_nickname": "닉네임1",
            "profile_path": "",
            "photo_img": "https://conteswt-bucket.s3.ap-northeast-2.amazonaws.com/photoBook/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-10-22%20225453.png",
            "photo_txt": "안녕~!",
            "write_date": "2023-11-07",
            "viewPhotoBookCommentDTO": [
                {
                    "user_nickname": "닉네임2",
                    "profile_path": "",
                    "root_comment_id": null,
                    "comment_txt": "대댓글작성테스트대댓글작성테스트",
                    "write_date": "2023-11-07"
                },
                {
                    "user_nickname": "닉네임2",
                    "profile_path": "",
                    "root_comment_id": 10,
                    "comment_txt": "대댓글작성테스트대댓글작성테스트",
                    "write_date": "2023-11-07"
                },
                {
                    "user_nickname": "닉네임3",
                    "profile_path": "",
                    "root_comment_id": null,
                    "comment_txt": "테스트 12312",
                    "write_date": "2023-11-07"
                },
                {
                    "user_nickname": "닉네임4",
                    "profile_path": "",
                    "root_comment_id": null,
                    "comment_txt": "테스트13 123212",
                    "write_date": "2023-11-07"
                },
                {
                    "user_nickname": "닉네임4",
                    "profile_path": "",
                    "root_comment_id": 12,
                    "comment_txt": "대댓글 1111",
                    "write_date": "2023-11-07"
                }
            ]
        }
    ]);

    return (
      <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => <Post item={item} navigation={navigation} />}
            keyExtractor={item => item.photo_id.toString()}
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
