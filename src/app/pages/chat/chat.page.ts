import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatServiceService } from '../../chat-service.service';
import { Camera, CameraOptions,  } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { IonicConfig } from '@ionic/core';
import { IonContent } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

@ViewChild(IonContent) Content :IonContent;


  temp;
  temp1;
  authState;

  constructor(private dog :AngularFirestore,private cam: Camera,private file :File,public afAuth :AngularFireAuth, private obj:ChatServiceService ) {
    console.log(this.afAuth.auth.currentUser.uid)
 
    this.temp = this.dog.collection('ChatRoom', obj => obj.orderBy("time") ).valueChanges();
    console.log(this.temp)
    this.temp1 = this.dog.collection('users').valueChanges();
    console.log(this.temp1)

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
   }
photos : any[];
date = Date.now();
mess : string;
writePost;
user = this.afAuth.auth.currentUser;
item = {
  userID : "",
  email : "",
  message : "",
  name : "",
  phoneNum : "0817713384",
  time : Date.now() 
   
 };

 get authenticated(): boolean {
  return this.authState !== null;
}

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

sendMsg(item){
  this.Content.scrollToBottom(200);
 //this.obj.addData(this.item);
 this.dog.collection('ChatRoom').add({
   email : this.afAuth.auth.currentUser.email,
   message : this.mess,
   userID : this.afAuth.auth.currentUser.uid,
   time : Date.now(),
   name : this.afAuth.auth.currentUser.displayName
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
  photo1(){
    console.log("ready ..")
  }
  photo(){
    
    const options : CameraOptions = {
      quality: 100,
      destinationType: this.cam.DestinationType.FILE_URI,
      encodingType: this.cam.EncodingType.JPEG,
      mediaType: this.cam.MediaType.PICTURE
      
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
      let base64Image = 'data:image/jpeg;base64,' + imageData;
     });
     console.log("Done ..")
  }

  ngOnInit() {
  }

}
