import {launchCamera, launchImageLibrary, CameraOptions, ImagePickerResponse, ImageLibraryOptions, Asset} from 'react-native-image-picker';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import PhotoUploadIcon from '../assets/images/svg/PhotoUploadIcon.svg';
import { useState } from "react";

const NewPost = ({navigation, postRe}) => {
    const [photo, setPhoto] = useState(null);
    const [text, setText] = useState('');
    const userId = 'user1';

    const onSelectImage = () => {
        launchImageLibrary(
          {
              mediaType: 'photo',
              maxWidth: 512,
              maxHeight: 512,
              includeBase64: Platform.OS === 'android',
          },
          (res) => {
              console.log(res);
              if (res.didCancel) return;
              setPhoto(res);
          }
        );
    };
    const handleUploadPhoto = () => {
        const formData = new FormData();
        if(photo === null){
            alert("사진을 입력해주세요")
            return
        }
        formData.append('img', {
            name: photo.assets[0].fileName,
            type: photo.assets[0].type,
            uri: photo.assets[0].uri,
        });

        formData.append('writeTxt', text);

        axios
          .post(`http://52.79.97.196:8080/photobook/write/${userId}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          })
          .then((response) => {
              // console.log('upload success', response);
              // alert('Upload success!');
              setPhoto(null);
              setText('');
              navigation.goBack();
          })
          .catch((error) => {
              console.log('upload error', error);
              alert('Upload failed!');
          });
    };

    return (
      <View style={styles.container}>
          {photo && (
            <Image source={{ uri: photo?.assets[0]?.uri }} style={styles.photo} />
          )}
          {!photo && (
            <TouchableOpacity style={styles.selectPhotoButton} onPress={onSelectImage}>
                <PhotoUploadIcon style={styles.photoUploadIcon}/>
                <Text style={styles.selectPhotoButtonText}>터치해서 사진을 선택해주세요!</Text>
            </TouchableOpacity>
          )}
          <TextInput
            style={styles.input}
            placeholder="사진에 대한 설명을 해주세요!"
            multiline={true}
            onChangeText={(text) => setText(text)}
            value={text}
          />
          <TouchableOpacity style={styles.button} onPress={handleUploadPhoto}>
              <Text style={styles.buttonText}>업로드</Text>
          </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#F5FCFF',
    },
    photo: {
        width: 350,
        height: 350,
        borderRadius: 30,
    },
    selectPhotoButton: {
        flexDirecion: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        height: 350,
        borderRadius: 30,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    photoUploadIcon: {
        width: 50,
        height: 50,
        fill: 'gray',
        marginBottom: 30,
    },
    selectPhotoButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'gray'
    },
    input: {
        width: '90%',
        height: 150,
        borderRadius: 15,
        marginTop: 30,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        width: 85,
        backgroundColor: '#F7B599',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,

        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0, // 좌우 그림자 위치
            height: 2, // 상하 그림자 위치
        },
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3.84, // 그림자 반경

        elevation: 3, // Android에만 적용되는 그림자 깊이
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default NewPost;
