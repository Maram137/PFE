import { Component } from '@angular/core';
import { ProfilService } from './profil.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  profil:any ;
  c:any ;
  profilform!:FormGroup
  image:any ;
  first_name:any;
constructor(private fb: FormBuilder,private service : ProfilService,public sanitizer: DomSanitizer){}
ngOnInit(){
  this.profilform = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    civilty: ['', Validators.required],
    country: ['', Validators.required],
    email: ['', Validators.required],
    phone_number: ['', Validators.required],
    password: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required],


  })
  this.service.afficherbyemmail().subscribe((res)=>{
    this.profil=res ; 
  })
  this.service.imagebyemail().subscribe((res)=>{
    this.image=res ; 
    console.log(this.image)
  })
}
modifier(){
  if(this.profilform.value.country==''){
    this.profilform.value.country=this.profil.country

if(this.profilform.value.password1!=this.profilform.value.password2){
  window.alert("Les Deux Mot de passes sont differents")
  }
  else{
    if(this.profilform.value.password1==''){
    let u = {
      id:this.profil.id,
      first_name:this.profilform.value.first_name,
      last_name:this.profilform.value.last_name,
      civilty:this.profilform.value.civilty ,
      country:this.profilform.value.country,
      email:this.profilform.value.email,
      phone_number:this.profilform.value.phone_number,
      password:this.profilform.value.password
      
    }
    this.service.modif(this.profil.id,u).subscribe((res)=>{
      window.alert("modification avec succées")
      window.location.reload()
    })
  }
    else {
      let u = {
        id:this.profil.id,
        first_name:this.profilform.value.first_name,
        last_name:this.profilform.value.last_name,
        civilty:this.profilform.value.civilty ,
        country:this.profilform.value.country,
        email:this.profilform.value.email,
        phone_number:this.profilform.value.phone_number,
        password:this.profilform.value.password1
      }
      this.service.modif2(this.profil.id,u).subscribe((res)=>{
        window.alert("modification avec succées")
        window.location.reload()
      })
    }
    }
  }
else {
  if(this.profilform.value.password1!=this.profilform.value.password2){
    window.alert("Les Deux Mot de passes sont differents")
    }
    else{
      if(this.profilform.value.password1==''){
      let u = {
        id:this.profil.id,
        first_name:this.profilform.value.first_name,
        last_name:this.profilform.value.last_name,
        civilty:this.profilform.value.civilty ,
        country:this.profilform.value.country,
        email:this.profilform.value.email,
        phone_number:this.profilform.value.phone_number,
        password:this.profilform.value.password
      }
      this.service.modif(this.profil.id,u).subscribe((res)=>{
        window.alert("modification avec succées")
        window.location.reload()
      })
    }
      else {
        let u = {
          id:this.profil.id,
          first_name:this.profilform.value.first_name,
          last_name:this.profilform.value.last_name,
          civilty:this.profilform.value.civilty ,
          country:this.profilform.value.country,
          email:this.profilform.value.email,
          phone_number:this.profilform.value.phone_number,
          password:this.profilform.value.password1
        }
        this.service.modif2(this.profil.id,u).subscribe((res)=>{
          window.alert("modification avec succées")
          window.location.reload()
        })
      }
      }
    }
}




}



