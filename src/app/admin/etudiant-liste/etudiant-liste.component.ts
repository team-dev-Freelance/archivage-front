import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { api as apiConfig } from "../../core/configs/constants";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
// To Export Image
import html2canvas from 'html2canvas';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-etudiant-liste',
  templateUrl: './etudiant-liste.component.html',
  styleUrls: ['./etudiant-liste.component.css'],
  // standalone: true
})
export class EtudiantListeComponent implements OnInit {

  public listeEtudiant: any;
  public listeEtudiantOfParcours: any;
  public listeDepartements: any;
  public listeParcours: any;
  public listeAnnees: any;
  public parcoursDept: any;
  public parcoursNivAndOpt: any;

  public dtOptions: DataTables.Settings = {};
  //parcours datas
  private parcoursSubject = new Subject<any>();

  constructor(private AdminService: ServicesService,  private fb: FormBuilder, private router: Router,  private route: ActivatedRoute ) { }

// ======================region search student by filter ================

public errorMessages = {
  required: 'Ce champ est requis.',
};

form!: FormGroup
onForm() {
  this.form = new FormGroup({
    departement: new FormControl('', [Validators.required]),
    parcours: new FormControl('', [Validators.required]),
    annee: new FormControl('', [Validators.required])
  })
}


submitted = false;
userId: any;

getAllDepartments() {
  this.listeDepartements = [];
  const url = `${apiConfig.admin.departement.getAll}`;
  this.AdminService.getResources(url).subscribe(
    (data) => {
      this.listeDepartements = data.body;
      console.log(this.listeDepartements);
    },
    (err) => {
      console.log('erreur', err.error.message);
    }
  );
}



getAllAnnee() {
  this.listeAnnees = [];
  const url = `${apiConfig.admin.anneeAcademique.getAll}`;
  this.AdminService.getResources(url).subscribe(
    (data) => {
      this.listeAnnees = data.body;
      console.log(this.listeAnnees);
    },
    (err) => {
      console.log('erreur', err.error.message);
    }
  );
}

 // Gerer l'etat du champs departement
 onDepartementChange(): void {
  const selectedDepartementValue = this.form.controls['departement'].value;
  const selectedDepartementCode = selectedDepartementValue !== null ? selectedDepartementValue : '';

  // Appeler vos fonctions pour mettre à jour la liste des parcours et cours en fonction du département sélectionné
  this.getAllParcoursDept(selectedDepartementCode);
}

getAllParcoursDept(departementCode: string) {
  this.listeParcours = [];
  // const url = apiConfig.admin.parcours.getAllByDept(departementCode);
  const url = apiConfig.admin.parcours.getParcoursByDept+departementCode;
  console.log(url);
  
  // Utilisez directement le départementCode dans l'URL généré
  this.AdminService.getResources(url).subscribe(
    (data) => {
      this.listeParcours = data.body;
      console.log(this.listeParcours);
    },
    (err) => {
      console.log('erreur', err.error.message);
    }
  );
}


getParcoursByNivAndOpt(): void {
  const formValue = this.form.controls;

  const niveau: number = formValue['niveau'].value ? +formValue['niveau'].value : 0;
  const option: string = formValue['option'].value || '';

  const url = apiConfig.admin.parcours.getAllByNivAndOpt(
    niveau,
    option
  );

  // Appel de la fonction et émission du résultat à travers le sujet
  this.AdminService.getResourceMany(url, {}).subscribe(
    (parcoursData) => {
      this.parcoursSubject.next(parcoursData);
      console.log(parcoursData.body);
    },
    (err) => {
      console.log('Erreur lors de la récupération du parcours :', err.error.message);
    }
  );
}


getParcoursObservable(): Observable<any> {
  return this.parcoursSubject.asObservable();
}

submit() {
  if (this.form.valid) {
    this.submitted = true;
    this.listeEtudiantOfParcours = [];
     
    const formValue = this.form.controls;
  
   
   
    const parcours: string = formValue['parcours'].value  || '';
    const annee: number = formValue['annee'].value ? +formValue['annee'].value : 0;
    console.log(parcours, annee);

    const url = apiConfig.admin.etudiant.getAllByCoursAndAnnee(
      annee,
      parcours
    );

    console.log(url);
    
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.listeEtudiantOfParcours = data.body;
        console.log(this.listeEtudiantOfParcours);
      },
      (err) => {
        console.log('Erreur lors de la récupération des étudiants :', err.error.message);
      }
    );

  }
}  // end region


  ngOnInit(): void {

    this.onForm();
    //List
    this.getAllDepartments();
    this.getAllAnnee();

     // Observer les changements dans le contrôle de département
     this.form.controls['departement'].valueChanges
     .pipe(
       takeUntil(this.unsubscribe$),  // Détruire l'abonnement lorsque le composant est détruit
       debounceTime(300),  // Délai de débordement pour éviter des appels excessifs
       distinctUntilChanged()  // Observer uniquement les changements distincts
     )
     .subscribe((selectedDepartementValue) => {
       const selectedDepartementCode = selectedDepartementValue !== null ? selectedDepartementValue : '';
 
       // Appeler vos fonctions pour mettre à jour la liste des parcours sélectionné
       this.getAllParcoursDept(selectedDepartementCode);
     });

  }

   // Detruit les observables
   private unsubscribe$ = new Subject<void>();

   ngOnDestroy(): void {
     this.unsubscribe$.next();
     this.unsubscribe$.complete();
   }

  
//================== region exportation =================================

  public captureScreen() {
    let dataToExport = document.getElementById('contentToConvert');

    // Check if body is null
    if (!dataToExport) {
        console.error('Body element is null.');
        return;
    }

    html2canvas(dataToExport, { scale: 2 }).then(canvas => {
        let imgWidth = 100 * 2; // Multiplier par un facteur pour une meilleure résolution
        let pageHeight = 100 * 2; // Multiplier par un facteur pour une meilleure résolution
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

         // Ajuster les marges pour obtenir une symétrie
         let marginLeft = (210 - imgWidth) / 2; // Ajuster selon la largeur de la page A4 (210 mm)
         let marginRight = marginLeft;

        const contentDataURL = canvas.toDataURL('image/png', 1.0); // Ajouter une résolution DPI de 1.0

        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', marginLeft, 0, imgWidth, imgHeight);
        pdf.save('ListeEtudiants.pdf');
    });
  }

  // end region

}
