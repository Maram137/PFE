import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-jobfair',
  templateUrl: './jobfair.component.html',
  styleUrls: ['./jobfair.component.css']
})
export class JobfairComponent {
  @ViewChild('barProgress', {static: true}) barProgress!: ElementRef;
  startAnimation = false;
  progressValue: number[] = [0, 0, 0, 0, 0, 0]; // Valeurs de progression pour chaque barre

  constructor(private renderer: Renderer2) {} // Utilisation de Renderer2

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
      const componentPosition = this.barProgress.nativeElement.getBoundingClientRect().top;
      const scrollPosition = window.innerHeight * 0.7; // Décalage de 80% de la hauteur de la fenêtre

      if (componentPosition < scrollPosition) {
          this.startAnimation = true;
          // Définir les valeurs de progression ici
          this.progressValue = [90, 70, 40, 30, 30, 20]; // Exemple de valeurs pour chaque barre
      }
  }
}