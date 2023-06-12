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


function Post({route}) {
  const [data, setData] = useState([]);
  const [author, setAuthor] = useState([]);
  const [postDate, setPostDate] = useState([]);
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState('');
  const [ignoredCard, forceCardUpdate] = React.useReducer(x => x + 1, 0);
  const [isLoading, setIsLoading] = useState(true);

  const groups = {
    "": "Нет группы",
    "music": "Музыка",
    "film": "Фильмы",
    "game": "Игры",
    "humor": "Юмор"
  }

   const checkResponse = (res) => {
      if (res.ok) {
        return (res.json());
      }
      return res.json().then((err) => Promise.reject(err));
    };

  const getPost = (id) => {
      return fetch(`${API_URL}/api/posts/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${auth_token}`,
        },
      }).then(checkResponse)
    };

  const onChangeInput = (event, name) => {
        setUserData({
          ...userData,
          [name]: event.nativeEvent.text,
        });
      };


  const DeleteLike = (post_id) => {
      return fetch(`${API_URL}/api/posts/${post_id}/like/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${auth_token}`,
        }
      }).then((res) => {
        if (res.status === 204) {
          return { status: true };
        }
        return { status: false};
      })
  };

  const PostLike = (post_id) => {
      return fetch(`${API_URL}/api/posts/${post_id}/like/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${auth_token}`,
        }
      }).then((res) => {
        if (res.status === 201) {
          return { status: true };
        }
        return { status: false};
      })
  };

  const handleLike = () => {
    const method = Number(data.is_liked) ? DeleteLike : PostLike
    method(data.id).then(_ => {
        forceCardUpdate();
      })
      .catch(err => {
        const { errors } = err;
        if (errors) {
          Alert.alert(errors);
        }
      })

  };

  const getComments = (id) => {
      return fetch(`${API_URL}/api/posts/${id}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorisation: `Token ${auth_token}`,
        },
      }).then(checkResponse)

  };

  const postComments = (id, text) => {
    return fetch(`${API_URL}/api/posts/${id}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${auth_token}`,
      },
      body: JSON.stringify( { text } ),
    }).then((res) => {
      if(res.status === 201) {
        return {status: true};
      }
      return {status: false};
    })
  };

  const checkValid = () => {
    if (!userData.text) {
      Alert.alert("Поле с текстом должно быть заполнено");
      return true;
    }
    return false;
  }
  const handleSubmit = () => {
    checkValid &&
    postComments(data.id, userData.text);
  };

  useEffect(() => {
     const interval = setInterval(() => {
       getComments(route.params)
           .then((res) => {
             if (res) {
               setComments(res);
             }
           })
     }, 200)
      return () => clearInterval(interval);
   }, [setComments, comments]);

   useEffect(() => {
        getPost(route.params)
            .then((res) => {
              if (res){
                setAuthor(res.author);
                setPostDate(res.pub_date.replace('-', '.').split('T')[0].replace('-', '.'));
                setData(res);
              }
            });
    }, [ignoredCard]);


  return (
    <View style={styles.container}>

      <ScrollView style={styles.body}>

      <View style={styles.post}>

        <View style={styles.header}>
          <Image style={styles.post_user_img} source={author.photo != null ? {uri:author.photo} : defaultLogo}/>
          <View style={styles.header_col}>
            <Text style={styles.item_user}>{author.username}</Text>
            <Text style={styles.item_data}>{postDate}</Text>
          </View>
        </View>


        {data.image != null ?
            <Image style={styles.post_img} source={{uri: data.image}}/> : null}

        <Text style={styles.post_txt}>{data.text}</Text>


        <View style={styles.footer}>
          <Text style={styles.item_group}>Группа - {groups[data.group]}</Text>
          <View style={styles.footer_like}>
            <Text style={styles.count}>{data.like_count}</Text>
            <IconButton onPress={handleLike} icon=
              {Number(data.is_liked) ?
              <AntDesign name="heart" size={24} color="black" />:
              <AntDesign name="hearto" size={24} color="black" />
            }/>
          </View>


        </View>
        <View style={styles.line}></View>

        </View>
        <TextInput
        onChange={e => onChangeInput(e, "text")}
        placeholder="Текст комментария"
        value={userData.text}
        id = {1}
        />
      <Pressable onPress={handleSubmit}>
          <Text>Отправить</Text>
      </Pressable>
      <FlatList style={styles.list}
              data={comments}
              key={(item) => item}
              renderItem={({item}) => (
                    <View style={styles.header}>
                      <Image style={styles.item_img} source={item.author.photo != null ? {uri: item.author.photo} : defaultLogo}/>
                      <View style={styles.header_colum}>
                        <Text style={styles.item_user}> {item.author.username}</Text>
                        <Text style={styles.item_user}> {
                          item.created.replace('-', '.').split('T')[0].replace('-', '.')
                        }
                        </Text>
                        <Text style={styles.item_user}> {
                          item.created.split('T')[1].split('.')[0]
                        }
                        </Text>
                        <Text>{item.text}</Text>
                        <Text>{item.pub_date}</Text>
                      </View>
                    </View>
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


export default Post