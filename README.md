# Installation

```shell
yarn
yarn start
yarn android
```

## Build APK

### Generate a key store

```shell
keytool -genkey -v -keystore your_key_name.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000
```

### Adding keystore to project

Copy keystore generated to `android/app` directory.

Edit file `android/app/build.gradle`, add the keystore configuration.

```gradle
    android {
    ....
      signingConfigs {
        release {
          storeFile file('your_key_name.keystore')
          storePassword 'your_key_store_password'
          keyAlias 'your_key_alias'
          keyPassword 'your_key_file_alias_password'
        }
      }
      buildTypes {
        release {
          ....
          signingConfig signingConfigs.release
        }
      }
    }
```

### Bundle react-native app

```shell
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

### Release APK generation

```shell
cd android
./gradlew assembleRelease
```

APK file generated will be located in `android/app/build/outputs/apk/release/`

If fail with error `app:mergeReleaseResources`: should remove all redundant directory `android/app/src/main/res/drawable-**`

```shell
rm -rf drawable-hdpi drawable-ldpi drawable-mdpi drawable-xhdpi drawable-xxhdpi drawable-xxxhdpi
```
