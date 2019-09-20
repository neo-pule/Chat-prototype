import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreDocument} from '@angular/fire/firestore'
import { ChatServiceService } from '../../chat-service.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-on-chat',
  templateUrl: './on-chat.page.html',
  styleUrls: ['./on-chat.page.scss'],
})
export class OnChatPage implements OnInit {
  itemList;
name;
mess;
time;
temp;
name1;
mess1;
time1;
temp1;
imgRef:any;
mail;
listItem;
query;
 Users = {
   about : "",
   age : 0,
   gender : "",
   name : "",
   phone : "",
   photoUrl : "",
   uid : ""
 };
tempFriend = [];
tempBuddy = [];
  constructor(public afAuth :AngularFireAuth,private dog : AngularFirestore,private obj :ChatServiceService,private data :Router) { 
    this.obj.getInfo().subscribe(data => {
      this.temp = data;
     
    })
this.itemList = this.dog.collection('users').valueChanges();
// this.listItem = this.dog.collection('ChatRoom').valueChanges();
console.log(this.itemList)
console.log(this.temp)


//this.cat = this.list.getInfo();

  // this.obj.getInfo().subscribe(data => {
    
  //  this.itemList = data.map ( e => {
  //    return{
  //      key: e.payload.doc.id,
  //      ...e.payload.doc.data()
  //    } as Rooms;
  //  });
  // })


}

searchUser(user){
  
let temp = this.tempFriend;

var q = user.target.value;

if(q.trim() === ''){
  this.tempBuddy = this.tempFriend;
  return;
}

temp = temp.filter((v) =>{
  if(v.displayName.toLowercase().indexOf(q.toLowercase()) > -1){
  return true;
}
return false;
})

this.tempBuddy = temp;
}

clicked(Item){
  this.temp = Item.uid;
  this.mess = Item.message;
  this.time = Item.time;
  this.name = Item.name;
  this.imgRef = Item.photoUrl;
  this.Users = Item;

  console.log(Item);
  console.log(this.Users);
     console.log(this.itemList);
 return this.data.navigate(['/about/first-page/private-chat'], {queryParams: {imgRef : this.imgRef,temp :this.temp,name :this.name,Users :this.Users,mail :this.mail,}}); 
//  console.log(this.nkey);
//  console.log(this.nPrice);
//  console.log(this.nPrice);

 }
 click(Item){
  this.temp1 = Item.userID;
  this.mess1 = Item.message;
  this.time1 = Item.time;
  this.name1 = Item.name;



  console.log(Item);
 
     console.log(this.listItem);
 return this.data.navigate(['/about/first-page/private-chat'], {queryParams: {temp1 :this.temp1,name1 :this.name1}}); // pass object for collection Users :this.Users,
//  console.log(this.nkey);
//  console.log(this.nPrice);
//  console.log(this.nPrice);

 }

  ngOnInit() {
  }

}
