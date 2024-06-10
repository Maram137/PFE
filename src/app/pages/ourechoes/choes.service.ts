import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoesService {

  constructor(private http: HttpClient, private router: Router) { }

  
  ajouter(position: any,name:any,description:any ,uploadImageData:any) {
    return this.http.post('http://localhost:8080/chose/ajouter?desciption='+description+'&name='+name+'&position='+position,uploadImageData,{});
  }



  supprimers(id:any) {
    return this.http.delete('http://localhost:8080/chose/supprimer?id='+id,{});
  }


  update(id: any,description:any) {
    return this.http.post('http://localhost:8080/chose/update?id='+id+"&description="+description,{});
  }
  
  update2(id: any,description:any,uploadImageData:any) {
    return this.http.post('http://localhost:8080/chose/update2?id='+id+"&description="+description,uploadImageData,{});
  }
  afficher() {
    return this.http.get('http://localhost:8080/chose/afficher',{});
  }
  afficherbyid(id:any) {
    return this.http.get('http://localhost:8080/chose/afficheryid?id='+id,{});
  }
  afficherlistevent(id:any) {
    return this.http.get('http://localhost:8080/event/afficherlistevent?id='+id,{});
  }
  supprimer(id:any) {
    return this.http.delete('http://localhost:8080/membre/supprimer?id='+id,{});
  }
}
