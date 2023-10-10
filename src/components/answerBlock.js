import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';

const AnswerBlock = ({ name, content, date, comments }) => {

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.gap} />
        <Text>{content}</Text>
        <View style={styles.separator} />
      </Card.Content>
      <Card.Actions>
        <Text>{date}</Text>
        <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={styles.button}
        >
          댓글
        </Button>

        {comments && comments.map((comment,i) => (
          <View key={i}>
            <Text>{comment.name}: {comment.content} ({comment.time})</Text>
          </View>
        ))}
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
  }
});

export default AnswerBlock
