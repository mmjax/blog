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

function Post({ route }) {

  

  return (
    <View style={styles.container}>
      

      <View style={styles.post}>

        <View style={styles.header}>
            <Image style={styles.post_user_img} source={{uri: route.params.picture.thumbnail}}/>
            <View style={styles.header_col}>
            <Text style={styles.item_user}>{route.params.name.first}</Text>
            <Text style={styles.item_data}>{route.params.name.last}</Text>
        </View>
        </View>
      <Image style={styles.post_img} source={{uri: route.params.picture.thumbnail}}/>

        <Text style={styles.text}>{route.params.email}</Text>
      </View>

      <View style={styles.line}></View>


      <View style={styles.comment}>

        <View style={styles.header}>
            <Image style={styles.post_user_img} source={{uri: route.params.picture.thumbnail}}/>
            <View style={styles.header_col}>
                <Text style={styles.item_user}>{route.params.name.first}</Text>
                <Text style={styles.item_data}>{route.params.name.last}</Text>
            </View>
        </View>
        <Text style={styles.text_com}>{route.params.email}</Text>
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