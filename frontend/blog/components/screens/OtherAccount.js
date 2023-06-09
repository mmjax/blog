import React from 'react';
import {REACT_APP_API_URL} from "@env";


import { StyleSheet, Text, Image, View, TextInput,Button,Pressable, Alert, } from 'react-native';
import defaultLogo from '../logos/def_user_logo.png'
import {useIsFocused} from "@react-navigation/native";
import "./Sign_in.js";
const URL = REACT_APP_API_URL;


function OtherAccount(props) {


    const { navigation } = props;

    const [userState, setUserState] = React.useState([]);
    const [ignoredCard, forceCardUpdate] = React.useReducer(x => x + 1, 0);


    const checkResponse = (res) => {
      if (res.ok) {
        return (res.json());
      }
      return res.json().then((err) => Promise.reject(err));
    };

    const PostFollow = (following) => {
      return fetch(`${URL}/api/follow/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${auth_token}`,
        },
        body: JSON.stringify( { following } )
      }).then((res) => {
        if (res.status === 201) {
          return { status: true };
        }
        return { status: false};
      })
  };

    const DeleteFollow = (following) => {
      return fetch(`${URL}/api/follow/`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${auth_token}`,
        },
        body: JSON.stringify( { following } )
      }).then((res) => {
        if (res.status === 204) {
          return { status: true };
        }
        return { status: false};
      })
  };


    const handleFollow = () => {
      const method = Number(userState.is_following) ? DeleteFollow : PostFollow
      method(userState.username).then(_ => {
          forceCardUpdate();
        })
        .catch(err => {
          const { errors } = err;
          if (errors) {
            Alert.alert(errors);
          }
        })

  };


    const getUser = (user_id) => {
        return fetch(`${URL}/api/users/${user_id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${auth_token}`,
          },
        }).then(checkResponse)
        .then((res) => {setUserState(res)})
      };
    const isFocused = useIsFocused();
    React.useEffect(() => {
        const token = auth_token;
        if (token) {
        getUser(props.route.params);
        }
    }, [isFocused, ignoredCard]);

  return (
    <View style={styles.container}>

        <Image style={styles.photo} source={userState.photo ? {uri: userState.photo} : defaultLogo}/>

        <Text style={styles.login}>{userState.username}</Text>
        <Text style={styles.email}>{userState.email}</Text>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('PersonsPosts', userState.username)}>
          <Text style={styles.btn_text}>Посты пользователя</Text>
        </Pressable>
      <Pressable style={styles.btn} onPress={handleFollow}>
        {Number(userState.is_following) ?
            <Text style={styles.btn_text}>Отписаться</Text>
          :
            <Text style={styles.btn_text}>Подписаться</Text>
        }
       </Pressable>



    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 844,
  },

  photo:{
    marginTop: -290,
    marginBottom: 32,
    width:150,
    height: 150,
    borderRadius:100,
    borderColor: '#4959E8',
    border: 5,
    borderWidth: 2,
  },

  login:{
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 26,
    lineHeight: 31,
    marginBottom:16
  },
  email:{
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 17,
    lineHeight: 21,
    color: '#A3A6AA',
    marginBottom:47,
  },
  btn: {
    marginTop: 27,
    alignItems: 'center',
    justifyContent: 'center',
    width: 214,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#4959E8',
  },
  btn_text:{
    fontSize: 20,
    color: '#fff',
    paddingBottom: 5,
  },

})

export default OtherAccount
