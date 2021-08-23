import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  {path: 'account/login', component: LoginComponent,pathMatch: 'full'}
  
];
@NgModule({

  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' , useHash: true })
  ],   exports: [RouterModule],
})
export class AuthRoutingModule { }
