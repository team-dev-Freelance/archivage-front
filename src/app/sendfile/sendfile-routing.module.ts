import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSendfileComponent } from './form-sendfile/form-sendfile.component';
import { ListSendfileComponent } from './list-sendfile/list-sendfile.component';

const routes: Routes = [
  
  {
    path: "listsendfiles",
    component: ListSendfileComponent
  },
  {
    path: "newsendfile",
    component: FormSendfileComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendFileRoutingModule { }
