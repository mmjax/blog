import React, {useEffect, useState} from 'react';

import filter from 'lodash.filter'
import {REACT_APP_API_URL} from "@env";
const API_URL = REACT_APP_API_URL;
import defaultLogo from '../logos/def_user_logo.png'


import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Alert,
  SafeAreaView,
  ActivityIndicator, FlatList, Image, TouchableOpacity, ScrollView,
} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import {IconButton} from "@react-native-material/core";

function Home(props) {


    const { navigation } = props

    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setsearchQuery] = useState("");
    const [group, setGroup] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    const handleSearch = (query) => {
      setsearchQuery(query);
      const filteredData = filter(fullData, (user) => {
        return contains(user, query);
      });
      setData(filteredData);
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

    const contains = ({author, text}, query) => {
      const {username, email} = author;
      if (username.includes(query) || email.includes(query) || text.includes(query)) {
        return true;
      }
      return false;
    }

    const HandleGroup = (group) => {
      setGroup(group)
  }

    useEffect(() => {
      setIsLoading(true);
      fetchData(group === 0 ? `${API_URL}/api/posts/` : `${API_URL}/api/posts/?group=${group}`);
    }, [group]);

    const fetchData = async(url) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);

        setFullData(json);
      }
      catch (error) {
        setError(error);
        }
    };

  return (
    <View style={styles.container}>

      <SafeAreaView style={styles.SafeAreaView}>
        <TextInput placeholder='search' clearButtonMode='always'
                   style={styles.search}
                   autoCapitalize="none"
                   autoCorrect={false}
                   value={searchQuery} onChangeText={(query) => handleSearch(query)}/>
      </SafeAreaView>

      <ScrollView style={styles.body}>

        <Button
              title="в профиль"
              color="#f9b924"
              size="sm"
              onPress={() => navigation.navigate('Account')}
            />


      <View style={styles.line_btn}>
        {group != 'music' ?
            <Pressable style={styles.o_btn} onPress={() => HandleGroup('music')}>
              <Text style={styles.txt_o_btn}>музыка</Text>
            </Pressable> :
            <Pressable style={styles.o_btn} onPress={() => HandleGroup(0)}>
              <Text style={styles.txt_o_btn}>все</Text>
            </Pressable>
        }
        {group != 'film' ?
            <Pressable style={styles.o_btn} onPress={() => HandleGroup('film')}>
          <Text style={styles.txt_o_btn}>фильмы</Text>
        </Pressable> :
            <Pressable style={styles.o_btn} onPress={() => HandleGroup(0)}>
              <Text style={styles.txt_o_btn}>все</Text>
            </Pressable>
        }
        {group != 'humor' ?
            <Pressable style={styles.o_btn} onPress={() => HandleGroup('humor')}>
              <Text style={styles.txt_o_btn}>юмор</Text>
            </Pressable> :
            <Pressable style={styles.o_btn} onPress={() => HandleGroup(0)}>
              <Text style={styles.txt_o_btn}>все</Text>
            </Pressable>
        }
        {group != 'game' ?
            <Pressable style={styles.o_btn} onPress={() => HandleGroup('game')}>
              <Text style={styles.txt_o_btn}>игры</Text>
            </Pressable> :
            <Pressable style={styles.o_btn} onPress={() => HandleGroup(0)}>
              <Text style={styles.txt_o_btn}>все</Text>
            </Pressable>
        }


      </View>

      <FlatList style={styles.list}
            data={data}
            кey={(item) => item}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.items} onPress={() => navigation.navigate('Post', item.id)}>
                  <View style={styles.header}>
                    <Image style={styles.item_img} source={item.author.photo != null ? {uri: item.author.photo} : defaultLogo}/>
                    <View style={styles.header_colum}>
                      <Text style={styles.item_user}> {item.author.username}</Text>
                      <Text style={styles.item_data}> {item.pub_date}</Text>
                    </View>
                  </View>
                  <Image style={styles.img} source={{uri: item.image}}/>
                  <Text style={styles.item_text}> {item.text.length > 30 ? item.text.substring(0, 30) : item.text}</Text>

{/*                  <IconButton onPress={handleLike} icon=
                      {Number(data.is_liked) ?
                      <AntDesign name="heart" size={24} color="black" />:
                      <AntDesign name="hearto" size={24} color="black" />
                    }/>
                  <Text style={styles.item_data}>{data.like_count}</Text>*/}
                </TouchableOpacity>)}
      />

        </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  body:{
    width:390,
  },
  SafeAreaView:{
    backgroundColor: "#fff",
    width: 390,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: 65
  },

  line_btn:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width:390,
    height: 86,
    marginLeft: 0,
    marginTop: 8,
    backgroundColor: "#fff"
  },

  o_btn:{
    marginTop: 8,
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: '#D9D9D9',
    backgroundColor: '#D9D9D9',
  },

  txt_o_btn:{
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 1,
    alignSelf:'center',
    marginTop: 25,


  },

  search:{
    width:358,
    height:32,
    borderWidth:2,
    borderColor: '#ccc',
    borderRadius:7,
    marginTop:16,
    alignItems:"center",

  },
  list:{
    width:390,
    marginTop:0,
  },

  items:{
    paddingTop:8,
    marginTop:16,
    backgroundColor: "#fff"
  },

  header:{
    display: "flex",
    flexDirection: "row",
    marginBottom:16,
  },

  header_colum:{
    display: "flex",
    flexDirection: "column",
    marginLeft:16,
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
  img:{
    height: 300,
    width: 390,
  },

  post_img:{
    paddingTop:-300,
    width:390,
    height:250,
  },

  item_text:{
    width: 358,
    marginLeft: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: 1,
    marginBottom: 16

  }




})


export default Home