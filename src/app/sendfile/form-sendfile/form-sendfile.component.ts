import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { ServicesService } from '../../core/services/services.service';
import { Departement } from '../../core/models/departement';
import { NotificationService } from '../../core/services/notification.service';
import { log } from 'console';

@Component({
  selector: 'app-form-sendfile',
  templateUrl: './form-sendfile.component.html',
  styleUrl: './form-sendfile.component.scss'
})
export class FormSendfileComponent implements OnInit {
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  selectedFile?: File;
  users!: any[]
  form!: FormGroup
  id: any;
  userMail = localStorage.getItem('email');
  formData!: FormData;

  
  constructor(private notification:NotificationService,  private AdminService: ServicesService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {

    this.onForm()
    this.allUsers()
 
  }

  onForm() {
    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      emailExpediteur: new FormControl('', [Validators.required]),
    })
    this.formData = new FormData()
  }

  allUsers() {
    const url = `${apiConfig.admin.user.getAll}`;
    this.AdminService.getResources(url).subscribe({
      next: res => {
        this.users = res.body;
        console.log(this.users);
        
      },
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log("selectedFile =", file);
    
    this.formData.append('file', file);

  }


  submit() 
  {

    const userId:any = sessionStorage.getItem('userId');
    console.log(userId);
    
    const authToken = sessionStorage.getItem('accessToken');
 

    this.formData.append('nom', this.form.value.nom);
    this.formData.append('emailExpediteur', this.form.value.emailExpediteur);
    this.formData.append('userId', userId);
   
    this.formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });

    console.log(authToken);
   
   
    const url = `${apiConfig.admin.fichier.create}`;
    console.log(url);
  
    this.AdminService.saveResourceFile(url, this.formData).subscribe(
    (response) => {
      // console.log('Fichier téléchargé avec succès', response);
      this.notification.record()
      this.form.reset
    },
    (error) => {
      console.error('Erreur lors du téléchargement du fichier', error);
      this.notification.error()
      //  alert("Error")
    }
  )

  }


  findUserIdById(id: number) {
    return this.users.find(item => id === item.id)!
  }

}
