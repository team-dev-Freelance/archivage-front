import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendFileRoutingModule } from './sendfile-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { FormSendfileComponent } from './form-sendfile/form-sendfile.component';
import { ListSendfileComponent } from './list-sendfile/list-sendfile.component';


@NgModule({
  declarations: [
    FormSendfileComponent,
    ListSendfileComponent,
  ],
  imports: [
    CommonModule,
    SendFileRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ timeOut: 6000 }),
  ]
})
export class SendFileModule { }
