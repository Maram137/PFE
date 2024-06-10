import { Component } from '@angular/core';
import { AgendaService } from './agenda.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component {
  agendaform!:FormGroup ; 
  selectedFile!: File;
  selectedFile2!: File;

  allagenda:any ;
  id:any ;
  agenda:any ;
  im:any ;
  show:any ;
  amodifgendaform!:FormGroup
constructor(private service : AgendaService,private fb: FormBuilder,public sanitizer: DomSanitizer){}
ngOnInit(){
  this.agendaform = this.fb.group({
    show: [false, Validators.required],

  })
  this.amodifgendaform = this.fb.group({
    show: ['', Validators.required],

  })
this.service.afficher().subscribe((res)=>{
  this.allagenda = res; 
})
}
public onFileChanged(event:any) {
  this.selectedFile = event.target.files[0];
}
ajouter(){
  const uploadImageData = new FormData();
  uploadImageData.append(
    'image',
    this.selectedFile,
    this.selectedFile.name
  );
  this.service.ajouter(uploadImageData, this.agendaform.value.show).subscribe(
 (result) => {
        window.alert("'Agenda successful !', 'Success'"); 

        window.location.reload();
      
    },
    (error) => {
      window.alert("Verify contact information.");
    }
  );
}
modif(){
  if(this.selectedFile2==null){
    this.service.modifier(this.id,this.amodifgendaform.value.show).subscribe(
      (result) => {
             window.alert("'Agenda successfully modified !', 'Success'");
             window.location.reload();
           
         },
         (error) => {
           window.alert("Verify contact information.");
         }
       );

  }
  const uploadImageData = new FormData();
  uploadImageData.append(
    'image',
    this.selectedFile2,
    this.selectedFile2.name
  );
  this.service.modifier2(this.id,this.amodifgendaform.value.show,uploadImageData).subscribe(
 (result) => {
        window.alert("'Agenda successfully modified !', 'Success'");
        window.location.reload();
      
    },
    (error) => {
      window.alert("Verify contact information.");
    }
  );}

public onFileChanged2(event:any) {
  this.selectedFile2 = event.target.files[0];
}
delete(id:any){
this.id=id ; 
}
supprimer(){
  this.service.supprimer(this.id).subscribe((res)=>{
    window.alert("Agenda successfully deleted")
    window.location.reload()
  })
}
update(id:any){
  this.id = id;
  this.service.afficherbyid(id).subscribe((res)=>{
    this.agenda=res ;
    this.im=this.agenda.image
    this.show=this.agenda.show
  })
}
}
