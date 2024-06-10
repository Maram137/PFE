import { Component } from '@angular/core';
import { EventService } from '../cardevent/event.service';
import { InscriService } from '../inscrire/inscri.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event2 } from './event';

@Component({
  selector: 'app-participations',
  templateUrl: './participations.component.html',
  styleUrls: ['./participations.component.css']
})
export class ParticipationsComponent {
  allevent:any
  allpart :any ; 
  inscri!:FormGroup;
  event:any ;
  selectedOptions: string[] = [];
  p:any ;
  email:any ; 
  presence :any ;
  eventchois :any ;
  id:any ;
  e:any ;
  show:any ;
  events: Event[] = [];
  selectedEvent!: { id: number, event: string };
constructor(private service : EventService,private inscriservice : InscriService,private fb: FormBuilder,
  private serviceevent:EventService,private service2 : InscriService){}
ngOnInit(){

  this.inscri= this.fb.group({
    email: ['', Validators.required],
    presence: ['', Validators.required],
    activity:['', Validators.required],
    goal:['', Validators.required],
  })
,  this.serviceevent.afficher().subscribe((res)=>{
    this.event=res; 
  })


  this.service.afficher().subscribe((res)=>{
    this.allevent=res ; 
  })
  this.inscriservice.afficher().subscribe((res)=>{
    this.allpart=res ;
  })
}
onCheckboxChange(event: Event): void {
  const checkbox = event.target as HTMLInputElement;
  if (checkbox.checked) {
    this.selectedOptions.push(checkbox.value);
  } else {
    const index = this.selectedOptions.indexOf(checkbox.value);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    }
  }
}
enregistrer(){
    
  const objectArray = this.selectedOptions.map(item => ({ id: item }));
  
let p  ={
activite: this.inscri.value.activity,
goal:  this.inscri.value.goal,
presence:  this.inscri.value.presence,
liste:objectArray
}
this.service2.ajouter(p,this.inscri.value.email).subscribe((res)=>{
if(res){
window.alert("Successfully saved")
window.location.reload()
}
else{
window.alert("The email does not exist")
}
})


}


delete(id:any){
this.id=id ; 
}
archiver(){
  this.service2.archiver(this.id).subscribe((res)=>{
    window.alert("Archived Successfully")
    window.location.reload()
  })
}
edit(id:any){
  this.inscriservice.afficherbyid(id).subscribe((res)=>{
    this.p=res ;
    this.email=this.p.user.email
    this.presence=this.p.presence
  })
  
  this.service.afficherlistevent(id).subscribe((res)=>{
    this.eventchois=res;
    
 

  })
}

}
