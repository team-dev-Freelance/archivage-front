import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { api as apiConfig } from '../../core/configs/constants';
import { ServicesService } from '../../core/services/services.service';

import { NotificationService } from '../../core/services/notification.service';
import { Jury } from '../../core/models/jury';
import { log } from 'console';

@Component({
  selector: 'app-jury-form',
  templateUrl: './jury-form.component.html',
  styleUrl: './jury-form.component.scss'
})

export class JuryFormComponent implements OnInit {
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  form!: FormGroup;
  title = "Nouveau jury"
  btnTitle = "Ajouter"
  nameSlug!: string

  submitted = false;
  

  constructor(
    private AdminService: ServicesService, private notification:NotificationService,
    private router: Router, private route: ActivatedRoute
   ) { }

  ngOnInit(): void {
    this.createForm();

    this.nameSlug = this.route.snapshot.params['slug'];
    console.log(this.nameSlug);
    
    if (this.nameSlug) {
      this.title = "Mise à  jour jury"
      this.btnTitle = "Mise à jour"
      var str = decodeURIComponent(this.nameSlug).split('%');
      console.log(str);
      
      this.form.setValue(
        {
          name: str[1],
          statut: str[2],
          grade:str[3],
        }
      )
    }
  }
  


  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      statut: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
    });
  }


  onSubmit() {
  //   this.submitted = true;
    if (this.form.valid) {
      if (this.nameSlug == null) {    
        var annee: any = {
          name: this.form.value.name,
          statut: this.form.value.statut,
          grade: this.form.value.grade
        }
        // Save datas create user in database
        const url = `${apiConfig.admin.jury.create}`;

        this.AdminService.saveResource(url, annee).subscribe(
          {
            next: () => {
            console.log( this.notification.record);
            this.notification.record()
            this.router.navigate(['administrator/jury']);
            },
            error: () => {
              this.notification.error()

            }
          }
        );
      }
      else{
        var str = decodeURIComponent(this.nameSlug).split('%');
        var jury: Jury = {
          name: this.form.value.name,
          statut: this.form.value.statut,
          grade: this.form.value.grade,
          id: parseInt(str[0])
        }
        const url = `${apiConfig.admin.jury.update}`;
        this.AdminService.updateResource(url + jury.id, jury).subscribe(
          {
            next: res => {
              this.notification.update()
              this.router.navigate(['administrator/jury']);
            },
            error: err => {
              this.notification.error()
            }
          }
        );
      }
    }


}

}
