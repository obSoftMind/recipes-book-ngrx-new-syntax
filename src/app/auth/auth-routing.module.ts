import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";

const authRoute: Routes = [
  { path:'', component : AuthComponent}
]

@NgModule({
  imports:[RouterModule.forChild(authRoute)],
  exports:[RouterModule]
})
export class AuthRoutingModule {

}