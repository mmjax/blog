import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {REACT_APP_API_URL} from "@env";
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Pressable, Alert, Platform } from 'react-native';
import { Stack, IconButton, TextInput } from "@react-native-material/core";
import "./Sign_in";
import * as ImagePicker from "expo-image-picker";
import {SelectList} from "react-native-dropdown-select-list";
const API_URL = REACT_APP_API_URL




function CreatePost(props) {
    const [pickedImagePath, setPickedImagePath] = useState('');
    const { navigation } = props
    const [userData, setUserData] = React.useState({});
    const [image, setImage] = useState({});
    const [isImage, setIsImage] = useState(false);
    const [selected, setSelected] = useState('');

    const group_choice = [
        {key: "music", value: "Музыка"},
        {key: "game", value: "Игры"},
        {key: "film", value: "Фильмы"},
        {key: "humor", value: "Юмор"}
    ];
    const checkResponse = (res) => {
        if(res.ok) {
          return (res.json());
        }
        return res.json().then((err) => Promise.reject(err));
    };
    const pushPost = (data) => {
        return fetch(`${API_URL}/api/posts/`, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Token ${auth_token}`,
             },
             body: data,
        }).then(checkResponse)
    };
    const onChangeInput = (e, name) => {
        setUserData({
          ...userData,
          [name]: e.nativeEvent.text,
        });
    };
    const checkValid = () => {
    if (!selected) {
        Alert.alert("У поста обязательно должна быть группа");
        return false;
    }
    if (!userData.text) {
        Alert.alert("Поле с текстом поста является обязательным");
        return false;
    }
    return true;
  }
  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setImage(result)
      setIsImage(true);
    }
  }

  const handleSubmit = () => {
        let formData = new FormData();
        if (checkValid()){
            formData.append('text', userData.text);
            formData.append('group', selected);
            if (isImage){
                console.log(image);
                formData.append('image', {
                uri: image.assets[0].uri.replace('file://', ''),
                type: image.assets[0].type,
                name: image.assets[0].fileName
              })
            }
            console.log(formData)

                pushPost(formData)
                .then((res) => {
                    if(res) {
                        navigation.navigate('Post', res.id)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

        }

      }
return (
    <View style={styles.screen}>

    <View style={styles.imagerow}>
        <IconButton style={styles.btn} onPress={showImagePicker} icon={props => <Icon name="plus" {...props} color="#f9b924"/>} />

        {
          pickedImagePath !== '' && <Image
            source={{ uri: pickedImagePath }}
            style={styles.img}
          />
        }
      </View>
        <SelectList data={group_choice} setSelected={setSelected}></SelectList>

        <TextInput
            style={styles.text}
            // editable
            // multiline
            // numberOfLines={1000}
            // maxLength={10000}
            onChange={e => onChangeInput(e, "text")}
            placeholder="?"
            type="text"
            id = {1}
        />

            <Pressable style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btn_text}>Опубликовать </Text>
            </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    backgroundColor: '#fff', },
  btn: {
    marginTop: 27,
    alignItems: 'center',
    justifyContent: 'center',
    width: 318,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#f9b924',
    marginLeft:12
  },
  text:{
    marginTop: 16,
    alignSelf: 'center',
    width: 358,
  },
  imagerow: {
    marginTop: 60,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 16
  },
  img: {
    width: 90,
    height: 90,
    resizeMode: 'cover'
  }
});

export default CreatePost;




