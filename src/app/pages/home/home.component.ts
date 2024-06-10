import { Component, OnInit, OnDestroy, ElementRef, ViewChild , HostListener} from '@angular/core';
import { EventService } from '../cardevent/event.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MembreService } from '../page2/membre.service';
import { ShoesService } from '../ourechoes/choes.service';
import { sponsorService } from '../sponsors/sponsors.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  dateTime = new Date();
  allevent:any ;
  event:any ;
  membre:any ;
  constructor(private service : EventService,public sanitizer: DomSanitizer,
    private service3:ShoesService,
    private service2:MembreService,private servicesponsor:sponsorService) { }

  months: string = '00';
  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  intervalId: any;
  newmembre:any ;
  allshoes: any;
  allSponsors: any[] = [];
  newspon :any ;
  groupedSponsors: any[][] = [];
  searchPosition: string = '';

    @ViewChild('numbersContainer', { static: true }) numbersContainer!: ElementRef;

  






    
  ngOnDestroy() {
    clearInterval(this.intervalId); // Nettoyer l'intervalle lors de la destruction du composant
  }

  groupSponsors(): void {
    const groupSize = 6;
    this.groupedSponsors = [];
    for (let i = 0; i < this.allSponsors.length; i += groupSize) {
      const group = this.allSponsors.slice(i, i + groupSize).map(sponsor => ({
        ...sponsor,
        safeImage1: this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + sponsor.image),
        safeImage2: this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + sponsor.images)
      }));
      this.groupedSponsors.push(group);
    }
  }
  ngOnInit() {
    this.servicesponsor.afficher().subscribe((res: any[]) => {
      let list: any[] = [] ;
      this.newspon=res  ;
      this.newspon.forEach((element:any) => {
        if(element.show){
          list.push(element)
        }
      });
      this.allSponsors = list;
      this.groupSponsors();
    });
    this.service3.afficher().subscribe((res)=>{
this.allshoes=res ; 
    })
    this.service2.afficher().subscribe((res)=>{
      let list: any[] = [] ;
    this.membre=res ; 
    this.membre.forEach((element:any) => {
      if(element.show){
        list.push(element)
      }
      this.newmembre=list ;
    });
    })
    this.service.afficher().subscribe((res)=>{
      this.allevent=res ; 
      let list: any[] = [] ;

this.allevent.forEach((element:any) => {
  if(element.show==true){
    list.push(element);
  }

});
this.event=list;
    })
    this.updateCountdown(); // Appeler la méthode de mise à jour initiale
    this.intervalId = setInterval(() => {
      this.updateCountdown(); // Mettre à jour le compte à rebours toutes les secondes
    }, 1000);
    this.animateNumbers();
  }

  filteredList() {
    if (!this.searchPosition) {
      return this.newmembre;
    }
    return this.newmembre.filter((user:any) => 
      user?.position.toLowerCase().includes(this.searchPosition.toLowerCase())
    );
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
  isSearchActive = false;
  searchTerm: string = '';
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;
  }

  performSearch() {
    console.log('Searching for:', this.searchTerm);
    // Add your search logic here
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }
  
}