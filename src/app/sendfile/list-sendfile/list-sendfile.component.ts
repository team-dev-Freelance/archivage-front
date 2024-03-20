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

  allParcourss!: Parcours[]
  constructor(private notification:NotificationService, private adminService: ServicesService, private router: Router) {

  }

  ngOnInit(): void {
    this.getParcourss();

  }

  getParcourss() {
    const url = `${apiConfig.admin.parcours.getAll}`;
    this.adminService.getResources(url).subscribe(
      (data) => {
        this.allParcourss = data.body;
        console.log(this.allParcourss);
        
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }
  update(item: Parcours) {
    const encodedId = encodeURIComponent(item.id + "%" + item.label + "%" + item.niveau.id + "%" + item.option.id);
    this.router.navigate(['administrator/parcours/update/', encodedId]);
  }

  remove(arg: Number | undefined) {
    const url = `${apiConfig.admin.parcours.delete}`;
    if (arg) {
      this.adminService.deleteResource(url, arg).subscribe({
        next: res => {
          this.notification.remove()
          this.getParcourss()
        },
        error: err => {
          this.notification.remove()
          this.getParcourss()
          //this.toastr.error("Erreur survenir", 'Error');
 
        }

      })
    }
  }



  // end region
}

