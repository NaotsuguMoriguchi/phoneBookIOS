> # Phone book for `Android` & `iOS`🚀

`meiwaku-denwa.club`
みんなで作る電話帳
このサイトはみんなで作る電話帳です。しつこい勧誘や振込詐欺などの迷惑電話の情報共有を目的としています。迷惑電話だけでなく、かけ直しが必要な情報（支払遅延の催促電話など）もあります。安全な番号には安心して折り返しできるように、お気軽にクチコミ投稿をお願いします。

 ## Getting Started
****

### **`- Prerequirments`**

Environment setup


### **`- Clone the project from git`**

```bash
git clone https://github.com/SnowWhite1049/phoneBookIOS.git
# After clone
cd phoneBookIOS # /phoneBookIOS folder
```

### **`- Install packages`**

```bash
# Using yarn
yarn install

# ----or-------

# Using npm 
npm install
```
```bash
# Install Pods for ios
cd ios && pod install # /phoneBookIOS/ios folder
```
****

### `1. Run and build for android`

* *Run this command to start the development server and to start your app on `Android emulator`*:

```bash
# Using yarn
yarn run:android
# ------or-------
# Using npm
npm run run:android
```
> if you have got error, run this command then again run.

```bash
cd android/app # /phoneBookIOS/android/app folder
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```
then try again.

* *Release apk for `Android`*

```bash
cd android # /phoneBookIOS/android folder
gradlew assembleRelease
```
> Or, you can relaese in Android Studio
#### - Open the `phoneBookIOS` project
#### - `Build/Generate Signed Bundle/APK...` of toolbar
#### - Select `APK` and click the `next` button 
#### - Input Keystore path and password and  click the `next` button
#### -Select `release` of Build Variants item and check the `V2(Full APK Signature)` and then click the `finish` button.


You can find the `app-release.apk` on `android/app/release` folder.

****

### `2. Open RNS in your iOS simulator`

* *Run this command to start the development server and to start your app on `iOS simulator`*:

```bash
# Using yarn
yarn start
# ------or-------
# Using npm
npm start
```
> Open new terminal and run this command 
```bash
# Using yarn
yarn run:ios
# ------or-------
# Using npm
npm run run:ios
```

### That's it! Cool, right? 😍