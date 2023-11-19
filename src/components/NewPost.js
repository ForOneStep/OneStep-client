import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import {launchCamera, launchImageLibrary, CameraOptions, ImagePickerResponse, ImageLibraryOptions, Asset} from 'react-native-image-picker';
import axios from "axios";

const NewPost = () => {

    const [photo, setPhoto] = useState(null);
    const [text, setText] = useState('');
    const userId = 'user1';

    const onSelectImage = () => {
        launchImageLibrary(
            {
                mediaType: "photo",
                maxWidth: 512,
                maxHeight: 512,
                includeBase64: Platform.OS === 'android',
            },
            (res) => {
                console.log(res);
                if (res.didCancel) return;
                setPhoto(res);
            },
        )
    }
    const handleUploadPhoto = () => {
        const formData = new FormData();

        formData.append("img", {
            name: photo.assets[0].fileName,
            type: photo.assets[0].type,
            uri: photo.assets[0].uri,
        });

        formData.append('writeTxt', text);

        axios.post(`http://52.79.97.196:8080/photobook/write/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log("upload success", response);
                alert("Upload success!");
                setPhoto(null);
                setText('');
            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
    };
    return (
        <View style={styles.container}>
            {photo && (
                <Image
                    source={{uri: photo?.assets[0]?.uri}}
                    style={{ width: 300, height: 300 }}
                />
            )}
            <TouchableOpacity style={styles.button} onPress={onSelectImage}>
                <Text style={styles.buttonText}>Choose Photo</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Write a caption..."
                onChangeText={text => setText(text)}
                value={text}
            />
            <TouchableOpacity style={styles.button} onPress={handleUploadPhoto}>
                <Text style={styles.buttonText}>Upload Photo</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        backgroundColor: '#ff6200',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    input: {
        height: 50,
        width: 300,
        borderColor: '#ddd',
        borderWidth: 1,
        marginTop: 10,
        padding: 10,
    },
});

export default NewPost;
