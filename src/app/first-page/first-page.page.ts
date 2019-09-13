import { Component, OnInit } from '@angular/core';





@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})

export class FirstPagePage implements OnInit {
  currentImage: any;
  constructor() { }


  // photo1(){
  //   console.log("ready ..")
  // }
  // photo(){
  //   console.log("ready ..")
  //   const options : CameraOptions = {
  //     quality: 100,
  //     destinationType: this.cam.DestinationType.FILE_URI,
  //     encodingType: this.cam.EncodingType.JPEG,
  //     mediaType: this.cam.MediaType.PICTURE
      
  //   }
    
  //   this.cam.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     console.log("Pic Done ..")
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //    }, (err) => {
  //     // Handle error
  //     console.log("Handle error ..")
  //    });
  //    console.log("Done ..")
  // }



  ngOnInit() {
  }
}
