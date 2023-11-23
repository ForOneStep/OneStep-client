import {launchCamera, launchImageLibrary, CameraOptions, ImagePickerResponse, ImageLibraryOptions, Asset} from 'react-native-image-picker';
import axios from "axios";
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Image} from "react-native";
import {useState} from 'react'

const NewPost = () => {
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
                console.log('upload success', response);
                alert('Upload success!');
                setPhoto(null);
                setText('');
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

            <TextInput
                style={styles.input}
                placeholder="사진에 대한 설명을 해주세요!"
                multiline={true}
                onChangeText={(text) => setText(text)}
                value={text}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onSelectImage}>
                    <Text style={styles.buttonText}>사진 선택</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleUploadPhoto}>
                    <Text style={styles.buttonText}>업로드</Text>
                </TouchableOpacity>
            </View>
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
        width: 300,
        height: 300,
        borderRadius: 30,
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
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'space-evenly',
    },
    button: {
        width: 85,
        backgroundColor: '#F7B599',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,

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
