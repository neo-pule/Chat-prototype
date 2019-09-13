import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FirstPagePage } from './first-page.page';

const routes: Routes = [
  {
    path: '',
    component: FirstPagePage,
    children : [
      { 
        path: 'chat',
         loadChildren: '../pages/chat/chat.module#ChatPageModule' 
      } ,
      { 
        path: 'profile',
        loadChildren: '../pages/profile/profile.module#ProfilePageModule' 
      },
      { 
        path: 'private-chat', 
        loadChildren: '../pages/private-chat/private-chat.module#PrivateChatPageModule' 
    }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FirstPagePage]
})
export class FirstPagePageModule {}
