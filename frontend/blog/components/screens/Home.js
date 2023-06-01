import React, {useEffect, useState} from 'react';

import filter from 'lodash.filter'

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

function Home(props) {

  const API_ENDPOINT = `https://randomuser.me/api/?results=30`

    const { navigation } = props

    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setsearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSearch = (query) => {
      setsearchQuery(query);
      const forformattedQuery = query.toLowerCase();
      const filteredData = filter(fullData, (user) => {
        return contains(user, forformattedQuery);
      });
      setData(filteredData);
    };

    const contains = ({name, email}, query) => {
      const {first, last} = name;
      if (first.includes(query) || last.includes(query) || email.includes(query)){
        return true;
      }
      return false;
    }

    useEffect(() => {
      setIsLoading(true);
      fetchData(API_ENDPOINT);
    }, []);

    const fetchData = async(url) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json.results);

        setFullData(json.results);

        console.log(json.results);
      } catch (error) {
        setError(error);
        console.log(error);
        }
    };

  return (
    <View style={styles.container}>
      <SafeAreaView >
        <TextInput placeholder='seach' clearButtonMode='always'
                   style={styles.search}
                   autoCapitalize="none"
                   autoCorrect={false}
                   value={searchQuery} onChangeText={(query) => handleSearch(query)}/>
      </SafeAreaView>

      <View style={styles.line_btn}>
        <Pressable style={styles.o_btn} >
          <Text style={styles.txt_o_btn}>музыка</Text>
        </Pressable>
        <Pressable style={styles.o_btn}>
          <Text style={styles.txt_o_btn}>фильмы</Text>
        </Pressable>
        <Pressable style={styles.o_btn}>
          <Text style={styles.txt_o_btn}>юмор</Text>
        </Pressable>
        <Pressable style={styles.o_btn}>
          <Text style={styles.txt_o_btn}>игры</Text>
        </Pressable>
      </View>

      <FlatList style={styles.list}
            data={data}
            кey={(item) => item.login.username}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.items} onPress={() => navigation.navigate('Post', item)}>
                  <View style={styles.header}>
                    <Image style={styles.item_img} source={{uri: item.picture.thumbnail}}/>
                    <View style={styles.header_colum}>
                      <Text style={styles.item_user}> {item.name.first}</Text>
                      <Text style={styles.item_data}> {item.name.last}</Text>
                    </View>
                  </View>

                    <Image style={styles.post_img} source={{uri: item.picture.thumbnail}}/>

                    <Text style={styles.item_text}> {item.email}</Text>

                </TouchableOpacity>)}
      />
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

  line_btn:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:329,
    marginLeft: 0,
    marginTop: 16,
  },

  o_btn:{
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
    letterSpacing: 0.03,
    alignSelf:'center',
    marginTop: 25

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
    marginTop:16,
  },

  items:{
    marginTop:16,
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

  post_img:{
    paddingTop:-300,
    width:390,
    height:250,
  },

  item_text:{
    width: 358,
    marginLeft: 16,
    marginTop:16,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,

  }




})


export default Home