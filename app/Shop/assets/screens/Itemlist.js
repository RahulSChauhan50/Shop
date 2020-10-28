/*This is an Example of Grid View in React Native*/
import React, {Component} from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
  Pressable,
} from 'react-native';

import {Appbar,Snackbar} from 'react-native-paper';
import axios from 'axios';
import color from '../colors/colors';

export default class Itemlist extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      cols:
        Dimensions.get('window').height >= Dimensions.get('window').width
          ? 2
          : 3,
          visible:false
    };
  }

  setCategorytpe = () => {
    switch (this.props.route.params.categoryid) {
      case 0:
        return 'Mobiles';
        break;
      case 1:
        return 'Electronics';
        break;
      case 2:
        return 'Clothings';
        break;
      case 3:
        return 'Sports';
        break;
      case 4:
        return 'Books';
        break;
      case 5:
        return 'Decoration';
        break;
      case 6:
        return 'Video_Games';
        break;
      case 7:
        return 'Computer&peripheral';
        break;
      default:
        return 'Mobiles';
        break;
    }
  };

  onToggleSnackBar = () => {this.setState({visible:true})}

  onDismissSnackBar = () => {this.setState({visible:false})}

  fetchandupdatedata=()=>{
   
      axios.get('https://calm-garden-34154.herokuapp.com/api/home?')
      .then((res) => {
        this.setState({dataSource: res.data})
      })
      .catch((error)=>{
        this.onToggleSnackBar();
        console.log(error);
      })
      
  }

  onChange = ({window, screen}) => {
    if (window.height >= window.width) {
      this.setState({cols: 2});
    } else {
      this.setState({cols: 3});
    }
  };

  componentDidMount() {
    this.fetchandupdatedata();

    Dimensions.addEventListener('change', this.onChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }

  render() {
    var categorytype = this.setCategorytpe();
    var i;
    var data = this.state.dataSource;
    var itemdata = [];
    for (i = 0; i < data.length; i++) {
      if (data[i].cat_id == categorytype) {
        itemdata.push(data[i]);
      }
    }
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue'}}>
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.navigate('Products');
            }}
          />
          <Appbar.Content title={categorytype} />
        </Appbar.Header>
        <View style={styles.MainContainer}>
          <FlatList
          onRefresh={()=>{this.fetchandupdatedata()}}
          refreshing={false}
            key={this.state.cols}
            data={itemdata}
            renderItem={({item, index}) => (
              <Pressable
                onPress={() => {
                  this.props.navigation.navigate('Details',{data:item});
                }}>
                <View style={styles.itemcontainer}>
                  <Image
                    style={styles.imageThumbnail}
                    source={{uri: item.home_image}}
                    resizeMode="contain"
                  />
                  <View style={{backgroundColor: 'white', width: 190}}>
                    <Text style={styles.name}>
                      {item.title.length > 20
                        ? item.title.substring(0, 20 - 3) + '...'
                        : item.title}
                    </Text>
                    <Text style={styles.price}>
                      {item.price[0] == '₹' ? item.price : '₹' + item.price}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
            //Setting the number of column
            numColumns={this.state.cols}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View>
        <Snackbar
        visible={this.state.visible}
        onDismiss={()=>{this.onDismissSnackBar()}}
        action={{
          label: 'Retry',
          onPress: () => {
            this.onDismissSnackBar();
            this.fetchandupdatedata();
          },
        }}>
        Something Went Wrong !
      </Snackbar>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 20,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
    width: null,
    marginTop: 10,
    flex: 1,
  },
  name: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemcontainer: {
    flex: 1,
    margin: '2%',
    width: 190,
    height: 290,
    backgroundColor: color.white,
  },
});
