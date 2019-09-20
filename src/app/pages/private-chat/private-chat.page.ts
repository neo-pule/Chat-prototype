import { Component, OnInit ,  Input, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import {AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// import { ActionSheetController } from '@ionic/angular';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import { Camera,CameraOptions} from '@ionic-native/camera/ngx'
import {MediaCapture} from '@ionic-native/media-capture'
import { AngularFireStorage,AngularFireUploadTask  } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.page.html',
  styleUrls: ['./private-chat.page.scss'],
})
export class PrivateChatPage {

  @Input() name
  @Input() temp

  @Input() mail
  @Input() uid
  @Input() time
  @Input() imgRef

  @ViewChild('myVid') myVid : any;
  url="http://www.W3schools.co.za";
  uploadPercent;
Face="www.FaceBook.com"
urlPath;
file;
file1;
photos;
urlImage;
mess;
path1;
  Userx = {
    about : "",
    age : 0,
    gender : "",
    name : "",
    phone : "",
    photoUrl : "",
    uid : ""
  };


 listItem ;

  constructor(private cam: Camera,private storage: AngularFireStorage,private share :SocialSharing,public afAuth :AngularFireAuth,private addr: ActivatedRoute,private dog : AngularFirestore) {
    this.listItem = this.dog.collection('ChatRoom',obj => obj.orderBy('time')).valueChanges();
   }
   startRec(){

   }
   selectVid(){

   }
shareFB() {

    this.share.shareViaFacebook("?", "message",this.url);  //.then(() => {
      
  //     console.log("Shared successful")
  //    // console.log(x)
  //     console.log(this.mess)
  //   }).catch(e => {
  //     console.log("Shared error")
  //     console.log(e)
  //   //  console.log(x)
  //  })
   
    }

  //  async presentActionSheet() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Share Using :',
  //     buttons: [{
  //       text: 'Facebook',
  //       icon: 'logo-facebook',
  //       handler: () => {
  //         console.log('facebook clicked')
  //         this.shareFB();
  //       }
  //     }, {
  //       text: 'Twitter',
  //       icon: 'logo-twitter',
  //       handler: () => {
  //         console.log('twitter clicked');
  //       }
  //     }, {
  //       text: 'Instagram',
  //       icon: 'logo-instagram',
  //       handler: () => {
  //         console.log('Instagram clicked');
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //       },
  //       {
  //         text: 'WhatsApp',
  //         icon: 'logo-whatsapp',
  //         handler: () => {
  //           console.log('whatsapp clicked');
  //         }
  //         },
  //         {
  //           text: 'Email',
  //           icon: 'mail',
  //           handler: () => {
  //             console.log('Email clicked');
              
  //           }
  //     }]
  //   });
  //   await actionSheet.present();
  // }


  getPhoto(){
    
    const options : CameraOptions = {
      quality: 100,
      destinationType: this.cam.DestinationType.FILE_URI,
      
          sourceType: this.cam.PictureSourceType.PHOTOLIBRARY,
         saveToPhotoAlbum:false
    }
    
    this.cam.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let filename = imageData.substring(imageData.lastIndexOf('/')+1);
      let path = imageData.substring(0,imageData.lastIndexOf('/')+1);
      this.file.readAsDataURL(path,filename).then((basedata) =>{
        this.photos.push(basedata);
      })
      
      console.log(imageData)
      
      
        console.log("Pic Done ..")
      
      
    //  let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.file1 = path;
     })
     console.log(this.file1)
     console.log(this.afAuth.auth.currentUser.metadata.lastSignInTime)
  }

   sendMsg(){
    // this.Content.scrollToBottom(200);
   //this.obj.addData(this.item);
   this.dog.collection('ChatRoom').add({
     email : this.afAuth.auth.currentUser.email,
     message : this.mess,
     userID : this.afAuth.auth.currentUser.uid,
     time : Date.now(),
     name : this.afAuth.auth.currentUser.displayName,
     recipient : this.temp
  }).then(function(ref) {
    console.log("document was written with ID : "+ ref);
  }).catch(function(){
    console.log("error while processing ..")
  });
  console.log(this.afAuth.auth.currentUser.email)
  console.log(this.afAuth.auth.currentUser.displayName)
  // this.item.push({
  //   userID : this.afAuth.auth.currentUser.uid,
  //   message : this.mess,
  //   name : "Neo",
  //   email : "",
  //   phoneNum : "0741634051",
  //   time :  Date.now()
  // })
  
  this.mess="";
  }
  Go(){
    console.log("worked!")
  }
  ngOnInit() {

    this.addr.queryParams.subscribe(data => {
      console.log(data)

    //  this.Userx = data.Users;  // try to decode an object from object to a object
      console.log(this.Userx)
      this.name = data.name;
      console.log(this.name)
      this.temp = data.temp;
      console.log(this.temp)
      this.imgRef = data.imgRef;
      console.log(this.imgRef)

   
     
  });


}
}