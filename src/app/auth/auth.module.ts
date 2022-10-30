import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations:[AuthComponent],
  imports:[
    FormsModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
 
}