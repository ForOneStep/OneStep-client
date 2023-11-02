import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';

const AnswerBlock = ({ name, content, date, comments }) => {
  const [isCommentShow,setIsCommentShow] = useState(false)

  const toggleComments = () => {
    setIsCommentShow(prevState => !prevState);
  };


  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.gap} />
        <Text>{content}</Text>
        <View style={styles.separator} />
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <View style={styles.infoView}>
          <Text>{date}</Text>
          <Button
            mode="contained"
            onPress={toggleComments}
            style={styles.button}
          >
            댓글
          </Button>
        </View>
        <Card style={styles.commentBox}>
          {comments && comments.map((comment,i) => (
            <View key={i} style={styles.comment}>
              {/*comments:[{name:'김ㅇ',content:'댓글 내용',date:'1시간전'}*/}
              <Text>{comment.name}: {comment.content} ({comment.date})</Text>
            </View>
          ))}
        </Card>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  gap:{
    marginVertical: 10,
  },
  card: {
    margin: 10,
    width: '90%',
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  button:{
    marginLeft:'auto'
  },
  comment: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
  },
  commentBox:{

  },
  cardActions:{
    display:"flex",
    flexDirection:"column",
  },
  infoView:{
    display:"flex",
    flexDirection:"row",

  }
});

export default AnswerBlock
