import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth/auth.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
      AuthComponent,
      RegisterComponent
    ],
    imports: [
      CommonModule,
      PagesRoutingModule,
      ReactiveFormsModule
    ],
    exports : [AuthComponent],
  })
  export class PagesModule { }