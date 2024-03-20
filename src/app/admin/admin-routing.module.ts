import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { NiveauComponent } from './niveau/niveau.component';
import { NiveauFormComponent } from './niveau-form/niveau-form.component';
import { ParcoursComponent } from './parcours/parcours.component';
import { ParcoursFormComponent } from './parcours-form/parcours-form.component';

import { DepartementFormMultipleComponent } from './departement-form-multiple/departement-form-multiple.component';
import { FiliereFormMultipleComponent } from './filiere-form-multiple/filiere-form-multiple.component';
import { CycleFormMultipleComponent } from './cycle-form-multiple/cycle-form-multiple.component';

import { NiveauFormMultipleComponent } from './niveau-form-multiple/niveau-form-multiple.component';

import { ParcoursFormMultipleComponent } from './parcours-form-multiple/parcours-form-multiple.component';

import { EtudiantListeComponent } from './etudiant-liste/etudiant-liste.component';

import { AnneeAcademiqueFormComponent } from './annee-academique-form/annee-academique-form.component';
import { AnneeAcademiqueComponent } from './annee-academique/annee-academique.component';
import { CycleFormComponent } from './cycle-form/cycle-form.component';
import { CycleComponent } from './cycle/cycle.component';
import { DepartementFormComponent } from './departement-form/departement-form.component';
import { DepartementComponent } from './departement/departement.component';
import { FiliereFormComponent } from './filiere-form/filiere-form.component';
import { FiliereComponent } from './filiere/filiere.component';

import { NotesListeComponent } from './notes-liste/notes-liste.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "departement",
    children: [
      {
        path: "",
        component: DepartementComponent
      },
      {
        path: "nouveau",
        component: DepartementFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: DepartementFormMultipleComponent
      },
      {
        path: "update/:slug", //update
        component: DepartementFormComponent
      },

    ]
  },
  {
    path: "anneeacademique",
    children: [
      {
        path: "",
        component: AnneeAcademiqueComponent
      },
      {
        path: "nouveau",
        component: AnneeAcademiqueFormComponent
      },
      {
        path: "update/:slug", //update
        component: AnneeAcademiqueFormComponent
      },
    ]
  },
 

  {
    path: "filiere",
    children: [
      {
        path: "",
        component: FiliereComponent
      },
      {
        path: "nouveau",
        component: FiliereFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: FiliereFormMultipleComponent
      },
      {
        path: "update/:slug", //update
        component: FiliereFormComponent
      },
    ]
  },
  {
    path: "cycle",
    children: [
      {
        path: "",
        component: CycleComponent
      },
      {
        path: "nouveau",
        component: CycleFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: CycleFormMultipleComponent
      },
      {
        path: "update/:slug", //update
        component: CycleFormComponent
      },
    ]
  },
 
  {
    path: "niveau",
    children: [
      {
        path: "",
        component: NiveauComponent
      },
      {
        path: "nouveau",
        component: NiveauFormComponent
      }
      ,
      {
        path: "enregisrement/multiple",
        component: NiveauFormMultipleComponent
      },
      {
        path: "update/:slug", //update
        component: NiveauFormComponent
      },
    ]
  },
  {
    path: "parcours",
    children: [
      {
        path: "",
        component: ParcoursComponent
      },
      {
        path: "nouveau",
        component: ParcoursFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: ParcoursFormMultipleComponent
      },
      {
        path: "update/:slug", //update
        component: ParcoursFormComponent
      },
    ]
  },
 
 
 
  
  // region abdel
  {
    path: "etudiant",
    children: [
      {
        path: "liste",
        component: EtudiantListeComponent
      },
      
    ]
  },
 
  {
    path: "notes",
    children: [
      {
        path: "listenotesec",
        component: NotesListeComponent
      },
      
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
