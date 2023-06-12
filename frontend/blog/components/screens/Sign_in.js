import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useHistory } from "react-dom";
import {REACT_APP_API_URL} from "@env";
const API_URL = REACT_APP_API_URL

import { StyleSheet, Text, View, TextInput,Button,Pressable, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';



function Sign_in(props) {

    const { navigation } = props
    const [userData, setUserData] = React.useState({});

    const checkResponse = (res) => {
      if (res.ok) {
        return (res.json());
      }
      return res.json().then((err) => Promise.reject(err));
    };

    const loginUser = (username, password) => {
      return fetch(`${API_URL}/api/auth/token/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }).then(checkResponse)
        .then((data) => {
          if (data) {
            global.auth_token = data.auth_token;
            return data;
          }
          return null;
        });
    };
    
    const onChangeInput = (event, name) => {
        setUserData({
          ...userData,
          [name]: event.nativeEvent.text,
        });
      };


      const checkValid = () => {
        if (!userData.username) {
          Alert.alert("Поле с почтой является обязательным");
          return false;
        }
        if (!userData.password) {
          Alert.alert("Поле с паролем является обязательным");
          return false;
        }
        return true;
      };

    const handleSubmit = () => {
        checkValid() &&
        loginUser(userData.username, userData.password)
        .then((res) => {
          if (res) {
            navigation.navigate('Home')
          }
        })
        .catch((err) => {
            Alert.alert("Неверное имя пользователя или пароль");
          }
        );
      };

  return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                  <View>
                    <Text style={styles.text}>Авторизация</Text>
                        <TextInput
                            style={styles.Login}
                            onChange={event => onChangeInput(event, "username")}
                            placeholder="Логин"
                            id = {1}
                        />

                        <TextInput
                            style={styles.Mail}
                            secureTextEntry={true}
                            onChange={event => onChangeInput(event, "password")}
                            placeholder="Пароль"
                            id = {3}
                        />
                  </View>
                  <View style={styles.btnContainer}>
                    <Pressable style={styles.btn} onPress={handleSubmit}>
                      <Text style={styles.btn_text}>Войти</Text>
                    </Pressable>

                    <View style={styles.lines}>
                        <View style={styles.left_lines}></View>
                        <Text>или</Text>
                        <View style={styles.right_lines}></View>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.footer_text}>Нет аккаунта?</Text>
                        <View style={styles.footer_btn}>
                          <Button
                              title="Зарегистрироваться"
                              color="#4959E8"
                              onPress={() => navigation.navigate('Sign_up')}
                          />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 844,

  },
  text: {
      marginTop: -100,
    fontSize: 32,
    color: '#4959E8',
      alignSelf:'center'
  },
  Login: {
    marginTop: 50,
    height: 52,
    width: 318,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  Mail: {
    marginTop: 27,
    height: 52,
    width: 318,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  btn: {
    marginTop: 27,
    alignItems: 'center',
    justifyContent: 'center',
    width: 318,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#4959E8',
  },
  btn_text:{
    fontSize: 20,
    color: '#fff',
    paddingBottom: 5,
  },
  lines:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 17,
  },
  left_lines: {
    width: 139.01,
    height: 1,
    backgroundColor: '#A3A6AA',
    marginTop:10,
    marginRight: 7
  },
  right_lines: {
    width: 139.01,
    height: 1,
    backgroundColor: '#A3A6AA',
    marginTop:10,
    marginLeft: 7,
  },
  footer:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 17,
  },
  footer_text:{
    fontSize: 14,
    color: '#A3A6AA'
  },
  footer_btn:{
    marginTop: -11,

  }

})

export default Sign_in