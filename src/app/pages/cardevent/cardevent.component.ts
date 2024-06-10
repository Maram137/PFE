import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from './event.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cardevent',
  templateUrl: './cardevent.component.html',
  styleUrls: ['./cardevent.component.css']
})
export class CardeventComponent {
  eventform!:FormGroup;
  eventmodifform!:FormGroup;
  selectedFile!: File;
  selectedFile2!: File;

  event:any ;
  eventbyid:any ;
  e:any;
  link:any;
  show:any ; 
  img:any ;
  id:any ;
constructor(private fb: FormBuilder,private service : EventService,public sanitizer: DomSanitizer){}
ngOnInit(){
  this.service.afficher().subscribe((res)=>{
    this.event = res ; 
  })
  this.eventform = this.fb.group({
    event: ['', Validators.required],
    link: ['', Validators.required],
    show: [false, Validators.required],
  })


  this.eventmodifform = this.fb.group({
    event: ['', Validators.required],
    link: ['', Validators.required],
    show: ['', Validators.required],
  })

}
public onFileChanged(event:any) {
  this.selectedFile = event.target.files[0];
}


public onFileChanged2(event:any) {
  this.selectedFile2 = event.target.files[0];
}
delete(id:any){
  this.id=id ; 
}
supprimer(){
  this.service.archiver(this.id).subscribe((res)=>{
    window.alert("Successfully deleted.")
    window.location.reload()
  })
}
edit(id:any){
  this.id=id ; 
  this.service.affichernyid(id).subscribe((res)=>{
    this.eventbyid=res ; 
    this.e=this.eventbyid.event ;
    this.link= this.eventbyid.link ; 
    this.show=this.eventbyid.show; 
    this.img=this.eventbyid.image; 
  })
}
modif(){
  if(this.selectedFile2==null){
    
    this.service.update(this.eventmodifform.value.event,this.eventmodifform.value.link,this.eventmodifform.value.show,this.id).subscribe(
      (result) => {
             window.alert("'Event Modified!', 'Success'");
             window.location.reload();
           
         },
         (error) => {
           window.alert("Verify coordinates.");
         }
       );    }
  else {
    const uploadImageData = new FormData();
    uploadImageData.append(
      'image',
      this.selectedFile2,
      this.selectedFile2.name
    );
    this.service.update2(this.eventmodifform.value.event,this.eventmodifform.value.link,this.eventmodifform.value.show,this.id,uploadImageData).subscribe(
   (result) => {
          window.alert("'Event Modified!', 'Success'");
          window.location.reload();
        
      },
      (error) => {
        window.alert("Verify coordinates.");
      }
    );  }
}
ajouter(){
  const uploadImageData = new FormData();
  uploadImageData.append(
    'image',
    this.selectedFile,
    this.selectedFile.name
  );
  this.service.ajouter(this.eventform.value.event,this.eventform.value.link,this.eventform.value.show,uploadImageData).subscribe(
 (result) => {
        window.alert("'Event successful !', 'Success'");
        window.location.reload();
      
    },
    (error) => {
      window.alert("Verify coordinates.");
    }
  );
}
}
