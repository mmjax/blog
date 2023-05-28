import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useHistory } from "react-dom";

import { StyleSheet, Text, View, TextInput,Button,Pressable, Alert, } from 'react-native';



function Sign_in(props) {

    const { navigation } = props
    const [userData, setUserData] = React.useState({});
    const [errorPassword, setErrorPassword] = React.useState("");
    const [errorLogin, setErrorLogin] = React.useState("");

    const onChangeInput = (e) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
      };


      const checkValid = () => {
        if (!userData.email) {
          setErrorLogin("Поле с почтой является обязательным");
          return false;
        }
        if (!userData.password) {
          setErrorPassword("Поле с паролем является обязательным");
          return false;
        }
        return true;
      };

    const handleSubmit = () => {
        errorLogin && setErrorLogin("");
        errorPassword && setErrorPassword("");

        checkValid() &&
        registerUser(userData.email, userData.password)
        .then((res) => {
          if (res && res.email) {
            history.push("/signin", {from: "/signup"});
          }
        })
        .catch((err) => {
          if (typeof err.email === "object") {
            setErrorLogin("Пользователь с такой почтой уже зарегистрирован");
          } else if (typeof err.password === "object") {
            setErrorPassword(
              "Пароль должен содержать минимум 8 символов и не состоять полностью из цифр"
            );
          }
        });

      };

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Авторизация</Text>

        <TextInput
        style={styles.Login}
        onChange={onChangeInput}
        placeholder="Логин"
        name = "login"
        type="text"
        id = {1}
        />

        <TextInput
        style={styles.Mail}
        onChange={onChangeInput}
        placeholder="Пароль"
        name = "password"
        id = {3}
        error={errorPassword}
        />


        <Pressable style={styles.btn} onPress={() => handleSubmit}>
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
              onPress={() => navigation.navigate('Home')}
            />
            </View>

        </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  text: {
    fontSize: 32,
    color: '#4959E8',
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
    justifyContent: 'space-around',
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