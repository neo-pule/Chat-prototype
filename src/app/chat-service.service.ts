import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

import { AngularFireModule } from '@angular/fire';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private itemDoc: AngularFirestoreDocument<Rooms>;
  constructor(private data :AngularFirestore ) { }


  temp;

  getInfo(){
    return this.data.collection('ChatRooM').snapshotChanges();
  }


  addData(item){
    this.temp = this.data.collection('ChatRoom').add(item).then(function(ref) {
      console.log("document was written with ID : "+ ref);
    }).catch(function(){
      console.log("error while processing ..")
    });
    
}
update(item){
 
  this.itemDoc = this.data.doc<Rooms>('users/' + item.uid);
  this.itemDoc.update(item);
  console.log("updated");
}

}