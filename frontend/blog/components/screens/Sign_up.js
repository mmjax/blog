import React from 'react';
import { useHistory } from "react-dom";

import { StyleSheet, Text, View, TextInput,Button,Pressable, Alert, } from 'react-native';



function Sign_up(props) {

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
      errorLogin && setErrorLogin("");
    errorPassword && setErrorPassword("");

        checkValid() &&
      registerUser(userData.email, userData.password)
        .then((res) => {
          if (res && res.email) {
            history.push("Sign_in", {from: "Sign_up"});
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
        <Text style={styles.text}>Регистрация</Text>


        <TextInput
        style={styles.Mail}
        onChange={onChangeInput}
        placeholder="Почта"
        name = "email"
        id = {1}
        error={errorLogin}
        />
        <TextInput
        style={styles.Mail}
        onChange={onChangeInput}
        placeholder="Пароль"
        name = "password"
        id = {2}
        error={errorPassword}
        />


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
      marginTop:-100,
      marginBottom: 141,
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
    color: '#A3A6AA',
  },
  footer_btn:{
    marginTop: -11,

  }

})


export default Sign_up