import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from '../../core/services/services.service';
import { api as apiConfig } from '../../core/configs/constants';
import { Etudiant } from '../../core/models/etudiant';
import { Observable, Subject, forkJoin, of } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, map, catchError } from 'rxjs/operators';
import { NotificationService } from '../../core/notification.service';
import { log } from 'console';


@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrl: './form-note.component.scss'
})

export class FormNoteComponent implements OnInit{
fileError: any;
submitted = false;
 

  onSelectFile($event: Event) {
  throw new Error('Method not implemented.');
  }

  public listeEtudiantOfParcours: any;
  public evaluations : any;
  public listeAnnees: any;
  public listeParcours: any;
  public listeCoursDept: any;
  public parcoursNivAndOpt: any;
  public listeDepartements: any;
  // Single List
  public listeJury: any;
  public jury:any;
  public anneeAca:any;
  public etudiant!: any;
  public memoireJson:any = []
  public selectedFile!: File ; 
  formData!: FormData;

  constructor(
     private AdminService:ServicesService,
     private notification:NotificationService,
     ) { }

  // ======================region search student by filter ================

  // form controls

  public errorMessages = {
    required: 'Ce champ est requis.',
  };

  form!: FormGroup;
  onForm() {
    this.form = new FormGroup({
      annee: new FormControl('', [Validators.required]),
      departement: new FormControl('', [Validators.required]),
      parcours: new FormControl('', [Validators.required]),
      theme: new FormControl('', [Validators.required]),
      keyworlds: new FormControl('', [Validators.required]),
     
      etudiant: new FormControl('', [Validators.required]),
      pjury: new FormControl('', [Validators.required]),
      examinateur: new FormControl('', [Validators.required]),
      rapporteur: new FormControl('', [Validators.required]),
      urlfile: new FormControl('', [Validators.required]),
    });

    this.formData = new FormData();
  }

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

 // departement
 getAllJury() {
  this.listeJury = [];
  const url = `${apiConfig.admin.jury.getAll}`;
  this.AdminService.getResources(url).subscribe(
    (data) => {
      this.listeJury = data.body;
      console.log(this.listeJury);
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



getAllEtudiantByParcours(parcoursLabel: string) {
  this.etudiant = [];
  const formValue = this.form.controls;
  const annee: number = formValue['annee'].value ? +formValue['annee'].value : 0;

  const url = apiConfig.admin.etudiant.getAllByCoursAndAnnee(
    annee,
    parcoursLabel
  );
  console.log(url);

  this.AdminService.getResources(url).subscribe(
    (data) => {
      this.etudiant = data.body;
      console.log(this.etudiant);
    },
    (err) => {
      console.log('erreur', err.error.message);
    }
  );
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

  getJuryById(id: any): Observable<any> {
    const url = `${apiConfig.admin.jury.getOne + id}`;
    return this.AdminService.getResources(url).pipe(
      map(data => data.body),
      catchError(error => {
        console.error('Erreur lors de la récupération du jury', error);
        return of(null); // Retourne une observable contenant null en cas d'erreur
      })
    );
  }
  


  //End Single List

  ngOnInit(): void {
    
    this.onForm();
    this.getAllAnnee();
    this.getAllJury();
    this.getAllDepartments();

     
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

     //Pour parcours
      this.form.controls['parcours'].valueChanges
      .pipe(
        takeUntil(this.unsubscribe$), 
        debounceTime(300),  
        distinctUntilChanged()
      )
      .subscribe((selectedParcoursValue) => {
        const selectedParcoursLabel = selectedParcoursValue !== null ? selectedParcoursValue : '';
  
        // Call function 
        this.getAllEtudiantByParcours(selectedParcoursLabel);
      });


 
  }

   // Detruit les observables
   private unsubscribe$ = new Subject<void>();

   ngOnDestroy(): void {
     this.unsubscribe$.next();
     this.unsubscribe$.complete();
   }


  //  submit() {
  //   if (this.form.valid) {
  //     const pjuryId = this.form.value.pjury;
  //     const examinateurId = this.form.value.examinateur;
  //     const rapporteurId = this.form.value.rapporteur;
  
  //     forkJoin([
  //       this.getJuryById(pjuryId),
  //       this.getJuryById(examinateurId),
  //       this.getJuryById(rapporteurId)
  //     ]).subscribe(([pjury, examinateur, rapporteur]) => {
  //       const memoire = {
  //         theme: this.form.value.theme,
  //         keyworlds: [this.form.value.keyworlds],
  //         etudiant: this.findEtudiantByMatricule(this.form.value.etudiant),
  //         jury: [pjury, examinateur, rapporteur],
  //         urlFile: this.form.value.urlfile
  //       };
  //       console.log(memoire);
        
  //       const url = `${apiConfig.admin.memoire.create}`;
  //       this.AdminService.saveResource(url, memoire).subscribe({
  //         next: res => {
  //           this.notification.record();
  //           this.form.reset();
  //         },
  //         error: err => {
  //           this.notification.error();
  //         }
  //       });
  //     });
  //   }
  // }

  public readUploadFile = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      this.selectedFile = e.target.files[0]; // Enregistrer le fichier sélectionné dans la variable
      console.log('Fichier sélectionné :', this.selectedFile);

     
      // return this.selectedFile;
    }
    return null;
  };
  

  //Upload datas
   
  uploadFileData(event: MouseEvent) {
    this.submitted = true;

    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
    
    var jury = [
      this.form.value.pjury,
      this.form.value.examinateur,
      this.form.value.rapporteur
    ]
    // // Convertir la liste de jury en JSON
    const juryJson = JSON.stringify(jury);

    // console.log("juryListe = ", juryJson);
  
     
    // // Ajouter les autres données du formulaire à formData

    this.formData.append('theme', this.form.value.theme);
    this.formData.append('etudiantId', this.form.value.etudiant);
    this.formData.append('juryId',  this.form.value.pjury);
    this.formData.append('juryId',  this.form.value.examinateur);
    this.formData.append('juryId',   this.form.value.rapporteur);
    this.formData.append('keyworlds', this.form.value.keyworlds);
    this.formData.append('file', this.selectedFile);

    // Output formData content
    this.formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });
    console.log('FormValue = :', this.form.value);
    console.log('Data to send:', this.formData);

    const url = `${apiConfig.admin.memoire.create}`;
    console.log(url);
    
    this.AdminService.saveResourceFile(url,  this.formData).subscribe(
      {
        next: res => {
          this.notification.record()
          this.form.reset();
        },
        error: err => {
          this.notification.error()

        }
      }
    ); 

  }
  
  
  
  findTypeAnneeById(arg: Number) {
    return this.listeAnnees.find((item: { numeroDebut: any; })  => arg === item.numeroDebut)
  }
  
  findcoursById(arg: string) {
    return this.listeCoursDept.find((item: { code: string; }) => arg === item.code)
  }

  findEtudiantByMatricule(matricule: string) {
    return this.etudiant.find((item: { matricule: string; }) => matricule === item.matricule)
  }
  findJuryById(id: any) {
    return this.listeJury.find((item: { id: any; }) => id === item.id)
  }

  findTypeEvaluationById(code: String) {
    return this.evaluations.find((item: { code: String; }) => code === item.code)
  }

}
