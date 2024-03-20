import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNoteComponent } from './list-note/list-note.component';
import { FormNoteComponent } from './form-note/form-note.component';

const routes: Routes = [
  
  {
    path: "listenote",
    component: ListNoteComponent
  },
  {
    path: "nouvelle",
    component: FormNoteComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
