import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, ScrollView, View, TextInput, Platform } from 'react-native'
import { Block, Text, Input, theme } from 'galio-framework'
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3'


import Header from '../components/Header'
import materialTheme from '../../constants/Theme'
import * as MainServices from '../../services/mainService'


const { width, height } = Dimensions.get('screen')
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

export default function EditInfo({ navigation, route })
{
  console.log(route.params.data)

  const [data, setData] = useState(route.params.data)
  const area = data.meiwaku.area_code
  const city = data.meiwaku.city_code
  const number = data.meiwaku.telephone_numbers
  const [recaptcha, setRecaptcha] = React.useState('')
  const [savedata, setSavedata] = useState()
  // const captchaRef = useRef(null);
  var captchaRef = React.createRef();
 
  useEffect(() => {
    if(route.params.data.place){
      var temp1 = {}
      temp1.company = route.params.data.place.company
      temp1.gyoshu = route.params.data.place.ghoshu
      temp1.jusho = route.params.data.place.jusho
      temp1.moyori = route.params.data.place.moyorieki
      temp1.access = route.params.data.place.access
      temp1.site = route.params.data.place.site
      temp1.jighonaiyou = route.params.data.place.jigyo_naoyo
      temp1.area_code = route.params.data.place.area_code
      temp1.city_code = route.params.data.place.city_code
      temp1.num = route.params.data.place.num
      temp1['recaptcha-token'] = recaptcha
      setSavedata(temp1)
    }
  }, [recaptcha])

  const plus = () =>
  {
    MainServices.spamPlus({ area, city, number }).then(result =>
    {
      const temp = { ...data }
      temp.meiwaku = result.data
      setData(temp)
    })
  }

  const minus = () =>
  {
    MainServices.spamMinus({ area, city, number }).then(result =>
    {
      const temp = { ...data }
      temp.meiwaku = result.data
      setData(temp)
    })
  }

  const saveInfo = () =>
  {
    console.log(savedata)
    MainServices.SaveInfo(savedata, recaptcha, 'form').then(result =>
    {
      // console.log(result.data, '-------------')
      // captchaRef.current.refreshToken()
    })
  }


  const inputChange = (text, name) =>
  {
    var temp = { ...data }
    var temp1 = {...savedata}
    switch (name)
    {
      case 'company':
        temp.place.company = text
        temp1.company = text
        break;
      case 'ghoshu':
        temp.place.ghoshu = text
        temp1.gyoshu = text
        break;
      case 'jusho':
        temp.place.jusho = text
        temp1.jusho = text
        break;
        case 'moyorieki':
          temp.place.moyorieki = text
          temp1.moyori = text
          break;
        case 'access':
          temp.place.access = text
          temp1.access = text
          break;
        case 'site':
          temp.place.site = text
          temp1.site = text
          break;
        case 'jigyo_naoyo':
          temp.place.jigyo_naoyo = text
          temp1.jighonaiyou = text
        break;

      default:
        break;
    }
    setData(temp)
    setSavedata(temp1)
  }

  return (
    <>
      <Header title={'電話番号入力情報'} move='App' navigation={navigation}></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={styles.home}>
          <Text style={styles.label}>電話番号</Text>
          <View style={{ flex: 1 }}>
            <View style={styles.row}>
              <Text style={styles.button}>{data.meiwaku.area_code}</Text>
              <Text style={styles.button}>{data.meiwaku.city_code}</Text>
              <Text style={styles.button}>{data.meiwaku.telephone_numbers}</Text>
            </View>
          </View>
          <Text style={styles.label}>地域</Text>
          <Input
            color={'black'}
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={styles.input}
            value={data.area.ma}
          ></Input>
          <Text style={styles.label}>番号種別</Text>
          <Input
            color={'black'}
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={styles.input}
            value={data.area.number_kukaku_code}
          ></Input>
          <Text style={styles.label}>回線提供</Text>
          <Input
            color={'black'}
            placeholderTextColor={materialTheme.COLORS.MUTED}
            style={styles.input}
            value={data.area.company}
          ></Input>
          <View style={{ flex: 1, marginBottom: theme.SIZES.BASE / 2 }}>
            <View style={styles.row}>
              <View style={{ flexGrow: 3 }}>
                <Text>アクセス数</Text>
              </View>
              <View style={[styles.row, { flexGrow: 3 }]}>
                <Text>安全性</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: materialTheme.COLORS.SUCCESS }}>{data.meiwaku.plus}</Text>
              </View>
              <View style={{ flexGrow: 4, marginRight: theme.SIZES.BASE * 3, alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: materialTheme.COLORS.ERROR }}>{data.meiwaku.minus}</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, marginBottom: theme.SIZES.BASE * 2 }}>
            <View style={styles.row}>
              <Text style={{ color: 'black', width: theme.SIZES.BASE * 5, fontSize: 17 }}>{data.val3}</Text>
              <Text style={[styles.button1, { backgroundColor: materialTheme.COLORS.SUCCESS }]} onPress={() => plus()}>迷惑電話じゃない！</Text>
              <Text style={[styles.button1, { backgroundColor: materialTheme.COLORS.ERROR }]} onPress={() => minus()}>迷惑電話だ！</Text>
            </View>
          </View>
          {data.place ? (
            <>
              <Input
                color={'black'}
                placeholder='事業者名(必須)'
                placeholderTextColor={materialTheme.COLORS.MUTED}
                style={styles.input}
                value={data.place.company}
                onChangeText={(text) => inputChange(text, 'company')}
              ></Input>
              <Input
                color={'black'}
                placeholder='業種'
                placeholderTextColor={materialTheme.COLORS.MUTED}
                style={styles.input}
                value={data.place.ghoshu}
                onChangeText={(text) => inputChange(text, 'ghoshu')}
              ></Input>
              <Input
                color={'black'}
                placeholder='住所'
                placeholderTextColor={materialTheme.COLORS.MUTED}
                style={styles.input}
                value={data.place.jusho}
                onChangeText={(text) => inputChange(text, 'jusho')}
              ></Input>
              <Input
                color={'black'}
                placeholder='最寄駅'
                placeholderTextColor={materialTheme.COLORS.MUTED}
                style={styles.input}
                value={data.place.moyorieki}
                onChangeText={(text) => inputChange(text, 'moyorieki')}
              ></Input>
              <Input
                color={'black'}
                placeholder='アクセス'
                placeholderTextColor={materialTheme.COLORS.MUTED}
                style={styles.input}
                value={data.place.access}
                onChangeText={(text) => inputChange(text, 'access')}
              ></Input>
              <Input
                color={'black'}
                placeholder='公式サイト'
                placeholderTextColor={materialTheme.COLORS.MUTED}
                style={styles.input}
                value={data.place.site}
                onChangeText={(text) => inputChange(text, 'site')}
              ></Input>
              <TextInput
                numberOfLines={Platform.OS === 'ios' ? null : 4}
                minHeight={Platform.OS === 'ios' ? (theme.SIZES.BASE * 7) : null}
                multiline={true}
                color={'black'}
                placeholder='事業内容'
                placeholderTextColor={materialTheme.COLORS.MUTED}
                style={[styles.input, { padding: Platform.OS === 'ios' ? theme.SIZES.BASE : theme.SIZES.BASE, paddingTop: iPhoneX ? theme.SIZES.BASE : null, }]}
                value={data.place.jigyo_naoyo}
                onChangeText={(text) => inputChange(text, 'jigyo_naoyo')}
              ></TextInput>
            </>
          ) : null}

          <Text
            style={{ fontSize: 17, color: materialTheme.COLORS.ERROR, marginTop: theme.SIZES.BASE }}
            onPress={() => navigation.navigate('EditComment', { data: data })}
          >コメントログビューア</Text>
          <Text style={[styles.saveButton]} onPress={() => saveInfo()}>保存</Text>
        </Block>
        <ReCaptchaV3
          ref={captchaRef}
          captchaDomain={'https://meiwaku-denwa.club'}
          siteKey={'6LcbqRIaAAAAAJuFSZJB3iweFSoWTX3JUkgqU8V5'}
          onReceiveToken={(token) => setRecaptcha(token)} />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  home: {
    width: width,
    padding: iPhoneX ? theme.SIZES.BASE * 1.5 : theme.SIZES.BASE
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  label: {
    fontSize: 13,
    marginBottom: theme.SIZES.BASE / 2,
    marginTop: theme.SIZES.BASE
  },

  button: {
    // width: width / 4,
    color: 'black',
    borderRadius: 20,
    // elevation: 8,
    paddingVertical: theme.SIZES.BASE / 1.4,
    paddingHorizontal: theme.SIZES.BASE * 2,
    backgroundColor: materialTheme.COLORS.DEFAULT,
    overflow: iPhoneX ? 'hidden' : null
  },

  button1: {
    // width: width / 4,
    color: 'white',
    borderRadius: 20,
    // elevation: 8,
    // backgroundColor: materialTheme.COLORS.DEFAULT,
    paddingVertical: theme.SIZES.BASE / 1.4,
    paddingHorizontal: theme.SIZES.BASE / 1.5,
    overflow: iPhoneX ? 'hidden' : null
  },

  saveButton: {
    color: 'white',
    borderRadius: 23,
    // elevation: 8,
    marginTop: theme.SIZES.BASE,
    textAlign: 'center',
    backgroundColor: materialTheme.COLORS.PRIMARY,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    overflow: iPhoneX ? 'hidden' : null
  },

  input: {
    borderRadius: 23,
    // borderColor: 'transparent',
    borderColor: materialTheme.COLORS.INPUT,
    backgroundColor: materialTheme.COLORS.DEFAULT,
    color: 'black',
  },

  rowinput: {
    width: '50%',
    borderRadius: 30,
    // borderColor: 'transparent',
    borderColor: materialTheme.COLORS.INPUT,
    backgroundColor: materialTheme.COLORS.DEFAULT,
    color: 'black',
  }


})
