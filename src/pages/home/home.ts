import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  qrData = null;
  createdCode = null;
  scannedCode = null;
 
  constructor(private barcodeScanner: BarcodeScanner) { 
    this.scanCode();
  }

  ngOnInit() {
    // if(this.scannedCode == null) {
    //   this.scanCode();
    // }
  }
 
  createCode() {
    this.createdCode = this.qrData;
  }
 
  scanCode() {
    this.barcodeScanner.scan(
    	{ preferFrontCamera : true, // iOS and Android
          showFlipCameraButton : true // iOS and Android
        }).then(barcodeData => {
      this.scannedCode = barcodeData.text;
      setTimeout(() => {
        console.log("hello")  
        this.scanCode();
      }, 2000);


    }, (err) => {
        console.log('Error: ', err);
    });
  }
}
