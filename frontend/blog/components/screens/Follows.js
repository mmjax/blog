import React, {useEffect, useState} from 'react';

import filter from 'lodash.filter'
import {REACT_APP_API_URL} from "@env";
const API_URL = REACT_APP_API_URL

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Alert,
    ScrollView,
  SafeAreaView,
  ActivityIndicator, FlatList, Image, TouchableOpacity, TouchableHighlight,
} from 'react-native';
import defaultLogo from "../logos/def_user_logo.png";
import './Sign_in.js';

import { IconButton } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons"
import {useIsFocused} from "@react-navigation/native";


function Follows(props) {

    const {navigation} = props;

    const [follow, setFollow] = useState([]);


    const checkResponse = (res) => {
      if (res.ok) {
        return (res.json());
      }
      return res.json().then((err) => Promise.reject(err));
    };

    const getFollow = () => {
        return fetch(`${URL}/api/follow/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Token ${auth_token}`,
            }
        }).then(checkResponse)
    };
    const isFocused = useIsFocused();
    useEffect(() => {
        getFollow().then((res) => setFollow(res));
    }, [isFocused]);

    return (
    <View style={styles.container}>

      <ScrollView style={styles.body}>
          <FlatList style={styles.list}
                  data={follow}
                  key={(item) => item}
                  renderItem={({item}) => (
                      <Pressable onPress={() => navigation.navigate('OtherAccount', item.following.id)}>
                        <View style={styles.header}>
                            <Image style={styles.item_img} source={item.following.photo != null ? {uri: item.following.photo} : defaultLogo}/>

                          <View style={styles.header_colum}>
                            <Text style={styles.item_user}> {item.following.username}</Text>
                            <Text style={styles.item_user}> {item.following.email}</Text>
                          </View>
                        </View>
                      </Pressable>
                        )}
            />

      </ScrollView>

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
  body:{
    width: 390,
  },

  post:{
    marginTop: 8,
  },

  comment:{
    marginTop:8,
    width: 390,
  },

  post_img:{
    paddingTop:0,
    width:390,
    height:300,
  },

  item_img:{
    width:45,
    height:45,
    alignItems: "flex-start",
    borderRadius: 25,
    marginLeft:16,
    borderWidth:1,
    borderColor: "#4959E8",
  },

  post_user_img:{
    width:45,
    height:45,
    alignItems: "flex-start",
    borderRadius: 25,
    marginLeft:16,
      borderWidth:1,
      borderColor: "#4959E8",
  },

  header:{
    display: "flex",
    flexDirection: "row",
    marginBottom:8,
  },

  header_col:{
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
    marginLeft:16,
  },

  item_user:{
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 18,
    letterSpacing: 1,
  },

  item_data:{
    color: "#A3A6AA",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight:19,
    letterSpacing: 1,

  },
  text:{
    width: 358,
    marginLeft: 16,
    marginTop:16,
    marginBottom: 16,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    alignSelf:'center',
    letterSpacing: 1,

  },

  post_txt:{
    width: 358,
    marginLeft: 16,
    marginTop:16,
    marginBottom: 16,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    alignSelf:'center',
    letterSpacing: 1,
  },

  line:{
    backgroundColor: "#4959E8",
    width: 390,
    height: 1,
  },

  footer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight:16,
    marginLeft:24,
  },
  footer_like:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  count:{
    marginTop: 16,
  },

  item_group:{
    marginTop: 16,
    letterSpacing: 1,
  }

})

export default Follows