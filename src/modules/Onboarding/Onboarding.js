import React, { useState } from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';


const { height, width } = Dimensions.get('screen');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);
console.log(iPhoneX)

import materialTheme from '../../constants/Theme';

export default function Onboarding({ navigation })
{

  return (

    <Block flex style={styles.container}>
      <ImageBackground source={require('../../assets/images/background.png')}
        style={styles.container}>
        <Block flex space="between" style={styles.padded}>
          <Block style={{ zIndex: 2, marginTop: iPhoneX ? theme.SIZES.BASE * 10 : theme.SIZES.BASE * 5 }}>
            <Block>
              <Text color="white" size={25}>みんなで作る電話帳</Text>
            </Block>
            <Block center style={{ marginTop: theme.SIZES.BASE * 6 }}>
              <ImageBackground source={require('../../assets/images/contact.png')}
                style={{ width: 200, height: 200, resizeMode: 'contain'}}>
              </ImageBackground>
            </Block>
            <Block center style={{ marginTop: theme.SIZES.BASE * 2 }}>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.PRIMARY}
                onPress={() => { navigation.navigate('App'), console.log('app') }}>
                Get Started
              </Button>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    resizeMode: 'contain'
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 10,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    padding: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE * 4,
    shadowOpacity: 0,
  },
});
