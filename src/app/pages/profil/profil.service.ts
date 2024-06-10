import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient, private router: Router) { }


  afficherbyemmail() {
    return this.http.get('http://localhost:8080/users/affichagebyemail?email='+localStorage.getItem("Email"),{});
  }
  imagebyemail() {
    return this.http.get('http://localhost:8080/users/imagebyemail?email='+localStorage.getItem("Email"),{});
  }
  modif(id:any,user:any) {
    return this.http.put('http://localhost:8080/users/modif?id='+id,user,{});
  }
  modif2(id:any,user:any) {
    return this.http.put('http://localhost:8080/users/modif2?id='+id,user,{});
  }

}
