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
  ActivityIndicator, FlatList, Image,
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
      <SafeAreaView style={styles.search}>
        <TextInput placeholder='seach' clearButtonMode='always'
                   style={{paddingHorizontal:20,
                     paddingVertical:10, borderColor:"#ccc", borderWidth:1, borderRadius:7}}
                   autoCapitalize="none"
                   autoCorrect={false}
                   value={searchQuery} onChangeText={(query) => handleSearch(query)}/>
      </SafeAreaView>

      <FlatList
            data={data}
            renderItem={(item) => item.login.username}
            renderItem={({item}) => (
                <View>
                    <Image style={{width:50, height:50, borderRadius:25}} source={{uri: item.picture.thumbnail}}/>
                    <View>
                        <Text style={{fontSize: 18}}> {item.name.first} {item.name.last}</Text>
                        <Text> {item.email}</Text>
                    </View>
                </View>)}
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




})


export default Home