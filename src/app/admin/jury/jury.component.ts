import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ServicesService } from "../../core/services/services.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { api as apiConfig } from "../../core/configs/constants";
import { NotificationService } from '../../core/services/notification.service';
import { Jury } from '../../core/models/jury';



@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrl: './jury.component.scss'
})
export class JuryComponent implements OnInit {

  Jurys: any = [];
 // userId: string | null;

  constructor(
 
    private AdminService: ServicesService,
    private router: Router,
    private notification:NotificationService
  ) { }

  ngOnInit(): void {
    this.getAllJurys();
   // this.userId = sessionStorage.getItem('userId');
  }


  getAllJurys() {
    this.Jurys = [];
    console.log();
    
    const url = `${apiConfig.admin.jury.getAll}`;
  
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.Jurys = data.body;
        console.log(this.Jurys);
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  update(item: Jury) {
    const encodedId = encodeURIComponent(item.id + "%" + item.name + "%" + item.statut + "%" + item.grade);
    console.log(encodedId);
    
    this.router.navigate(['administrator/jury/update/', encodedId]);
  }

  remove(arg: Number | undefined) {

    const url = `${apiConfig.admin.jury.delete}`;
    console.log(url);
    if (arg) {
      this.AdminService.deleteResource(url, arg).subscribe({
        next: res => {
          this.notification.remove()
          this.getAllJurys()
        },
        error: err => {
          this.notification.remove()
          this.getAllJurys()
       
        }

      })
    }
  }


}
