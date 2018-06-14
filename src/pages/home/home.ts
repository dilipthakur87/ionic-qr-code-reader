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
