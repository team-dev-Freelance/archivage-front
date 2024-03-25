import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/pages/auth/auth.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "administrator",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: "login",
    component:AuthComponent
  },
  {
    path: "etudiant",
    loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule)
  },
  {
    path: "notes",
    loadChildren: () => import('./note/note.module').then(m => m.NoteModule)
  },
  {
    path: "sendfile",
    loadChildren: () => import('./sendfile/sendfile.module').then(m => m.SendFileModule)
  },
  // Définir la redirection par défaut vers la page de login
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
