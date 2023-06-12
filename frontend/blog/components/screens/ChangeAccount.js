import {REACT_APP_API_URL} from "@env";
const API_URL = REACT_APP_API_URL;
import defaultLogo from '../logos/def_user_logo.png'

import { Stack, IconButton, TextInput } from "@react-native-material/core";
import "./Sign_in";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Alert,
  SafeAreaView,
  ActivityIndicator, FlatList, Image, TouchableOpacity, ScrollView,
} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import React, {useEffect, useState} from 'react';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function ChangeAccount(props){
    const { navigation } = props;
    const [pickedImagePath, setPickedImagePath] = useState('');
    const [userData, setUserData] = useState('');
    const [image, setImage] = useState({});
    const [isImage, setIsImage] = useState(false);
    const [data, setData] = useState([]);

    const onChangeInput = (e, name) => {
        setUserData({
          ...userData,
          [name]: e.nativeEvent.text,
        });
    };

    const checkResponse = (res) => {
      if (res.ok) {
        return (res.json());
      }
      return res.json().then((err) => Promise.reject(err));
    };
    const getUser = () => {
        return fetch(`${API_URL}/api/users/me/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${auth_token}`,
          },
        }).then(checkResponse)
      };

    const patchAccount = (data) => {
        return fetch(`${API_URL}/api/users/me/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Token ${auth_token}`,
             },
             body: data,
        }).then(checkResponse)
    }

    const checkValid = () => {
        if (userData.email == data.email && !isImage){
            Alert.alert("А смысл вашего действия???????")
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        let formData = new FormData();
        if (checkValid()){
            formData.append('email', userData.email);
            if (isImage){
                formData.append('photo', {
                uri: image.assets[0].uri.replace('file://', ''),
                type: image.assets[0].type,
                name: image.assets[0].fileName
              })
            }
                patchAccount(formData)
                .then((res) => {
                    if(res) {
                        navigation.navigate('Account')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
      };

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

    useEffect(() => {
        getUser().then((res) => {
            setUserData({"email": res.email});
            setData(res);
            console.log(res.photo)
        })
    }, []);


    return(
        <View>
            {
              pickedImagePath !== ''? <Image
                source={{ uri: pickedImagePath }}
                style={styles.img}
              /> : (
                  <Image style={styles.img} source={
                      data.photo ? {uri: data.photo} : defaultLogo
                  }/>
              )
            }

            <IconButton onPress={showImagePicker} icon={props => <Icon name="plus" {...props} color="#f9b924"/>} />
            <TextInput
                onChange={e => onChangeInput(e, "email")}
                placeholder={'Почта'}
                value={userData.email}
                keyboardType={"email-address"}
            />
            <Pressable style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btn_text}>Изменить </Text>
            </Pressable>

        </View>
    )

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


export default ChangeAccount