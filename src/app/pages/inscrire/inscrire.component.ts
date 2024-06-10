import { Component, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../cardevent/event.service';
import { InscriService } from './inscri.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.css']
})
export class InscrireComponent implements AfterViewInit {
  inscri!:FormGroup;
  event:any ;
  selectedOptions: string[] = [];
   tab  = [];
   role :any ;
  constructor(private elRef: ElementRef, private renderer: Renderer2,private service : InscriService,
     private fb: FormBuilder,private serviceevent:EventService,private activaiteroute:ActivatedRoute) { }
ngOnInit(){
  this.role = this.activaiteroute.snapshot.paramMap.get('role')
console.log(this.role)
  this.inscri= this.fb.group({
    email: ['', Validators.required],
    presence: ['', Validators.required],
    activity:['', Validators.required],
    goal:['', Validators.required],
  })
  this.serviceevent.afficher().subscribe((res)=>{
    this.event=res; 
  })
}
  ngAfterViewInit(): void {
    const self = this;
    $(document).ready(() => {
      let current_fs: any, next_fs: any, previous_fs: any; //fieldsets
      let opacity: number;

      console.log("Document ready");

      $(self.elRef.nativeElement).on('click', '.next', () => {
        console.log("Next button clicked");
        current_fs = $(self.elRef.nativeElement).find('fieldset:visible');
        next_fs = $(current_fs).next();

        console.log("Current fieldset:", current_fs);
        console.log("Next fieldset:", next_fs);

        // Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        // show the next fieldset
        $(next_fs).show();
        // hide the current fieldset with style
        $(current_fs).animate({ opacity: 0 }, {
          step: (now: any) => {
            // for making fielset appear animation
            opacity = 1 - now;

            this.renderer.setStyle(current_fs[0], 'display', 'none');
            this.renderer.setStyle(next_fs[0], 'opacity', opacity);
          },
          duration: 600
        });
      });

      $(".previous").click(() => {
        console.log("Previous button clicked");
        current_fs = $(self.elRef.nativeElement).find('fieldset:visible');
        previous_fs = $(current_fs).prev();

        console.log("Current fieldset:", current_fs);
        console.log("Previous fieldset:", previous_fs);

        // Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        // show the previous fieldset
        $(previous_fs).show();

        // hide the current fieldset with style
        $(current_fs).animate({ opacity: 0 }, {
          step: (now: any) => {
            // for making fielset appear animation
            opacity = 1 - now;

            this.renderer.setStyle(current_fs[0], 'display', 'none');
            this.renderer.setStyle(previous_fs[0], 'opacity', opacity);
          },
          duration: 600
        });
      });

      $(self.elRef.nativeElement).on('click', '.radio-group .radio', (event: any) => {
        console.log("Radio button clicked");
        $(self.elRef.nativeElement).find('.radio-group .radio').removeClass('selected');
        $(event.target).addClass('selected');
      });

      $(".submit").click(() => {
        console.log("Submit button clicked");
        return false;
      });
    });
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
  role:this.role,
  liste:objectArray
}
this.service.ajouter(p,this.inscri.value.email).subscribe((res)=>{
 if(res){
  window.alert("Successfully saved")
}
else{
  window.alert("The email does not exist")
}
})
}
}