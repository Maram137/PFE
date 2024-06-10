import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProposComponent } from './pages/propos/propos.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { RegisterComponent } from './pages/register/register.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CelebrateComponent } from './pages/celebrate/celebrate.component';
import { VisitComponent } from './pages/visit/visit.component';
import { GeecComponent } from './pages/geec/geec.component';
import { JobfairComponent } from './pages/jobfair/jobfair.component';
import { DeveloperdaysComponent } from './pages/developerdays/developerdays.component';
import { AccountComponent } from './pages/account/account.component';
import { ExhibitComponent } from './pages/exhibit/exhibit.component';
import { InscrireComponent } from './pages/inscrire/inscrire.component';
import { Blog2Component } from './pages/blog2/blog2.component';
import { PlateformeComponent } from './pages/plateforme/plateforme.component';
import { AfricupComponent } from './pages/africup/africup.component';
import { AdminComponent } from './pages/admin/admin.component';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { ParticipationsComponent } from './pages/participations/participations.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { SponsorsComponent } from './pages/sponsors/sponsors.component';
import { OurechoesComponent } from './pages/ourechoes/ourechoes.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'propos',component:ProposComponent},
  {path:'agenda',component:AgendaComponent},
  {path:'register',component:RegisterComponent},
  {path:'blog',component:BlogComponent},
  {path:'celebrate',component:CelebrateComponent},
  {path:'visit',component:VisitComponent},
  {path:'geec',component:GeecComponent},
  {path:'jobfair',component:JobfairComponent},
  {path:'developerdays',component:DeveloperdaysComponent},
  {path:'account',component:AccountComponent},
  {path:'exhibit',component:ExhibitComponent},
  {path:'inscrire',component:InscrireComponent},
  {path:'blog2',component:Blog2Component},
  {path:'admin',component:AdminComponent},
  {path:'page1',component:Page1Component},
  {path:'page2',component:Page2Component},
  {path:'participations',component:ParticipationsComponent},
  {path:'profil',component:ProfilComponent},
  {path:'sponsors',component:SponsorsComponent},
  {path:'ourechoes',component:OurechoesComponent},
{ path: 'plateforme',component:PlateformeComponent},
{ path: 'africup',component:AfricupComponent},
{ path: 'chatbot',component:ChatbotComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
