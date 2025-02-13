import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

import {Appbar, Text, Surface, Badge} from 'react-native-paper';
import {connect} from 'react-redux';
import color from '../colors/colors';

class products extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {name: 'Mobiles', path: require('../images/smartphones.jpeg')},
        {name: 'Electronics', path: require('../images/electronics.jpg')},
        {name: 'Clothing', path: require('../images/clothing.jpeg')},
        {name: 'Sports', path: require('../images/sports.jpg')},
        {name: 'Books', path: require('../images/books.jpeg')},
        {name: 'Decoration', path: require('../images/Decoration.jpg')},
        {name: 'Video Games', path: require('../images/Video_games.jpg')},
        {
          name: 'Computer and Peripherals',
          path: require('../images/computer&peripherals.jpg'),
        },
      ],
      columnno:
        Dimensions.get('window').height >= Dimensions.get('window').width
          ? 2
          : 3,
    };
  }

  onchange = ({window, screen}) => {
    if (window.height >= window.width) {
      this.setState({columnno: 2});
    } else {
      this.setState({columnno: 3});
    }
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.onchange);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onchange);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: color.white}}>
        <Appbar.Header style={{backgroundColor: color.MintyGreenMedium}}>
          <Appbar.Action
            icon="menu"
            size={40}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <Appbar.Content titleStyle={{fontSize: 25}} title="Products" />
          <View>
            <Appbar.Action
              icon="cart"
              color={color.white}
              size={30}
              onPress={() => {
                this.props.navigation.navigate('MyCart');
              }}
            />
            <Badge
              style={{position: 'absolute', backgroundColor: color.BadgeColor}}>
              {this.props.total_product}
            </Badge>
          </View>
        </Appbar.Header>
        <View style={{marginBottom: 60, alignItems: 'center'}}>
          <FlatList
            key={this.state.columnno}
            data={this.state.data}
            renderItem={({item, index}) => (
              <Pressable
                style={style.outerContainer}
                onPress={() => {
                  this.props.navigation.navigate('Itemlist', {
                    categoryid: index,
                  });
                }}>
                <Surface style={style.card}>
                  <Image source={item.path} style={style.image} />
                  <View>
                    <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                      {item.name}
                    </Text>
                  </View>
                </Surface>
              </Pressable>
            )}
            numColumns={this.state.columnno}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  image: {
    height: null,
    width: null,
    flex: 1,
  },
  card: {
    width: '100%',
    height: '100%',
    elevation: 10,
  },
  outerContainer: {
    width: 160,
    height: 160,
    marginVertical: '3%',
    marginHorizontal: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    total_product: state.cartReducer.total_product,
  };
};

export default connect(mapStateToProps, null)(products);
