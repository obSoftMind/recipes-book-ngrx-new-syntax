import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";


@Component({
  selector: 'app-auth',
  templateUrl:'./auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string;
  constructor(private authService: AuthService, private router: Router){}

  onSwitchMode(){
   this.isLoginMode = !this.isLoginMode;
  }

  onAuthSubmit(form: NgForm){
    let authObs : Observable<AuthResponseData>;
    if(!form.valid){
      return;
    }
    this.isLoading = true;
    if(this.isLoginMode){
      authObs =this.authService.login(form.value.email, form.value.password);
    }else{
      authObs = this.authService.signup(form.value.email, form.value.password);
    }
    authObs.subscribe(
      {
        next: resData => {  
          console.log(resData),
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        error: errorMessage => {
         this.error = errorMessage;
          this.isLoading = false;
        }
      }
    );
    form.reset();
  }

  onHAndleError(){
    this.error=null;
  }
}