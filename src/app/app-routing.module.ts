import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SocialNetworkReviewsComponent } from './social-network-reviews/social-network-reviews.component';
import { UserMeniComponent } from './user-meni/user-meni.component';

const routes: Routes = [

  {path: '', redirectTo: '/app/admin', pathMatch: 'full'},
  {
    path: 'account', component: AuthComponent, children: [
      { path: '', redirectTo: '/account/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ]
  },
  { path: 'dashboard/:id', component: DashboardComponent }, // za testiranje
  { path: 'meni/:id', component: UserMeniComponent }, // za testiranje
  { path: 'test/:id', component: DashboardComponent }, // za testiranje
  { path: 'reviews/:id', component: SocialNetworkReviewsComponent }, // za testiranje
  //{path: 'dashboard/:id', component: DashboardComponent}, //  kad bude live, korisnik ce pristupati preko qr code u kojem ce biti idStola

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
