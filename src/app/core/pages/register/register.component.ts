import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { api as apiConfig } from '../../configs/constants';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authForm!: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notification:NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.authForm = new FormGroup({
      email: new FormControl(null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(\d{9}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
          ),
        ]),),
      password: new FormControl(null, Validators.required),
      // confirmPassword: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
    });
  }


  get f() {
    return this.authForm.controls;
  }



  onSubmit() {

    this.submitted = true;
    this.error = '';

    if (this.authForm.invalid) {
      this.error = 'E-mail and Password not valid !';
      console.log('E-mail and Password not valid !');
      this.submitted = false;
      return;
    }

    const data = {
      email: this.authForm.value['email'],
      //password: sha256(this.authForm.value['password']),
      password: this.authForm.value['password'],
      username: this.authForm.value['username'],
      role : 'ADMIN'
    };


    const url = `${apiConfig.auth.register}`;
    // Trying to connect user
    this.loading = true;
   
    this.authService.register(url,data).subscribe(
      (res) => {
        if (res) {
          this.loading = false;
          this.notification.record()
          this.router.navigate(['/login']);
        } else {
          this.loading = false;
          this.notification.error()
          this.error = 'Invalid Login';
        }
      },
      (error) => {
        this.error = error;
        this.submitted = false;
        console.log('error', error);
      }
    );
  }
}
