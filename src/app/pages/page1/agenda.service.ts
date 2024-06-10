import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient, private router: Router) { }

  
  ajouter(uploadImageData:any,show:any  ) {
    return this.http.post('http://localhost:8080/agenda/ajouter?show='+show,uploadImageData,{});
  }

  afficher() {
    return this.http.get('http://localhost:8080/agenda/afficher',{});
  }
  afficherbyid(id:any) {
    return this.http.get('http://localhost:8080/agenda/afficherbyid?id='+id,{});
  }
  supprimer(id:any) {
    return this.http.delete('http://localhost:8080/agenda/supprimer?id='+id,{});
  }
  modifier(id:any,show:any) {
    return this.http.post('http://localhost:8080/agenda/modifier?id='+id+"&show="+show,{});
  }
  modifier2(id:any,show:any,uploadimage:any ) {
    return this.http.post('http://localhost:8080/agenda/modifier2?id='+id+"&show="+show,uploadimage,{});
  }
}
