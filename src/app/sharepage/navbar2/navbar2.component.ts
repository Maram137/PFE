import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component {
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
