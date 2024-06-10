import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor() { }

  shouldShowScrollButton(): boolean {
    // Déterminez ici la position de défilement maximale à partir de laquelle vous souhaitez afficher le bouton.
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollThreshold = 200; // Changer cette valeur selon vos besoins

    return scrollPosition >= scrollThreshold;
  }

  scrollToTop() {
   
      window.scrollTo({ top: 0, behavior: 'auto' }); // ou behavior: 'instant'
    
    
  }
 
}
