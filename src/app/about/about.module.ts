import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AboutPage } from './about.page';

const routes: Routes = [
  {
    path: '',
    component: AboutPage,
    children: [
      { 
        path: 'home',
       loadChildren: '../home/home.module#HomePageModule' 
      },
      { 
        path: 'first-page',
       loadChildren: '../first-page/first-page.module#FirstPagePageModule' 
      },
      { path: 'on-chat',
       loadChildren: '../pages/on-chat/on-chat.module#OnChatPageModule'
       },
      {
        path : '',
        redirectTo:'/about/first-page'
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
  declarations: [AboutPage]
})
export class AboutPageModule {}
