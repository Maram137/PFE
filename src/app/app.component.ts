import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monPfe';
  displayNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Liste des routes où le navbar ne doit pas s'afficher
        const noNavbarRoutes = ['/admin', '/home'];
        this.displayNavbar = !noNavbarRoutes.includes(event.urlAfterRedirects);
      }
    });
  }
}
