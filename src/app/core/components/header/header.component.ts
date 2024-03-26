import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private AuthService: AuthService, private notification: NotificationService, private router: Router) { }

  onSubmit() {
    this.AuthService.logout().subscribe((res) => {
      
        localStorage.clear();
        sessionStorage.clear();
        console.log(this.notification.record);
        this.notification.record()
          
        this.router.navigate(['/login']);
    },
    (error) => {

      this.notification.error()
      console.log('error', error);
    }); 
    }
    
  
}

