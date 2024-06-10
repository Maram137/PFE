import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoesService } from './choes.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ourechoes',
  templateUrl: './ourechoes.component.html',
  styleUrls: ['./ourechoes.component.css']
})
export class OurechoesComponent {
  choeseform!:FormGroup;
  choese2form!:FormGroup;
  
  selectedFile!: File;
  selectedFile2!: File;

  allshoes:any ; 
  id:any ;
  choes:any;
  d:any ;
  ids:any ;
  i:any ;
  constructor(private fb: FormBuilder,private service : ShoesService,public sanitizer: DomSanitizer){}
  ngOnInit(){
    this.service.afficher().subscribe((res)=>{
      this.allshoes=res ;
    })
    this.choeseform = this.fb.group({
      position: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],

    })
    this.choese2form = this.fb.group({
      description: ['', Validators.required],

    })
  }
  supprimer(){
    this.service.supprimers(this.ids).subscribe((res)=>{
      window.alert("Successfully removed.")
      window.location.reload()
    })
  }
  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }
  public onFileChanged2(event:any) {
    this.selectedFile2 = event.target.files[0];
  }
  delete(id:any){
    this.ids=id ; 
  }
  edit(id:any){
    this.id=id ;
    this.service.afficherbyid(this.id).subscribe((res)=>{
      this.choes=res ; 
      this.i=this.choes.image;
      this.d=this.choes.description
    }) 
  }
  
update(){

if(this.selectedFile2==null){
  this.service.update(this.id,this.choese2form.value.description).subscribe((res)=>{
    window.alert("Modification Successful")
    window.location.reload()
  })
}
else {
  const uploadImageData = new FormData();
  uploadImageData.append(
    'image',
    this.selectedFile2,
    this.selectedFile2.name
  );
 
  this.service.update2(this.id,this.choese2form.value.description,uploadImageData).subscribe((res)=>{
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
        this.service.ajouter(this.choeseform.value.position,this.choeseform.value.name,this.choeseform.value.description,uploadImageData).subscribe((res)=>{
      window.alert("Successfully added.")
      window.location.reload()
    }), (error:any) => {
      window.alert("Check the fields.");
    }
  }
}
