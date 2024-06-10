import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MembreService {

  constructor(private http: HttpClient, private router: Router) { }

  
  ajouter(position: any,name:any,uploadImageData:any,show:any) {
    return this.http.post('http://localhost:8080/membre/ajouter?name='+name+"&position="+position+"&show="+show,uploadImageData,{});
  }
  update(id: any,name:any,position:any,show:any) {
    return this.http.post('http://localhost:8080/membre/modifier?id='+id+"&name="+name+"&position="+position+"&show="+show,{});
  }
  
  update2(id: any,name:any,position:any,uploadImageData:any,show:any) {
    return this.http.post('http://localhost:8080/membre/modifiers?id='+id+"&name="+name+"&position="+position+"&show="+show,uploadImageData,{});
  }
  afficher() {
    return this.http.get('http://localhost:8080/membre/afficher',{});
  }
  afficherbyid(id:any) {
    return this.http.get('http://localhost:8080/membre/afficherbyid?id='+id,{});
  }
  afficherlistevent(id:any) {
    return this.http.get('http://localhost:8080/event/afficherlistevent?id='+id,{});
  }
  supprimer(id:any) {
    return this.http.delete('http://localhost:8080/membre/supprimer?id='+id,{});
  }
}
