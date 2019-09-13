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
 imgRef:Observable<string|null>;
urlPath;
temp;
  user ={
    about :"",
    name : "",
    
    phone : 0,
    gender : ""
  }
  constructor(private storage: AngularFireStorage,private afAuth : AngularFireAuth,private dog :AngularFirestore,private cam: Camera,private file :File, private data :ChatServiceService) {
    const temp = this.storage.ref(this.urlPath);
    this.imgRef = temp.getDownloadURL();
   }


  onUpload(event) {
     console.log(event.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `uploads/profile_${id}`;
    this.urlPath = filePath;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);  // creates a task that will start the upload immediately, no need to subscribe.
   // Progress monitoring
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    console.log(file.name);

    console.log(ref.getDownloadURL().subscribe() )

  



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
    //  let base64Image = 'data:image/jpeg;base64,' + imageData;
     });
     console.log("Done ..")
  }


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
     });
     this.afAuth.auth.currentUser.photoURL = this.file1;
     console.log(this.file1)
     console.log(this.afAuth.auth.currentUser.metadata.lastSignInTime)
  }

  done(obj){
 
   this.data.update(obj);
  }
  ngOnInit() {
  }

}
