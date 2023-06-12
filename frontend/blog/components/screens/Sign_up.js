import React from 'react';
import { useHistory } from "react-dom";
import {REACT_APP_API_URL} from "@env";
const API_URL = REACT_APP_API_URL

import { StyleSheet, Text, View, TextInput,Button,Pressable, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,} from 'react-native';



function Sign_up(props) {

    const { navigation } = props
    const [userData, setUserData] = React.useState({});

    const checkResponse = (res) => {
      if (res.ok) {
        return (res);
      }
      return res.json().then((err) => Promise.reject(err));
    };

    const registerUser = (username, password, re_password) => {
      return fetch(`${API_URL}/api/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, re_password }),
      }).then(checkResponse);
    };



    const onChangeInput = (event, name) => {

        setUserData({
          ...userData,
          [name]: event.nativeEvent.text,
        });
      };


      const checkValid = () => {
        if (!userData.username) {
          Alert.alert("Поле с логином является обязательным");
          return false;
        }
        if (!userData.password) {
          Alert.alert("Поле с паролем является обязательным");
          return false;
        }
        if (!userData.re_password) {
          Alert.alert("Поле с повторным вводом пароля является обязательным");
          return false;
        }
        return true;
      };

    const handleSubmit = () => {
      checkValid() &&
      registerUser(userData.username, userData.password, userData.re_password)
        .then((res) => {
          if (res.status === 201) {
            navigation.navigate('Sign_in')
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.non_field_errors){
            Alert.alert("Пароли не совпадают");
          }
          else if (err.password){
            Alert.alert("Пароль слишком простой");
          }
          else if (err.username){
            if (err.username[0] === "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.")
              Alert.alert("Введите коректный логин. Он может содержать только буквы, цифры, и @/./+/-/_");
            else {
              Alert.alert("Пользователь с таким логином уже существует");
            }
          }
        });

      };

  return (

      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>Регистрация</Text>
                    <TextInput
                    style={styles.Mail}
                    onChange={event => onChangeInput(event, 'username')}
                    placeholder="Логин"
                    id = {1}
                    />
                    <TextInput
                    style={styles.Mail}
                    secureTextEntry={true}
                    onChange={event => onChangeInput(event, 'password')}
                    placeholder="Пароль"
                    id = {2}
                    />
                    <TextInput
                    style={styles.Mail}
                    secureTextEntry={true}
                    onChange={event => onChangeInput(event, 're_password')}
                    placeholder="Повтор пароля"
                    id = {3}
                    />
                </View>

                <View style={styles.btnContainer}>
                    <Pressable style={styles.btn} onPress={handleSubmit}>
                      <Text style={styles.btn_text}>Зарегистрироваться</Text>
                    </Pressable>

                    <View style={styles.lines}>
                        <View style={styles.left_lines}></View>
                        <Text>или</Text>
                        <View style={styles.right_lines}></View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footer_text}>Уже есть аккаунт?</Text>
                        <View style={styles.footer_btn}>
                          <Button
                          title="Войти"
                          color="#4959E8"
                          size="sm"
                          onPress={() => navigation.navigate('Sign_in')}
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
      height:844,

  },
  text: {
    fontSize: 32,
      alignSelf: 'center',
      marginTop:0,
      marginBottom: 20, color: '#4959E8',
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
    color: '#A3A6AA',
  },
  footer_btn:{
    marginTop: -11,

  }

})


export default Sign_up