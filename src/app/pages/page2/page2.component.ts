import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembreService } from './membre.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component {
  membreform!:FormGroup;
  membreform2!:FormGroup;

  selectedFile!: File;
  selectedFile2!: File;

  allmembre:any ;
  id:any ;
  membre :any ; 
  p:any;
  n:any ;
  i:any;
  show:any ;
  constructor(private fb: FormBuilder,private service : MembreService,public sanitizer: DomSanitizer){}
  ngOnInit(){
    this.service.afficher().subscribe((res)=>{
      this.allmembre =res ; 
    })
    this.membreform = this.fb.group({
      position: ['', Validators.required],
      name: ['', Validators.required],
      show: [false, Validators.required],

    })
    this.membreform2 = this.fb.group({
      position: ['', Validators.required],
      name: ['', Validators.required],
      show: ['', Validators.required],

    })

  }
  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }

  
  public onFileChanged2(event:any) {
    this.selectedFile2 = event.target.files[0];
  }


  edit(id:any){
    this.id=id ; 
    this.service.afficherbyid(id).subscribe((res)=>{
      this.membre=res ;
      this.p=this.membre.position
      this.n=this.membre.name
      this.i=this.membre.image
      this.show=this.membre.show ;
    })
  }

delete(id:any){
  this.id=id ;
}
supprimer(){
  
  this.service.supprimer(this.id).subscribe((res)=>{
    window.alert("Deletion Successful")
    window.location.reload()
  })
}
  modif(){
if(this.selectedFile2==null){
  this.service.update(this.id,this.membreform2.value.name,this.membreform2.value.position,this.membreform2.value.show).subscribe((res)=>{
    window.alert("Modification Successful")
    window.location.reload()
  })

}
else{
  const uploadImageData = new FormData();
  uploadImageData.append(
    'image',
    this.selectedFile2,
    this.selectedFile2.name
  );
  this.service.update2(this.id,this.membreform2.value.name,this.membreform2.value.position,uploadImageData,this.membreform2.value.show).subscribe((res)=>{
    window.alert("Modification Successful")
    window.location.reload()

  })
}
  }

  ajouter(){
    const uploadImageData = new FormData();
    uploadImageData.append(
      'image',
      this.selectedFile,
      this.selectedFile.name
    );
    this.service.ajouter(this.membreform.value.position,this.membreform.value.name,uploadImageData,this.membreform.value.show).subscribe((res)=>{
      window.alert("Member Added Successfully")
      window.location.reload()
    }), (error:any) => {
      window.alert("Verify the fields.");
    }
  }
}
