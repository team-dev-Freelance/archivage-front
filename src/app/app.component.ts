import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  // standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoginPage: boolean;
  isRegisterPage: boolean;
  isRootPage:boolean;


  constructor(private router: Router) {
    this.isLoginPage = this.router.url === '/login';
    this.isRegisterPage = this.router.url === '/register';
    this.isRootPage = this.router.url === '/';

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
        this.isRegisterPage = event.url === '/register';
        this.isRootPage = event.url === '/';

      }
    });
  }

}
