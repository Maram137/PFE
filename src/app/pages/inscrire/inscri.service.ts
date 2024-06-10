import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InscriService {

  constructor(private http: HttpClient, private router: Router) { }

  ajouter(p:any,email:any) {
    return this.http.post<boolean>('http://localhost:8080/participation/ajouter?email='+email,p,{});
  }


  afficher() {
    return this.http.get<boolean>('http://localhost:8080/participation/afficher',{});
  }
  participationbyemail() {
    return this.http.get<boolean>('http://localhost:8080/participation/participationbyemail?email='+localStorage.getItem("Email"),{});
  }


  afficherbyid(id:any) {
    return this.http.get<boolean>('http://localhost:8080/participation/afficherbyid?id='+id,{});
  }
  archiver(id:any) {
    return this.http.post<boolean>('http://localhost:8080/participation/archiver?id='+id,{});
  }

}
