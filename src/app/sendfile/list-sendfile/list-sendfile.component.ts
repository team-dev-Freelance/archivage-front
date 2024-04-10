import { Component, OnInit } from '@angular/core';
// Export
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
// To Export Image
import html2canvas from 'html2canvas';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { Router } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { Parcours } from '../../core/models/parcours';
import { ServicesService } from '../../core/services/services.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-list-sendfile',
  templateUrl: './list-sendfile.component.html',
  styleUrl: './list-sendfile.component.scss'
})


export class ListSendfileComponent implements OnInit {

  allBoiteFichier!:any
  constructor(private notification:NotificationService, private adminService: ServicesService, private router: Router) {

  }

  ngOnInit(): void {

    const userId = sessionStorage.getItem('userId');
    const url = `${apiConfig.admin.user.getOneId}`;
    console.log(url);
    
    this.adminService.getResources(url+ userId).subscribe({
      next: res => {
        localStorage.setItem('nom',res.body.nom)
        localStorage.setItem('email',res.body.email)

      },
    });

    this.boiteFichier();
  }


  boiteFichier() {
    const userId = sessionStorage.getItem('userId');
    const url = `${apiConfig.admin.fichier.getFileListByUser}`;
    console.log(url);
    
    this.adminService.getResources(url + userId ).subscribe({
      next: res => {
        this.allBoiteFichier = res.body;
        console.log(this.allBoiteFichier);
      
      },
    });
  }


  remove(arg: any) {

    const url = `${apiConfig.admin.fichier.deleteFile}`;
    this.adminService.deleteResource(url , arg ).subscribe({
      next: res => {
       this.notification.record();
        window.location.reload()
      },
      error :err  =>{
       this.notification.error();
        // alert("Suppression faites")
        window.location.reload()
        
      }
    });
    }



  // end region
}

