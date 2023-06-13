import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {REACT_APP_API_URL} from "@env";
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, Pressable, Alert, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Stack, IconButton,  } from "@react-native-material/core";
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
                formData.append('image', {
                uri: image.assets[0].uri.replace('file://', ''),
                type: image.assets[0].type,
                name: image.assets[0].fileName
              })
            }

                pushPost(formData)
                .then((res) => {
                    if(res) {
                        navigation.navigate('Post', res.id)
                    }
                })
                .catch((err) => {
                })
        }
      }
return (
    <View style={styles.container
}>


        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
            <View style={styles.select}>
                <SelectList  data={group_choice} setSelected={setSelected}></SelectList>
            </View>
            <TextInput
                style={styles.text}
                editable
                multiline
                onChange={e => onChangeInput(e, "text")}
                placeholder="Текст поста"
                type="text"
                id = {1}
            />



        </ScrollView>

    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.footer}>

            <View style={styles.imagerow}>
                    <IconButton style={styles.icon_btn} onPress={showImagePicker} icon={props => <Icon name="plus" {...props} color="#fff"/>} />

                    {
                      pickedImagePath !== '' && <Image
                        source={{ uri: pickedImagePath }}
                        style={styles.img}
                      />
                    }
            </View>
          <IconButton style={styles.icon_btn} onPress={handleSubmit} icon={props => <Icon style={styles.icon} name="send" {...props} color="#fff"/>} />

        </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>


    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 844,
  },
    select:{
      width: 358,
        marginRight: 16,
        marginLeft: 16,
        marginTop: 16
    },
    icon:{
      marginLeft: 4
    },
    footer:{
      position: 'absolute',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 390,
        backgroundColor: '#fff',
        paddingTop: 8,
        height: 160,
        marginTop: -160,
    },
  btn: {
    marginTop: 27,
    alignItems: 'center',
    justifyContent: 'center',
    width: 318,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#4959E8',
    marginLeft:12
  },
    icon_btn:{
    width: 40,
    height: 40,
    backgroundColor: "#4959E8",
        marginRight: 16,
        marginLeft: 16
    },
  text:{
    fontSize: 18,
    marginTop: 16,
      marginBottom: 16,
    width: 358,
    marginRight: 16,
    marginLeft: 16,
  },
  imagerow: {
    display: 'flex',
    flexDirection: 'row',

  },
  img: {
    width: 60,
    height: 60,
      borderRadius: 7,
    resizeMode: 'cover',
      marginTop: -5,
  }
});

export default CreatePost;




