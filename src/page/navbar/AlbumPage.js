import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const Post = ({ item, navigation }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('AlbumDetail', { item })}>
          <View style={styles.post}>
              <Image source={{ uri: item.photo_img }} style={styles.image} />
              <View style={styles.contentContainer}>
<View style={styles.userContainer}>
                  <Image source={{ uri: item.profile_path }} style={styles.profileImage} />
                  <Text style={styles.username}>{item.user_nickname}</Text>
</View>
                  <Text style={styles.text}>{item.photo_txt}</Text>
              </View>
              <View style={styles.dateContainer}>
                  <Text style={styles.date}>{item.write_date}</Text>
              </View>
          </View>
      </TouchableOpacity>
    );
};

const AlbumPage = ({navigation}) => {
    // const { familyId } = useContext(UserContext);
    const familyId = 'A1B5E6'
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://52.79.97.196:8080/photobook/read/${familyId}`);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, [familyId]);
    return (
      <View style={styles.container}>
          <Text style={styles.title}>가족엘범</Text>
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
        padding: 5,
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'row',
        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
            height: 2, // 상하 그림자 위치
        },
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3.84,   // 그림자 반경

        elevation: 5, // Android에만 적용되는 그림자 깊이
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom:20,
        marginTop: 20,
    },
    contentContainer: {
        flexDirection: 'column',
        flex:1,
        alignItems: 'start',
        justifyContent:'flex-start',
        marginBottom: 10,
    },
    userContainer:{

        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
    profileImage: {
        width: 20,
        height: 20,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold',
        flex: 1,
    },
    dateContainer: {
        justifyContent: 'flex-end',

    },
    date: {
        fontSize: 12,
        color: 'gray',
    },
    image: {
        width: 100,
        height: 100,

        borderRadius: 1,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    text: {
        marginTop: 20,
        fontSize: 16,
    },
});
export default AlbumPage;
