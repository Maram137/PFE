import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../page1/agenda.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit{
  allagenda :any ;
  ag:any ;image:any ; 
  affiche :boolean=false ;
  agen:any ; 
  list:[]=[];
  constructor(private service : AgendaService,public sanitizer: DomSanitizer){}
  images = [
    'assets/images/Day-1.png',
    'assets/images/Day-2.png',
    'assets/images/Day-3.png',
    'assets/images/Day-4.png'
  ];
  selectedImage: string | undefined;

  selectDay(id:any) {
    this.affiche=true ;
    this.service.afficherbyid(id).subscribe((res)=>{
      this.ag =res ; 
      this.image = this.ag.image;

    })
  }
  ngOnInit() {
    this.service.afficher().subscribe((res)=>{
      this.allagenda =res ; 
      let list: any[] = [] ;
      this.allagenda.forEach((element:any) => {
        if(element.show){
          list.push(element);
        }  
        this.agen=list
      });
      
})
    // Afficher la première image dès l'initialisation du composant
   // this.selectedImage = this.images[0];
  }

}