import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from '../../../App'

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
              {/*<View style={styles.dateContainer}>*/}
                  <Text style={styles.date}>{item.write_date}</Text>
              {/*</View>*/}
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
    console.log(data)
    return (
      <View style={styles.container}>
          <Text style={styles.title}>가족엘범</Text>
          <FlatList
              data={ data.sort((a, b) => new Date(b.write_date) - new Date(a.write_date))}
            renderItem={({ item }) => <Post item={item} navigation={navigation} />}
            keyExtractor={item => item.photo_id.toString()}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('NewPost')}>
              <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
      </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingBottom: 100,
        backgroundColor:'#f2f2f2',
//        backgroundColor: 'red',
    },
    post: {

        width: '96%',
        alignSelf:'center',
        height: 115,
        display:'flex',
        flexDirection:'row',
//        alignItems: 'center',
        marginBottom: 20,
        padding: 8,
        borderRadius: 20,
        borderColor: '#ddd',
        backgroundColor:'#fff',
//        backgroundColor: 'blue',
        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
//            height: 2, // 상하 그림자 위치
            height: 2,
        },
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3.84,   // 그림자 반경
//        shadowRadius: 10,
        elevation: 5, // Android에만 적용되는 그림자 깊이
    },
    imgContentContainer: {
        flexDirection: 'row',
        width: '83%',
        justifyContent: 'center',
        alignItems: 'flex-start',
//        backgroundColor: 'coral',
    },
    title: {
        fontSize: 24,
        // fontWeight: 'bold',
        textAlign: 'center',
        marginBottom:40,
        marginTop: 20,
    },
    albumFlatlist: {
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    contentContainer: {
        flexDirection: 'column',
        flex:1,
        alignItems: 'start',
        justifyContent:'flex-start',
        marginBottom: 10,
//        backgroundColor: 'coral',
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

        // fontWeight: 'bold',

        fontSize: 18,
        color:'#262627',
        flex: 1,
    },
    dateContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '17%',
//        backgroundColor: 'cornflowerblue',
    },
    date: {
        position:"absolute",
        right:10,
        bottom:10,
        fontSize: 12,
        color:'#999999',
    },
    image: {
        width: 100,
        height: 100,
        alignSelf:'center',
        marginRight: 10,
        borderRadius: 15,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    text: {
        marginTop: 10,
        fontSize: 14,
        color:'#262627'
        // fontWeight: 600,
    },
    addButton: {
        zIndex:10,
        backgroundColor: '#F7B599',
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        bottom: 120,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
});
export default AlbumPage;
