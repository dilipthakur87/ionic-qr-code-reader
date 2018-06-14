# Ionic QR Code Reader 
___________

## Getting Started : 
* This shows you how to create a QR Code Scanner using Ionic 3 and Cordova Barcode and QR code Scanner.
* Ionic apps are created and developed primarily through the Ionic command line utility (the “CLI”), and use Cordova to build/deploy as a native app. This means we need to install a few utilities to get developing.
	
____________

## Installation : 
### 1. Getting Node and NPM :

Most of the tooling in the CLI is based on Node and is managed through npm. The quickest way to get Node and NPM installed on your machine is through the [NodeJS installer](https://nodejs.org/en/). Be sure to install the LTS version of Node. Close any terminals/command prompts you may have open, run the installer, and launch a new terminal window. To verify you have everything installed correctly, you can run ```npm --version``` and ```node --version```. If this errors, please resolve before moving on.

### 2. Ionic CLI and Cordova :
```bash
npm install -g ionic cordova
```
**Note:** The -g means this is a global install, so for Windows you will need to open an Admin command prompt.

_________

# Usages :

* ### Clone the repo and Change your Directory: 
```bash
git clone https://github.com/dilipthakur87/cordova.git
cd cordova
```

* ### Running on Android :
```bash
ionic cordova platform rm android
ionic cordova platform add android

ionic cordova run android
```
* ### Running on iOS :
```bash
ionic cordova platform rm ios
ionic cordova platform add ios

ionic cordova run ios
```

**NOTE :** Make sure your respective device is connected before running the command. You also need Xcode or JDK / SDK or respective dependencies installed as per your platform.

### Supported Platforms

- Android
- iOS
- Windows (Windows/Windows Phone 8.1 and Windows 10)
- Browser

## Using the plugin ##
The plugin creates the object `cordova.plugins.barcodeScanner` with the method `scan(success, fail)`.

The following barcode types are currently supported:

|  Barcode Type | Android | iOS | Windows  |
|---------------|:-------:|:---:|:--------:|
| QR_CODE       |    ✔    |  ✔  |     ✔    |
| DATA_MATRIX   |    ✔    |  ✔  |     ✔    |
| UPC_A         |    ✔    |  ✔  |     ✔    |
| UPC_E         |    ✔    |  ✔  |     ✔    |
| EAN_8         |    ✔    |  ✔  |     ✔    |
| EAN_13        |    ✔    |  ✔  |     ✔    |
| CODE_39       |    ✔    |  ✔  |     ✔    |
| CODE_93       |    ✔    |  ✖  |     ✔    |
| CODE_128      |    ✔    |  ✔  |     ✔    |
| CODABAR       |    ✔    |  ✖  |     ✔    |
| ITF           |    ✔    |  ✔  |     ✔    |
| RSS14         |    ✔    |  ✖  |     ✔    |
| PDF417        |    ✔    |  ✖  |     ✔    |
| RSS_EXPANDED  |    ✔    |  ✖  |     ✖    |
| MSI           |    ✖    |  ✖  |     ✔    |
| AZTEC         |    ✖    |  ✖  |     ✔    |

`success` and `fail` are callback functions. Success is passed an object with data, type and cancelled properties. Data is the text representation of the barcode data, type is the type of barcode detected and cancelled is whether or not the user cancelled the scan.

A full example could be:
```js
   cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : true, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
```

## iOS quirks ##

Since iOS 10 it's mandatory to add a `NSCameraUsageDescription` in the `Info.plist`.

`NSCameraUsageDescription` describes the reason that the app accesses the user's camera.
When the system prompts the user to allow access, this string is displayed as part of the dialog box. If you didn't provide the usage description, the app will crash before showing the dialog. Also, Apple will reject apps that access private data but don't provide an usage description.

To add this entry you can use the `edit-config` tag in the `config.xml` like this:

```
<edit-config target="NSCameraUsageDescription" file="*-Info.plist" mode="merge">
    <string>To scan barcodes</string>
</edit-config>
```


## Troubleshooting : 
* ### Error with android platform :
	* Make sure to export you SDK path properly :
```bash
export ANDROID_HOME=<path_to_sdk>
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```
_____

## Setting up a new QR Code Reader App : 

* We start with a blank Ionic app and will add the Cordova plugin and NPM package to use the camera as a bar code scanner.

```bash
ionic start qrCodeApp blank
cd qrCodeApp
ionic cordova plugin add phonegap-plugin-barcodescanner
npm install --save @ionic-native/barcode-scanner
```
* Now we need to import all our stuff, so open your **src/app/app.module.ts** and add the following import and also add **BarcodeScanner** to **@NgModule providers** :
```javascript
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
```

```javascript
providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner
]
```
We are now ready to create our first QR code Scanner now!

### Implementing the QR Code functions :

* In your **app/pages/home/home.ts** , import **BarCodeScanner** and also call the Cordova barcode scanner. The final code looks like this: 
```javascript
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  qrData = null;
  createdCode = null;
  scannedCode = null;
 
  constructor(private barcodeScanner: BarcodeScanner) { }
 
  createCode() {
    this.createdCode = this.qrData;
  }
 
  scanCode() {
    this.barcodeScanner.scan(
    	{ preferFrontCamera : true, // iOS and Android
          showFlipCameraButton : true // iOS and Android
        }).then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
        console.log('Error: ', err);
    });
  }
}

```

* Also change the layout to look like this :
```html
<ion-header>
  <ion-navbar>
    <ion-title>
      QR Code App
    </ion-title>
  </ion-navbar>
</ion-header>
 
<ion-content padding>
  <button ion-button full icon-left (click)="scanCode()" color="secondary"><ion-icon name="qr-scanner"></ion-icon>Scan Code</button>
 
  <ion-card *ngIf="scannedCode">
    <ion-card-content>
      Result from Scan: {{ scannedCode }}
    </ion-card-content>
  </ion-card>
</ion-content>
```

### Testing the app on real device :
Before test on the real devices make sure you have connected your Android/iOS device to your Computer. For safety, add remove Ionic Cordova Android/iOS platform.

```bash
ionic cordova platform rm android
ionic cordova platform add android
ionic cordova platform rm ios
ionic cordova platform add ios
```

* Now run on your Android/iOS device
```bash
ionic cordova run android  or   cordova run android
```
OR

```bash
ionic cordova run ios  or   cordova run ios
```

