import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { ListNoteComponent } from './list-note/list-note.component';
import { FormNoteComponent } from './form-note/form-note.component';


@NgModule({
  declarations: [
    ListNoteComponent,
    FormNoteComponent,
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ timeOut: 6000 }),
  ]
})
export class NoteModule { }
