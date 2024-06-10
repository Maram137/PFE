
// src/app/components/account/account.component.ts

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { gmailValidator } from '../gmail-validator'; // Import the custom validator
import { passwordValidator } from '../password.validator'; // Import the password validator

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user = {
    image: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    civility: '',
    country: '',
    role: '',
    phone_number: '',
  };
  imageSrc: any = null;
  profil: any;
  token: any;
  formuser!: FormGroup;
  selectedFile!: File;
  resul :any ;
  constructor(private router: Router, private authServices: AuthService,
              private route: ActivatedRoute, private toastr: ToastrService, private fb: FormBuilder) {

    
  }

  ngOnInit(): void {
    this.formuser = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, gmailValidator]], // Use the custom validator
      phone_number: ['', Validators.required],
      civility: ['', Validators.required],
      country: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator()]],
    })
    // No need to reinitialize the form here, it's already done in the constructor
  }
  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }
  signup() {
    if(this.selectedFile==null){
      this.authServices.signUp2(this.user.first_name,this.user.last_name,this.user.email,this.user.password,this.user.phone_number,
        this.user.country,this.user.civility,this.user.role).subscribe(
        (result) => {
            this.resul=result
            console.log(this.resul)
            if (this.resul) {
            window.alert("Sign-up successful!', 'Succès'");
            window.location.reload();
          } else {
            window.alert("The email exists.");
          }
        },
        (error) => {
          window.alert("The email exists.");
          console.error('Échec de l\'inscription :', error);
        }
      );
    }
    else{
    const uploadImageData = new FormData();
    uploadImageData.append(
      'image',
      this.selectedFile,
      this.selectedFile.name
    );
    

    this.authServices.signUp(this.user.first_name,this.user.last_name,this.user.email,this.user.password,this.user.phone_number,
      this.user.country,this.user.civility,this.user.role,uploadImageData).subscribe(
   (result) => {
    console.log(result)
        if (result.body) {
          window.alert("'Sign-up successful !', 'Succès'");
         window.location.reload();
        } else {
          window.alert("The email exists.");
        }
      },
      (error) => {
        window.alert("The email exists.");
        console.error('Échec de l\'inscription :', error);
      }
    );
  }
  }

  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.user.image = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  signIn() {
    this.authServices.signIn(this.user).subscribe(
      (result) => {

        this.token = result;
        if (result != null) {
            localStorage.setItem("Token", this.token.token);
            localStorage.setItem("Email", this.token.email);
            localStorage.setItem("Role", this.token.profil);
          
          setTimeout(() => {
            window.location.reload();
          }, 700);
          window.alert("Login successful");
          this.router.navigate(["/admin"]);
        } else {
          window.alert("Your email address or password is incorrect");
        }
      },
      (error) => {
        window.alert("Your email address or password is incorrect");
      }
    );
  }
   //vu password 
   passwordFieldType: string = 'password';

   togglePasswordVisibility(): void {
     this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
   }
}
