import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class sponsorService {

  private baseUrl = 'http://localhost:8080/sponsors';

  constructor(private http: HttpClient) {}

  ajouter(uploadImageData2: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/ajouter`, uploadImageData2);
  }



  updateim1(uploadImageData2: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateim1`, uploadImageData2);
  }updateim2(uploadImageData2: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateim2`, uploadImageData2);
  }updateim(uploadImageData2: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateim`, uploadImageData2);
  }
  updateim3(uploadImageData2: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateim3`, uploadImageData2);
  }

  afficher():  Observable<any[]>{
    return this.http.get<any[]>('http://localhost:8080/sponsors/afficher',{});
  }

  update(id: any,name:any,position:any) {
    return this.http.post('http://localhost:8080/membre/modifier?id='+id+"&name="+name+"&position="+position,{});
  }
  
  update2(id: any,name:any,position:any,uploadImageData:any) {
    return this.http.post('http://localhost:8080/membre/modifiers?id='+id+"&name="+name+"&position="+position,uploadImageData,{});
  }
  afficherbyid(id:any) {
    return this.http.get('http://localhost:8080/sponsors/afficherbyid?id='+id,{});
  }
  afficherlistevent(id:any) {
    return this.http.get('http://localhost:8080/event/afficherlistevent?id='+id,{});
  }
  supprimer(id:any) {
    return this.http.delete('http://localhost:8080/sponsors/supprimer?id='+id,{});
  }
}
