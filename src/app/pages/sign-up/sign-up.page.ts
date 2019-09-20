import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
isDiasabled : boolean = true;
email;
pass;
user:string;

  constructor(private dog :AngularFirestore,public data :Router,public afAuth: AngularFireAuth) {
    console.log(this.afAuth.auth.currentUser)
   }


  chang(){
    this.isDiasabled =false;
  }

 
  signUP(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.pass).then(error => {
     
      
        this.dog.collection('users').add({
   name : null,
   age : null,
   phone : null,
   uid : this.afAuth.auth.currentUser.uid
  
}).then(function(ref) {
  console.log("document was written with ID : "+ ref);
  this.data.navigateByUrl('/about/first-page/profile');
}).catch(function(){
  console.log("error while processing ..")
  console.log(error)
});
     // update  Profile
  
     this.afAuth.auth.currentUser.updateProfile({
      displayName : this.user
    
    }).then(err =>{
      this.data.navigateByUrl("/about/first-page/chat");
      console.log(err)
    }
    )
     console.log(error)
      console.log("user created")
    //  this.route.navigateByUrl("/sign-in")
      // ...
    });
  }
  ngOnInit() {
  }

}
