import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  alluser() {
    return this.http.get<boolean>('http://localhost:8080/users/afficher');
  }

  archiver(id:any) {
    return this.http.post('http://localhost:8080/users/archiver?id='+id,{});
  }

  alluser2() {
    return this.http.get<boolean>('http://localhost:8080/users/affichage2');
  }
  afficherbyid(id:any) {
    return this.http.get<boolean>('http://localhost:8080/users/afficherbyid?id='+id);
  }
  update(id:any,lastname:any , firstname:any,phone:any,email:any) {
    return this.http.put('http://localhost:8080/users/update?id='+id+"&lastname="+lastname+"&firstname="+firstname+"&phone="+phone+"&email="+email,{});
  }
  update2(id:any,lastname:any , firstname:any,phone:any,email:any,uploadImageData:any) {
    return this.http.put('http://localhost:8080/users/update2?id='+id+"&lastname="+lastname+"&firstname="+firstname+"&phone="+phone+"&email="+email,uploadImageData,{ observe: 'response',  reportProgress: true });
  }
  supprimer(id:any) {
    return this.http.delete<boolean>('http://localhost:8080/users/supprimer?id='+id);
  }

}
