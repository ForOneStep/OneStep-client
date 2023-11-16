import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const AlbumDetailPage = ({ route, navigation }) => {
  const { item } = route.params;
  console.log(item);
  if (!item) {
    return <View style={styles.container}></View>;
  }

  const [comment, setComment] = useState('');

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleCommentSubmit = () => {
    // 댓글 전송하는 로직
    const commentData = {
      photoBook_id: 9,
      root_comment_id: null,
      writer_id: 'user2',
      comment_txt: comment,
    };

    axios
      .post('http://52.79.97.196:8080/photoBookcomment/writeComment', commentData)
      .then((response) => {
        console.log('댓글 전송 성공:', response.data);
        // 댓글 전송 성공 시 추가적인 작업을 수행할 수 있습니다.
      })
      .catch((error) => {
        console.error('댓글 전송 실패:', error);
        // 댓글 전송 실패 시 에러 처리를 할 수 있습니다.
      });

    setComment('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: item.photo_img }} style={styles.image} />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Image source={{ uri: item.profile_path }} style={styles.profileImage} />
            <View style={styles.userInfoContainer}>
              <Text style={styles.username}>{item.user_nickname}</Text>
              <Text style={styles.date}>{item.write_date}</Text>
            </View>
          </View>
          <Text style={styles.text}>{item.photo_txt}</Text>
        </View>
        {item.viewPhotoBookCommentDTO.map((comment, index) => (
          <View style={styles.commentContainer} key={index}>
            <Image source={{ uri: comment.profile_path }} style={styles.commentProfileImage} />
            <View style={styles.commentContentContainer}>
              <Text style={styles.commentUsername}>{comment.user_nickname}</Text>
              <Text style={styles.commentText}>{comment.comment_txt}</Text>
              <Text style={styles.commentDate}>{comment.write_date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="댓글을 입력하세요..."
          value={comment}
          onChangeText={handleCommentChange}
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleCommentSubmit}>
          <Text style={styles.commentButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  contentContainer: {
    paddingBottom: 80,
    marginBottom: 10,
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
  userInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  text: {
    fontSize: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentContentContainer: {
    flex: 1,
  },
  commentUsername: {
    fontWeight: 'bold',
  },
  commentText: {
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: 'gray',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
  },
  commentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AlbumDetailPage;
