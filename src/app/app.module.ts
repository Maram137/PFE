import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Ajoutez cette ligne

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CelebrateComponent } from './pages/celebrate/celebrate.component';
import { DeveloperdaysComponent } from './pages/developerdays/developerdays.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GeecComponent } from './pages/geec/geec.component';
import { JobfairComponent } from './pages/jobfair/jobfair.component';
import { ProposComponent } from './pages/propos/propos.component';
import { RegisterComponent } from './pages/register/register.component';
import { VisitComponent } from './pages/visit/visit.component';
import { AccountComponent } from './pages/account/account.component';
import { PlateformeComponent } from './pages/plateforme/plateforme.component';
import { ExhibitComponent } from './pages/exhibit/exhibit.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { InscrireComponent } from './pages/inscrire/inscrire.component';
import { Blog2Component } from './pages/blog2/blog2.component';
import { Navbar2Component } from './sharepage/navbar2/navbar2.component';
import { AfricupComponent } from './pages/africup/africup.component';
import { AdminComponent } from './pages/admin/admin.component';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ParticipationsComponent } from './pages/participations/participations.component';
import { SponsorsComponent } from './pages/sponsors/sponsors.component';
import { OurechoesComponent } from './pages/ourechoes/ourechoes.component';
import { CardeventComponent } from './pages/cardevent/cardevent.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';






@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    AgendaComponent,
    BlogComponent,
    CelebrateComponent,
    DeveloperdaysComponent,
    GeecComponent,
    JobfairComponent,
    ProposComponent,
    RegisterComponent,
    VisitComponent,
    AccountComponent,
    PlateformeComponent,
    ExhibitComponent,
    InscrireComponent,
    Blog2Component,
    Navbar2Component,
  
    AfricupComponent,
       AdminComponent,
       Page1Component,
       Page2Component,
       ProfilComponent,
       ParticipationsComponent,
       SponsorsComponent,
       OurechoesComponent,
       CardeventComponent,
       ChatbotComponent,
      
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, // Ajoutez FormsModule ici
    ToastrModule.forRoot(),
    BrowserAnimationsModule 
    
  ],
  providers: [
    AuthService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
