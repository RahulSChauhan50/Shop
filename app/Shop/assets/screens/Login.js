import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {Button} from 'react-native-paper';

import color from '../colors/colors';

export default class Login extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, paddingBottom: '15%'}}>
            <Text style={styles.heading}>WELCOME TO</Text>
            <View style={styles.logo}>
              <Image
                source={require('../images/Untitled.png')}
                resizeMode={'contain'}
                style={{flex: 1, width: null, height: null}}
              />
            </View>
            <TextInput
              placeholderTextColor={color.white}
              style={styles.text}
              placeholder="Email"></TextInput>
            <TextInput
              placeholderTextColor={color.white}
              style={styles.text}
              secureTextEntry={true}
              placeholder="Password"></TextInput>
            <Button
              color={color.lightblue}
              mode="contained"
              onPress={() => console.log('Pressed')}>
              Login
            </Button>
            <Text
              style={{
                color: color.darkyellow,
                marginTop: '4%',
                marginStart: '30%',
              }}
              onPress={() => {
                console.log('Goes to register');
              }}>
              Not Registered? Register
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    backgroundColor: color.darkblue,
    flex: 1,
  },
  text: {
    borderColor: color.lightblue,
    borderWidth: 2,
    marginBottom: '5%',
    fontSize: 18,
    color: color.white,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: color.white,
    marginTop: '9%',
  },
  logo: {
    width: '100%',
    height: '20%',
    marginVertical: '5%',
  },
});
