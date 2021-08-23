import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminApplicationComponent } from './admin-application.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DesksComponent } from './desks/desks.component';
import { TableOverviewComponent } from './desks/table-overview/table-overview.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';



const routes: Routes = [
  {
    path: 'app', component: AdminApplicationComponent, canActivate: [AuthGuard], children: [
      {path:'', redirectTo: '/app/admin', pathMatch: 'full'},
      {path: 'admin', component: AdminPanelComponent},
      {path: 'desks', component: DesksComponent},
      {path: 'tables', component: TableOverviewComponent},
      {path: 'meni', component: RestaurantMenuComponent},

    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class AdminApplicationRoutingModule { }
