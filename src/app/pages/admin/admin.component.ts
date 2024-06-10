import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gmailValidator } from '../gmail-validator';
import { DomSanitizer } from '@angular/platform-browser';
import { InscriService } from '../inscrire/inscri.service';
import { EventService } from '../cardevent/event.service';
import { ProfilService } from '../profil/profil.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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
alluser:any ;
selectedFile!: File;

formuser!:FormGroup;
imageSrc: any = null;
users:any ;
modif!:FormGroup;
first:any;
last:any ;
email:any ;
image:any;
phone:any;
id:any ;
deleteid:any ;
newlist :any[] = [] ;
newuser :any ;
res :any ;
profil:any ;
u:any ;
p:any ; 
presence:any ;
allpart:any ; 
eventchois:any ;
img:any ; 
inscri!:FormGroup;
event:any ;
searchPosition: string = '';

allevent:any
selectedOptions: string[] = [];

  constructor(private renderer: Renderer2,private authService: AuthService,public sanitizer: DomSanitizer,private serviceevent : EventService,
    private service : UserService, private profilservice : ProfilService,private fb: FormBuilder,private authServices: AuthService,private ser : InscriService) { }

  ngOnInit(): void {

    this.inscri= this.fb.group({
      email: ['', Validators.required],
      presence: ['', Validators.required],
      activity:['', Validators.required],
      goal:['', Validators.required],
    })
  ,  this.serviceevent.afficher().subscribe((res)=>{
      this.event=res; 
    })
  
  
    this.serviceevent.afficher().subscribe((res)=>{
      this.allevent=res ; 
    })

this.profilservice.imagebyemail().subscribe((res)=>{
  this.img =res ; 
})

    this.ser.participationbyemail().subscribe((res)=>{
      this.allpart=res ;
    })





    
this.profil= localStorage.getItem("Role")
    this.service.alluser().subscribe((res)=>{
      this.newuser=res ; 
    })
    this.modif = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],

      phone: ['', Validators.required],
    

       }),
    // No need to reinitialize the form here, it's already done in the constructor
    this.formuser = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, gmailValidator]], // Use the custom validator
      phone_number: ['', Validators.required],
      civility: ['', Validators.required],
      country: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required]],
      image: [''],

    })
    this.service.alluser().subscribe((res)=>{
      this.alluser=res  ;
      let list: any[] = [] ;
      this.alluser.forEach((element:any) => {
        if(element.user.auth.id!=1 ){
          list.push(element);
        }
        
      });
    this.newlist=list ;
    console.log(this.newlist)

  })



  const sidebarToggle = document.querySelector("#sidebar-toggle") as HTMLElement;
    sidebarToggle.addEventListener("click", () => {
      const sidebar = document.querySelector("#sidebar") as HTMLElement;
      sidebar.classList.toggle("collapsed");
    });

    const themeToggle = document.querySelector(".theme-toggle") as HTMLElement;
    themeToggle.addEventListener("click", (event) => {
      event.preventDefault(); // Empêcher le rechargement de la page
      this.toggleLocalStorage();
      this.toggleRootClass();
    });

    // Vérification du thème actuel au chargement de la page
    this.setInitialTheme();
  }

  filteredList() {
    if (!this.searchPosition) {
      return this.newlist;
    }
    return this.newlist.filter(user => 
      user?.user?.auth?.name.toLowerCase().includes(this.searchPosition.toLowerCase())
    );
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
  this.ser.ajouter(p,this.inscri.value.email).subscribe((res)=>{
  if(res){
  window.alert("Successfully saved")
  window.location.reload()
  }
  else{
  window.alert("The email does not exist")
  }
  })
  
  
  }
  
  
  delete2(id:any){
  this.id=id ; 
  }
  archiver(){
    this.ser.archiver(this.id).subscribe((res)=>{
      window.alert("Archived Successfully")
      window.location.reload()
    })
  }

  


  edit(id:any){
    this.ser.afficherbyid(id).subscribe((res)=>{
      this.p=res ;
      this.email=this.p.user.email
      this.presence=this.p.presence
    })
    
    this.serviceevent.afficherlistevent(id).subscribe((res)=>{
      this.eventchois=res;
      
   
  
    })
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
update(){
  if(this.selectedFile!=null){
    const uploadImageData = new FormData();
    uploadImageData.append(
      'image',
      this.selectedFile,
      this.selectedFile.name
    );
    this.service.update2(this.id,this.modif.value.lastname,this.modif.value.firstname,this.modif.value.phone,this.modif.value.email,uploadImageData).subscribe((res)=>{
     window.location.reload()
    })
  }
this.service.update(this.id,this.modif.value.lastname,this.modif.value.firstname,this.modif.value.phone,this.modif.value.email).subscribe((res)=>{
  window.location.reload()
})
}

  toggleRootClass() {
    const current = document.documentElement.getAttribute('data-bs-theme');
    const inverted = current == 'dark' ? 'light' : 'dark';
    this.renderer.setAttribute(document.documentElement, 'data-bs-theme', inverted);
  }
  delete(id:any){
    this.deleteid=id ; 
  }
  supprimer(){
    this.service.archiver(this.deleteid).subscribe((res)=>{
      window.location.reload()
    })
  }

  toggleLocalStorage() {
    if (this.isLight()) {
      localStorage.removeItem("light");
    } else {
      localStorage.setItem("light", "set");
    }
  }

  isLight() {
    return localStorage.getItem("light");
  }
  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }
  public onFileChanged2(event:any) {
    this.selectedFile = event.target.files[0];
  }

  setInitialTheme() {
    // On vérifie si le thème est en mode jour ou nuit et on définit la classe en conséquence
    const currentTheme = localStorage.getItem('light');
    if (currentTheme === 'set') {
      this.renderer.setAttribute(document.documentElement, 'data-bs-theme', 'light');
    } else {
      this.renderer.setAttribute(document.documentElement, 'data-bs-theme', 'dark');
    }
  }

  currentPage: string = 'dashboard'; // Par défaut, afficher le dashboard

  // Fonction pour changer la page actuelle
  showPage(page: string) {
    this.currentPage = page;
  }


  signup() {
  
    const uploadImageData = new FormData();
    uploadImageData.append(
      'image',
      this.selectedFile,
      this.selectedFile.name
    );
    const formData = new FormData();
    formData.append('first_name', this.user.first_name);
    formData.append('last_name', this.user.last_name);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
    formData.append('civility', this.user.civility);
    formData.append('country', this.user.country);
    formData.append('phone_number', this.user.phone_number);
    formData.append('role', this.user.role);

    this.authServices.signUp(this.user.first_name,this.user.last_name,this.user.email,this.user.password,this.user.phone_number,
      this.user.country,this.user.civility,this.user.role,uploadImageData).subscribe(
      (result) => {
        if (result.body) {
          window.alert("'Sign-up successful !', 'Success'");
          window.location.reload();
        } else {
          window.alert("The email exists.");
        }
      },
      (error) => {
        window.alert("The email exists.");
      }
    );
   
   
  }
  adduser() {
if(this.selectedFile==null){
  console.log(this.user.first_name,this.user.last_name,this.user.email,this.user.password,this.user.phone_number,
    this.user.country,this.user.civility,this.user.role)
  this.authServices.signUp2(this.user.first_name,this.user.last_name,this.user.email,this.user.password,this.user.phone_number,
    this.user.country,this.user.civility,this.user.role).subscribe(
    (result) => {
      console.log(result)
      this.res =result
      if (this.res) {
        window.alert("User added successfully!', 'Success'");
        window.location.reload();
      } else {
        window.alert("The email exists.");
      }
    },
    (error) => {
      window.alert("The email exists.");
    }
  );
}
    const uploadImageData = new FormData();
    uploadImageData.append(
      'image',
      this.selectedFile,
      this.selectedFile.name
    );
    this.authServices.signUp(this.user.first_name,this.user.last_name,this.user.email,this.user.password,this.user.phone_number,
      this.user.country,this.user.civility,this.user.role,uploadImageData).subscribe(
      (result) => {
        console.log(result.body)

        if (result.body) {
          window.alert("User added successfully!', 'Success'");
         window.location.reload();
        } else {
          window.alert("The email exists.");
        }
      },
      (error) => {
        window.alert("The email exists.");
      }
    );
  }
  affichebyid(id:any){
    this.id=id ;
    this.service.afficherbyid(id).subscribe((res)=>{
      this.users=res ;
      this.first=this.users.user.first_name
      this.last=this.users.user.last_name
      this.email=this.users.user.email
      this.phone=this.users.user.phone_number
      this.image=this.users.imagePath
      // this.imageSrc=this.users.image_path
  });
    }
  

  //vu password 
  passwordFieldType: string = 'password';

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  onLogout() {
    this.authService.logout(); // Appel de la méthode logout() du service AuthService
  }
}