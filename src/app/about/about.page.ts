import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  pages = [
    {
      title: 'Home',
      url: '/about/home',
    
    },
    {
      title: 'first-page',
      url: '/about/first-page',
      
    },
    {
      title: 'on-chat',
      url: '/about/on-chat',
      
    }
  ]; 


  selectedPath = '';


  constructor(private router: Router) { 
    this.router.events.subscribe((event: RouterEvent) => {
     this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

}
