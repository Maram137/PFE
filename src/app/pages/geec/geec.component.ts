import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-geec',
  templateUrl: './geec.component.html',
  styleUrls: ['./geec.component.css']
})
export class GeecComponent {
  @ViewChild('barProgress', {static: true}) barProgress!: ElementRef;
  startAnimation = false;
  progressValue: number[] = [0, 0, 0, 0, 0, 0, 0, 0]; // Valeurs de progression pour chaque barre

  constructor(private renderer: Renderer2) {} // Utilisation de Renderer2

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
      const componentPosition = this.barProgress.nativeElement.getBoundingClientRect().top;
      const scrollPosition = window.innerHeight * 0.7; // Décalage de 80% de la hauteur de la fenêtre

      if (componentPosition < scrollPosition) {
          this.startAnimation = true;
          // Définir les valeurs de progression ici
          this.progressValue = [80, 75, 70, 65, 55, 50, 45, 40]; // Exemple de valeurs pour chaque barre
      }
  }
}