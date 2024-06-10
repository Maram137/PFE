import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private router: Router) { }

  
  ajouter(event: any,link:any,show:any,uploadImageData:any) {
    return this.http.post('http://localhost:8080/event/ajouter?event='+event+"&link="+link+"&show="+show,uploadImageData,{});
  }
  update(event: any,link:any,show:any,id:any) {
    return this.http.post('http://localhost:8080/event/update?event='+event+"&link="+link+"&show="+show+"&id="+id,{});
  }
  
  update2(event: any,link:any,show:any,id:any,uploadImageData:any) {
    return this.http.post('http://localhost:8080/event/update2?event='+event+"&link="+link+"&show="+show+"&id="+id,uploadImageData,{});
  }
  afficher() {
    return this.http.get('http://localhost:8080/event/afficher',{});
  }
  affichernyid(id:any) {
    return this.http.get('http://localhost:8080/event/affichernyid?id='+id,{});
  }
  archiver(id:any) {
    return this.http.post('http://localhost:8080/event/archiver?id='+id,{});
  }
  
  afficherlistevent(id:any) {
    return this.http.get('http://localhost:8080/event/afficherlistevent?id='+id,{});
  }

}
