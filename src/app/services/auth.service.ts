import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) { }

  signUp(first_name: any,last_name:any,email:any,password:any,phone_number:any,country:any,civility:any,role:any ,uploadImageData:any) {
    return this.http.post('http://localhost:8080/auth/signup?first_name='+first_name+"&last_name="+last_name
    +"&email="+email+"&password="+password+"&phone_number="+phone_number+"&country="+country+"&civility="+civility+"&role="+role, uploadImageData,
    { observe: 'response',  reportProgress: true });
  }
  
  
  
  
  signUp2(first_name: any,last_name:any,email:any,password:any,phone_number:any,country:any,civility:any,role:any ) {
    return this.http.post('http://localhost:8080/auth/signup2?first_name='+first_name+"&last_name="+last_name
    +"&email="+email+"&password="+password+"&phone_number="+phone_number+"&country="+country+"&civility="+civility+"&role="+role,{});
  }
  
  signIn(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:8080/auth/login2', user);
  }

  profile(token:any): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set("Authorization", 'Bearer ' + token);
    return this.http.get<boolean>('http://localhost:8080/api/v1/auth/profile', {headers:headers});
  }
  logout() {
    // Actions de déconnexion (comme effacer le token, etc.)
    localStorage.removeItem('authToken');

    // Redirection vers la page "account"
    this.router.navigate(['/account']); // Assurez-vous que '/account' est la route vers la page "account"
}

}
