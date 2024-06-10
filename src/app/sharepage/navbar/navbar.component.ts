import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
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
