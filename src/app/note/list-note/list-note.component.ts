import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from '../../core/services/services.service';
import { api as apiConfig } from '../../core/configs/constants';
import { Etudiant } from '../../core/models/etudiant';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NotificationService } from '../../core/notification.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
// To Export Image
import html2canvas from 'html2canvas';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-note',
  templateUrl: './list-note.component.html',
  styleUrl: './list-note.component.scss'
})
export class ListNoteComponent implements OnInit{

  public listeEtudiantOfParcours: any;
  public evaluations : any;
  public listeAnnees: any;
  public listeParcours: any;
  public listeCoursDept: any;
  public parcoursNivAndOpt: any;
  public listeDepartements: any;
  // Single List
  public singleCours: any;
  public singleParcours:any;
  public singleEva:any;
  public listeMemoires: any;



  constructor(private AdminService:ServicesService, private notification:NotificationService, private router: Router) { }

  // ======================region search student by filter ================

  // form controls

  public errorMessages = {
    required: 'Ce champ est requis.',
  };

  form!: FormGroup;
  onForm() {
    this.form = new FormGroup({
      departement: new FormControl('', [Validators.required]),
      parcours: new FormControl('', [Validators.required]),
      annee: new FormControl('', [Validators.required]),
    })
  }
  submitted = false;
  userId: any;
  // departement
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
    
   // Gerer l'etat du champs departement
   onDepartementChange(): void {
    const selectedDepartementValue = this.form.controls['departement'].value;
    const selectedDepartementCode = selectedDepartementValue !== null ? selectedDepartementValue : '';
  
    // Calls functions to updates liste des parcours et cours en fonction du département sélectionné
    this.getAllParcoursDept(selectedDepartementCode);
  }
  

  
  getAllParcoursDept(departementCode: string) {
    this.listeParcours = [];
    const url = apiConfig.admin.parcours.getAllByDept(departementCode);
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


    getAllMemoires() {
      this.listeMemoires = [];
      const url = `${apiConfig.admin.memoire.getAll}`;
      this.AdminService.getResources(url).subscribe(
        (data) => {
          this.listeMemoires = data.body;
          console.log(this.listeMemoires);
        },
        (err) => {
          console.log('erreur', err.error.message);
        }
      );
    }

  
    //End Single List
  
    ngOnInit(): void {
      
      this.onForm();
      this.getAllAnnee();
      this.getAllDepartments();
      this.getAllMemoires();
     
     
       
      // Observ state of control of département
       this.form.controls['departement'].valueChanges
       .pipe(
         takeUntil(this.unsubscribe$),  // Détruire l'abonnement lorsque le composant est détruit
         debounceTime(300),  // Délai de débordement pour éviter des appels excessifs
         distinctUntilChanged()  // Observer uniquement les changements distincts
       )
       .subscribe((selectedDepartementValue) => {
         const selectedDepartementCode = selectedDepartementValue !== null ? selectedDepartementValue : '';
        //Call functions concerned
         this.getAllParcoursDept(selectedDepartementCode);
       });

  
  
   
    }
  
     // Detruit les observables
     private unsubscribe$ = new Subject<void>();
  
     ngOnDestroy(): void {
       this.unsubscribe$.next();
       this.unsubscribe$.complete();
     }
    
  


  submit() {
    if (this.form.valid) {
      this.submitted = true;
      this.listeMemoires = [];
      const formValue = this.form.controls;

      // variables of form
     const anneeAca: number = formValue['annee'].value|| '';
     const parcours: string = formValue['parcours'].value || '';

      // List PV of student
      const url = apiConfig.admin.memoire.getAllByCoursAndAnnee(
        parcours,
        anneeAca
      );
    
      console.log(url);

      this.AdminService.getResources(url).subscribe(
        (data) => {
          this.listeMemoires = data.body;
          console.log(this.listeMemoires);

        },
        (err) => {
          console.log('erreur', err.error.message);
        }
      );
    } 
  }


  



}
