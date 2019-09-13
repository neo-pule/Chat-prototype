import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { AngularFireAuth } from '@angular/fire/auth';
import { User,auth } from 'firebase';
import { Router } from '@angular/router';








@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
temp :boolean;
name :string;
recaptchaVerifier:firebase.auth.RecaptchaVerifier;
appVerifier;
phone;
user1;
code;
user ="Thapelo";
provider;
mail;
pass;
IsDisabled :boolean =false;
IsDisable :boolean =false;
  constructor(public data : Router,public afAuth: AngularFireAuth) { 
     this.provider = new firebase.auth.GoogleAuthProvider();
     console.log(this.afAuth.auth.currentUser)
   //this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('container');
  }




  route1(){
    console.log(this.afAuth.auth.currentUser);
    this.data.navigateByUrl("/sign-up");

  }
  logOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("user logged out successful ..")
    }).catch(function(error) {
      // An error happened.
      console.log("error .. logging user out ..")
    });
}
  signIN(){
  
    this.afAuth.auth.signInWithEmailAndPassword(this.mail, this.pass).then(error =>{
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      this.afAuth.auth.currentUser.updateProfile({
        displayName : this.user,


      })
      console.log(error)
      console.log("user logged In ..")
      this.data.navigateByUrl("/about/first-page/chat");
    
      // ...
    });
  }
  signInMail(){
    this.IsDisable =true;
    firebase.auth().signInWithRedirect(this.provider);
    firebase.auth().getRedirectResult().then( result=> {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
       // var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      this.data.navigateByUrl("/about/first-page")
      console.log("user signIn successful")
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log("user could not signIn")
      // ...
    });

  }

  PhoneAuth(){
    this.IsDisabled =true;
// this.appVerifier = this.recaptchaVerifier;
    return firebase.auth().signInWithPhoneNumber(this.phone, this.recaptchaVerifier).then( confirmationResult => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      console.log("Great.. SMS sent");
      this.user1 = confirmationResult;
    }).catch(confirmationResult => {
      // Error; SMS not sent
      // ...
      console.log("Error.. SMS not sent");
      console.log(confirmationResult);
      console.log("Blue  Magic");
    });
    
  }
  continue()
  {
    console.log("good.. SMS sent");
    console.log(this.code);
    this.user1.confirm(this.code).catch( function(err){

      alert("User couldn't sign in (bad verification code?)")
      console.log("User couldn't sign in (bad verification code?) !!")
      console.log(this.user1)
    
  });
  alert("User sign in successful")
  this.data.navigateByUrl("/about/first-page");
  }
  signOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful. 
      console.log("user Sign-out successful ")
    }).catch(function(error) {
      // An error happened.
      console.log("user Sign-out error")
    });
  }
  signAnnony(){
    firebase.auth().signInAnonymously().then(function(user) {
      if (user) {
        // User is signed in.
  
        console.log(user)
        console.log("user logged In successful")
        console.log(user.user.uid)
        console.log(firebase.auth().currentUser.uid)
        this.data.navigateByUrl("/about/first-page/chat");
      } else {
        // User is signed out.
        // ...
        console.log("user error logging In")
      }
      
    });
   
  }
  ngOnInit() {  
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.recaptchaVerifier.render()
  }

}
