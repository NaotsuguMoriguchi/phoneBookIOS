import React, { useState } from 'react'
import { StyleSheet, Dimensions, ScrollView, View, TextInput} from 'react-native'
import { Block, Text, theme } from 'galio-framework'
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3'


import Header from '../components/Header'

import materialTheme from '../../constants/Theme'
import * as MainServices from '../../services/mainService'
import { clearStorage } from '../../services/storageService'

const { width, height } = Dimensions.get('screen')
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

export default function EditComment({ navigation, route })
{
  const [comments, setComments] = useState(route.params.data.com.data)
  const [comment, setComment] = useState()
  const [recaptcha, setRecaptcha] = React.useState('')
  var captchaRef = React.createRef();

  const plus = (comment) =>
  {
    MainServices.commentPlus({
      id: comment.id,
      area: comment.area_code,
      city: comment.city_code,
      number: comment.telephone_numbers
    }).then(result =>
    {
      setComments(result.data.data)
    })
  }

  const minus = (comment) =>
  {
    MainServices.commentMinus({
      id: comment.id,
      area: comment.area_code,
      city: comment.city_code,
      number: comment.telephone_numbers
    }).then(result =>
    {
      setComments(result.data.data)
    })
  }

  const delReq = (comment) =>
  {
    MainServices.delReq({
      id: comment.id,
      area: comment.area_code,
      city: comment.city_code,
      number: comment.telephone_numbers
    }).then(result =>
    {
      setComments(result.data.data)
    })
  }

  const addComment = () => {
    const savedata = {}
    savedata.area_code = route.params.data.meiwaku.area_code
    savedata.city_code = route.params.data.meiwaku.city_code
    savedata.num = route.params.data.meiwaku.telephone_numbers
    savedata.comment = comment
    savedata['recaptcha-token'] = recaptcha
    console.log(savedata)
    MainServices.addComment(savedata, recaptcha, 'form').then(result =>
      {
        console.log(result.data, '-------------')
        setComments(result.data.data)
      })
  }


  return (
    <>
      <Header title={'コメントログビューア'} move={'EditInfo'} data={route.params.data} navigation={navigation}></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={styles.home}>
          <Block>
          <TextInput
            numberOfLines={Platform.OS === 'ios' ? null : 2}
            minHeight={Platform.OS === 'ios' ? (theme.SIZES.BASE * 4) : null}
            multiline={true}
            color={'black'}
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={[styles.input, { padding: Platform.OS === 'ios' ? theme.SIZES.BASE : theme.SIZES.BASE, paddingTop: iPhoneX ? theme.SIZES.BASE : null, marginBottom: theme.SIZES.BASE }]}
            value={comment}
            onChangeText={(text) => setComment(text)}
          ></TextInput>
          <Text style={[styles.button, { backgroundColor: materialTheme.COLORS.GRADIENT_END, width: '15%' }]} onPress={() => addComment()}>追加</Text>
          </Block>
          {
            comments.map((comment, index) =>
            (
              <View style={{ marginBottom: theme.SIZES.BASE / 2 }} key={index}>
                <View style={{ flex: 1, }} >
                  <View style={styles.row}>
                    <View style={{ flexGrow: 1, marginRight: theme.SIZES.BASE }}>
                      <Text>&bull;</Text>
                    </View>
                    <View style={{ flexGrow: 10 }} >
                      <Text style={{ fontSize: 15 }}>{comment['comments']}</Text>
                      {/* <Text style={{ color: materialTheme.COLORS.INFO }}>0852 - 24 - 1171</Text> */}
                      <Text> {comment['created_at']}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.row}>
                    <View style={[styles.row, styles.alignCenter]}>
                      <Text style={[styles.button, { backgroundColor: materialTheme.COLORS.INFO }]} onPress={() => plus(comment)}>プラス</Text>
                      <Text> :{comment.plus}</Text>
                    </View>
                    <View style={[styles.row, styles.alignCenter]}>
                      <Text style={[styles.button, { backgroundColor: materialTheme.COLORS.ERROR }]} onPress={() => minus(comment)}>マイナス</Text>
                      <Text> :{comment.minus}</Text>
                    </View>
                    <View style={[styles.row, styles.alignCenter]}>
                      <Text style={[styles.button, { backgroundColor: materialTheme.COLORS.MUTED }]} onPress={() => delReq(comment)}>削除依頼</Text>
                      <Text> :{comment.sakujo}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          }
           <ReCaptchaV3
          ref={captchaRef}
          captchaDomain={'https://meiwaku-denwa.club'}
          siteKey={'6LcbqRIaAAAAAJuFSZJB3iweFSoWTX3JUkgqU8V5'}
          onReceiveToken={(token) => setRecaptcha(token)} />
        </Block>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  home: {
    width: width,
    padding: theme.SIZES.BASE
  },

  alignCenter: {
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    paddingLeft: theme.SIZES.BASE,
    paddingRight: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE / 2,
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
  button: {
    color: 'white',
    borderRadius: iPhoneX ? 18 : 30,
    paddingVertical: theme.SIZES.BASE / 1.4,
    paddingHorizontal: theme.SIZES.BASE / 1.5,
    overflow: iPhoneX ? 'hidden' : null
  },
  input: {
    borderRadius: 23,
    // borderColor: 'transparent',
    borderColor: materialTheme.COLORS.INPUT,
    backgroundColor: materialTheme.COLORS.DEFAULT,
    color: 'black',
  },



})
