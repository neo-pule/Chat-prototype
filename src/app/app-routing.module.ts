import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  // { path: 'first-page', loadChildren: './first-page/first-page.module#FirstPagePageModule' },
  { path: 'sign-in', loadChildren: './pages/sign-in/sign-in.module#SignInPageModule' },
  { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' }
  // { path: 'on-chat', loadChildren: './pages/on-chat/on-chat.module#OnChatPageModule' },
  // { path: 'private-chat', loadChildren: './pages/private-chat/private-chat.module#PrivateChatPageModule' }
 
  // { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
