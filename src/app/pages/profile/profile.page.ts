import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions,  } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser';
import {AngularFirestore} from '@angular/fire/firestore';
import { ChatServiceService } from '../../chat-service.service';
import { AngularFireStorage,AngularFireUploadTask  } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { User,auth } from 'firebase';
import * as  firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { type } from 'os';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  photos : any[];
  user1;
  phone;
  age;
 id;
 desc;
 gender;
 file1;
 uploadPercent;
 urlImage;
 path1;
 oldPass;
 newPass;
 imgRef:any;
urlPath;
temp1;
busy : boolean;
itemList:any;
  user ={
    about :"",
    name : "",
    
    phone : 0,
    gender : ""
  }
  constructor(private alertController:AlertController,private storage: AngularFireStorage,private afAuth : AngularFireAuth,private dog :AngularFirestore,private file :File, private data :ChatServiceService) {
    // this.afAuth.auth.currentUser.updateProfile({
    this.imgRef= "https://firebasestorage.googleapis.com/v0/b/chatapp-d5db9.appspot.com/o/uploads%2Fprofile_xkwm0xubt4?alt=media&token=3aaebb81-a972-42cf-b4f8-7d8863cca156",
    //   displayName : "Nas"
    // })     // "https://firebasestorage.googleapis.com/v0/b/chatapp-d5db9.appspot.com/o/uploads%2Fprofile_xkwm0xubt4?alt=media&token=3aaebb81-a972-42cf-b4f8-7d8863cca156";
    this.temp1 = this.afAuth.auth.currentUser;
    console.log(this.temp1)
    console.log(this.temp1.photoURL)
    this.itemList = this.dog.collection('users').valueChanges();
    console.log(this.itemList)
   
   }


  async   presentAlert(title : string,content : string)
{
  const alert =  await this.alertController.create({
    header : title,
    message : content,
    buttons : ["Ok ", "decline"]

  })
   await alert.present();
}

    async presentAlertPrompt() {
      const alert = await this.alertController.create({
        header: 'Prompt!',
        inputs: [
          {
            name: 'name1',
            type: 'text',
            placeholder: 'Placeholder 1'
          
          },
    
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Ok');
              
              this.presentAlert("Phone number","Firday");
            }
          }
        ]
      });
  
      await alert.present();
    }
   
    async updateDetails() {
      this.busy = true
      if(!this.oldPass) {
          this.busy = false
          return this.presentAlert('Error!', 'You have to enter a password')
      }
      try {
        
          this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username , this.oldPass))
      } catch(error) {
          this.busy = false
          return this.presentAlert('Error!', 'Wrong password!')
      }
      if(this.newPass) {
          await this.afAuth.auth.currentUser.updatePassword(this.newPass)

          //  update

      }
      if(this.username !== this.user.getUsername()) { //// getUsername declare method

        // update email

          await this.afAuth.auth.currentUser.updateEmail(this.username)
          this.mainuser.update({  // mainuser declare
              username: this.username
          })
      }
      this.oldPass = ""
      this.newPass = ""
      this.busy = false
      await this.presentAlert('Done!', 'Your profile was updated!')
      location.reload();
     // this.router.navigate(['/tabs/feed'])
  }
  onUpload(event) {
     console.log(event.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `uploads/profile_${id}`;
    
    this.urlPath = filePath; //file.name)
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);  //private cam: Camera     creates a task that will start the upload immediately, no need to subscribe.
   
    console.log("uploading .." + file.name);
    // task.then((upload : firebase.storage.UploadTaskSnapshot) => {
    //   console.log("upload complete !")
      
    //   firebase.database().ref(filePath).set(upload.downloadURL)
    // })
    // Progress monitoring
    this.uploadPercent = task.percentageChanges();
    // task.snapshotChanges().pipe(finalize(() => {
    //   this.urlImage = ref.getDownloadURL()}));
    //   console.log("hhhh"+this.urlImage);
    // console.log(file.name);

    // console.log(this.imgRef )
    console.log("upload complete !")
    task.snapshotChanges().pipe(
      finalize(() => this.urlImage = ref.getDownloadURL().subscribe(url => {
        console.log(url)
        this.path1 =url;
        console.log(this.path1)
      })
      
      )
      
   )
  .subscribe()
  console.log("hhhh"+this.urlImage);


   // task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();

    // var storage = firebase.storage();
    // storage.child('images/stars.jpg').getDownloadURL().then(function(url) {
    //   // `url` is the download URL for 'images/stars.jpg'
    
    // }

    // var storage = firebase.storage();
    
    // this.urlImage = storage.ref('images/stars.jpg');

    // var gsRef = storage.refFromURL('gs://bucket/images/stars.jpg')


  //   this.img = file.name;
  //   console.log(this.img);
  //   console.log(file);
  //   console.log(filePath);
  // console.log(this.uploadPercent);
  }
  // photo(){
    
  //   const options : CameraOptions = {
  //     quality: 100,
  //     destinationType: this.cam.DestinationType.FILE_URI,
  //     encodingType: this.cam.EncodingType.JPEG,
  //     mediaType: this.cam.MediaType.PICTURE
      
  //   }
    
  //   this.cam.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let filename = imageData.substring(imageData.lastIndexOf('/')+1);
  //     let path = imageData.substring(0,imageData.lastIndexOf('/')+1);
  //     this.file.readAsDataURL(path,filename).then((basedata) =>{
  //       this.photos.push(basedata);
  //     })
      
  //     console.log(imageData)
  //     console.log("Pic Done ..")
  //   //  let base64Image = 'data:image/jpeg;base64,' + imageData;
  //    });
  //    console.log("Done ..")
  // }


  // getPhoto(){
    
  //   const options : CameraOptions = {
  //     quality: 100,
  //     destinationType: this.cam.DestinationType.FILE_URI,
      
  //     sourceType: this.cam.PictureSourceType.PHOTOLIBRARY,
  //     saveToPhotoAlbum:false
  //   }
    
  //   this.cam.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let filename = imageData.substring(imageData.lastIndexOf('/')+1);
  //     let path = imageData.substring(0,imageData.lastIndexOf('/')+1);
  //     this.file.readAsDataURL(path,filename).then((basedata) =>{
  //       this.photos.push(basedata);
  //     })
      
  //     console.log(imageData)
      
      
  //       console.log("Pic Done ..")
      
      
  //   //  let base64Image = 'data:image/jpeg;base64,' + imageData;
  //   this.file1 = path;
  //    })
  //    console.log(this.file1)
  //    console.log(this.afAuth.auth.currentUser.metadata.lastSignInTime)
  // }

  done(obj){
 
   this.data.update(obj);
  }
  ngOnInit() {
  }

}
