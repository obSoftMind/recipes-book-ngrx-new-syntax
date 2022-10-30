import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable,tap, throwError } from "rxjs";
import { User } from "./user.model";
import { environment } from "../../environments/environment";
export interface AuthResponseData{
  idToken : string;
  email:	string;
  refreshToken:	string;	
  expiresIn:	string;
  localId : string;
  registered?: boolean
}

@Injectable({
  providedIn : 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer : any
  BASE_URL_SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`;
  BASE_URL_SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`;

  constructor(private httpClient: HttpClient, private router : Router){}

  signup(email : string, password: string): Observable<AuthResponseData>{
    return this.httpClient.post<AuthResponseData>(this.BASE_URL_SIGNUP,
      { 
        email, 
        password, 
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email,resData.localId, resData.idToken, +resData.expiresIn)
       })
    )
  }
 
  login(email : string, password: string): Observable<AuthResponseData>{
    return this.httpClient.post<AuthResponseData>(this.BASE_URL_SIGNIN,
      { 
        email, 
        password, 
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
       this.handleAuthentication(resData.email,resData.localId, resData.idToken, +resData.expiresIn)
      })
    )
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn : number){
    let expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email,userId,token,expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin(){
    let userData:  { 
      email : string, 
      id: string; 
      _token:string; 
      _tokenExpirationDate:string
    }  = JSON.parse(localStorage.getItem('userData'));

    if(!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date( userData._tokenExpirationDate));
    
    if(loadedUser.token){
      this.user.next(loadedUser);
      this.autoLogout( new Date( userData._tokenExpirationDate).getTime() - new Date().getTime())
    }
  }

  autoLogout(expirationDuration : number){
    this.tokenExpirationTimer = setTimeout( () => {
      this.logout();
    },expirationDuration);

  }

  private handleError(errorRes : HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'
    if(!errorRes.error || !errorRes.error.error){
      return throwError(()=> errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage=`this email exists already`;
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage=`this email does not exists`;
        break;
      case 'INVALID_PASSWORD':
        errorMessage=`this email is not valid`;
        break;
    }
    return throwError(()=> errorMessage); 
  }
}