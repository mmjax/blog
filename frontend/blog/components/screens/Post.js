import React, {useEffect, useState} from 'react';

import filter from 'lodash.filter'
const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.38:8000'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Alert,
  SafeAreaView,
  ActivityIndicator, FlatList, Image, TouchableOpacity,
} from 'react-native';
import defaultLogo from "../logos/def_user_logo.png";
import postDeafaultLogo from  "../logos/logo.png"

function Post({route}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
      setIsLoading(true);
      let post_id = route.params
      getPost(post_id);
    }, []);


  const getPost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/posts/${id}`);
      const json = await response.json();
      console.log(json)
      await setData(json);
    }
    catch (error) {
      setError(error);
    }
  };
  

  return (
    <View style={styles.container}>
      

      <View style={styles.post}>

        <View style={styles.header}>
            <Image style={styles.post_user_img} source={data.author.photo != null ? {uri: data.author.photo} : defaultLogo}/>
            <View style={styles.header_col}>
            <Text style={styles.item_user}>{data.author.username}</Text>
            <Text style={styles.item_data}>{data.author.email}</Text>
        </View>
        </View>

        <Text style={styles.text}>{}</Text>
      </View>

      <View style={styles.line}></View>


      <View style={styles.comment}>

        <View style={styles.header}>
            <Image style={styles.post_img} source={data.image != null ? {uri: data.image} : postDeafaultLogo}/>
            <View style={styles.header_col}>
                <Text style={styles.item_user}>{data.text}</Text>
                <Text style={styles.item_data}>{data.group}</Text>
              <Text style={styles.item_data}>{data.like_count}</Text>
              <Text style={styles.item_data}>{data.is_liked}</Text>
            </View>
        </View>
        <Text style={styles.text_com}>{}</Text>
        </View>
      
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
    height:250,
  },

  post_user_img:{
    width:45,
    height:45,
    alignItems: "flex-start",
    borderRadius: 25,
    marginLeft:16,
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
  },

  item_data:{
    color: "#A3A6AA",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight:19,

  },
  text:{
    width: 358,
    marginLeft: 16,
    marginTop:16,
    marginBottom: 16,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    alignSelf:'center'

  },

  text_com:{
    width: 358,
    marginLeft: 16,
    marginTop:8,
    marginBottom: 16,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    alignSelf:'center'
  },

  line:{
    backgroundColor: "#4959E8",
    width: 390,
    height: 1,
  },



})


export default Post