import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth/auth.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [
      AuthComponent,
      RegisterComponent
    ],
    imports: [
      CommonModule,
      PagesRoutingModule
    ],
    exports : [AuthComponent],
  })
  export class PagesModule { }