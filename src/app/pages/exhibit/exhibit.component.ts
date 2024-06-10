import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-exhibit',
  templateUrl: './exhibit.component.html',
  styleUrls: ['./exhibit.component.css']
})
export class ExhibitComponent implements OnInit, OnDestroy{
  dateTime = new Date();
  constructor() { }

  months: string = '00';
  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  intervalId: any;

  @ViewChild('numbersContainer', { static: true }) numbersContainer!: ElementRef;

  ngOnDestroy() {
    clearInterval(this.intervalId); // Nettoyer l'intervalle lors de la destruction du composant
  }

  ngOnInit() {
    this.updateCountdown(); // Appeler la méthode de mise à jour initiale
    this.intervalId = setInterval(() => {
      this.updateCountdown(); // Mettre à jour le compte à rebours toutes les secondes
    }, 1000);
    this.animateNumbers();
  }

  updateCountdown() {
    const deadline = new Date('June 25, 2024 09:00:00 ').getTime();
    const now = new Date().getTime();
    const gap = deadline - now;

    this.months = Math.floor(gap / (1000 * 60 * 60 * 24 * 30)).toString().padStart(2, '0');
    this.days = Math.floor((gap % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    this.hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    this.minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    this.seconds = Math.floor((gap % (1000 * 60)) / 1000).toString().padStart(2, '0');
  }

  animateNumbers() {
    let nums = this.numbersContainer.nativeElement.querySelectorAll(".num");
    let section = this.numbersContainer.nativeElement;
    let started = false;

    let animationTriggered = false;
    let triggerOffset = 50; // Offset before reaching the section to trigger the animation

    window.onscroll = () => {
      if (!animationTriggered && window.scrollY >= section.offsetTop - window.innerHeight + triggerOffset) {
        animationTriggered = true;
        if (!started) {
          nums.forEach((num: any) => this.startCount(num, num.dataset.goal));
        }
        started = true;
      }
    };
  }

  startCount(el: any, goal: any) {
    let count = 0;
    let increment = Math.ceil(goal / 100); // Increment by 1% of goal
    let interval = setInterval(() => {
      count += increment;
      if (count >= goal) {
        count = goal;
        clearInterval(interval);
      }
      el.textContent = count;
    }, 20);
  }

}