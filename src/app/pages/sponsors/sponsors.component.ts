import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sponsorService } from './sponsors.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent {
  sponsorform!: FormGroup;
  selectedFile!: File;
  selectedFile2!: File;
  selectedFile3!: File;
  selectedFile4!: File;

  allsponsors :any ;
id:any ;
s:any ; 
im1:any ;
im2:any ;
show:any ;
chow:any ;
modifsponsorform!:FormGroup;
  constructor(private fb: FormBuilder, private service: sponsorService,public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.service.afficher().subscribe((res)=>{
      this.allsponsors=res ; 
    })
    this.sponsorform = this.fb.group({
      name: ['', Validators.required],
      show: [false, Validators.required],  // Default value should be a boolean
    });
    this.modifsponsorform = this.fb.group({
      show: ['', Validators.required], 
    });
  
  }
  edit(id:any){
    this.id = id ; 
    this.service.afficherbyid(this.id).subscribe((res)=>{
      this.s = res ; 
      this.im1=this.s.image;
      this.im2=this.s.images;
      this.chow=this.s.show
      this.show=this.s.show
    })
}
  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onFileChanged2(event: any): void {
    this.selectedFile2 = event.target.files[0];
  }




  onFileChanged3(event: any): void {
    this.selectedFile3 = event.target.files[0];
  }

  onFileChanged4(event: any): void {
    this.selectedFile4 = event.target.files[0];
  }

  modif(){
  
    if(this.selectedFile3==null && this.selectedFile4!=null){
      
    const uploadData = new FormData();
    uploadData.append('images', this.selectedFile4, this.selectedFile4.name);
    uploadData.append('id', this.id);
    uploadData.append('show', this.modifsponsorform.value.show.toString());

    this.service.updateim2(uploadData).subscribe(
      (res) => {
        window.alert('modification successfully.');
        window.location.reload();
      },
      (error) => {
        console.error('Error:', error);
        window.alert('An error occurred while adding.');
      }
    );
    }
    else if (this.selectedFile4==null&&this.selectedFile3!=null){
      const uploadData = new FormData();
      uploadData.append('image', this.selectedFile3, this.selectedFile3.name);
      uploadData.append('id', this.id);
      uploadData.append('show', this.modifsponsorform.value.show.toString());
  
      this.service.updateim1(uploadData).subscribe(
        (res) => {
          window.alert('modification successfully.');
          window.location.reload();
        },
        (error) => {
          console.error('Error:', error);
          window.alert('An error occurred while adding.');
        }
      );
    }
    else if (this.selectedFile4==null&&this.selectedFile3==null) {  
      
          const uploadData = new FormData();

      uploadData.append('id', this.id);
      uploadData.append('show', this.modifsponsorform.value.show.toString());
  
      this.service.updateim3(uploadData).subscribe(
        (res) => {
          window.alert('modification successfully.');
          window.location.reload();
        },
        (error) => {
          console.error('Error:', error);
          window.alert('An error occurred while adding.');
        }
      );

    }
    else{

      const uploadData = new FormData();
      uploadData.append('image', this.selectedFile3, this.selectedFile3.name);
      uploadData.append('images', this.selectedFile4, this.selectedFile4.name);

      uploadData.append('id', this.id);
      uploadData.append('show', this.modifsponsorform.value.show.toString());
  
      this.service.updateim(uploadData).subscribe(
        (res) => {
          window.alert('modification successfully.');
          window.location.reload();
        },
        (error) => {
          console.error('Error:', error);
          window.alert('An error occurred while adding.');
        }
      );    }
  }



  ajouter(): void {
    if (this.sponsorform.invalid) {
      // Handle form validation errors
      return;
    }

    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);
    uploadData.append('images', this.selectedFile2, this.selectedFile2.name);
    uploadData.append('nom', this.sponsorform.value.name);
    uploadData.append('show', this.sponsorform.value.show.toString());

    this.service.ajouter(uploadData).subscribe(
      (res) => {
        window.alert('Successfully added.');
        window.location.reload();
      },
      (error) => {
        console.error('Error:', error);
        window.alert('An error occurred while adding.');
      }
    );
  }

  delete(id:any){
    this.id=id ; 

  }
supprimer(){
  this.service.supprimer(this.id).subscribe((res)=>{
    window.alert("Successfully deleted.")
    window.location.reload()
  })
}
}
