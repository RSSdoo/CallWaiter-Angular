import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminApplicationComponent } from './admin-application/admin-application.component';
import { AdminApplicationRoutingModule } from './admin-application/admin-application-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { AdminApplicationModule } from './admin-application/admin-application.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AddDesksModalComponent } from './admin-application/desks/add-desks-modal/add-desks-modal.component';
import { AddGroupDeskComponent } from './admin-application/desks/add-group-desk/add-group-desk.component';
import { AddSubGroupDeskComponent } from './admin-application/desks/add-sub-group-desk/add-sub-group-desk.component';
import { TableOverviewComponent } from './admin-application/desks/table-overview/table-overview.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { DeleteSubGroupDeskComponent } from './admin-application/desks/add-sub-group-desk/delete-sub-group-desk/delete-sub-group-desk.component';
import { DeleteGroupDeskComponent } from './admin-application/desks/add-group-desk/delete-group-desk/delete-group-desk.component';
import { UserMeniComponent } from './user-meni/user-meni.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { TestCompComponent } from './test-comp/test-comp.component';
import { SocialNetworkReviewsComponent } from './social-network-reviews/social-network-reviews.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserMeniComponent,
    TestCompComponent,
    SocialNetworkReviewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AdminApplicationRoutingModule,
    AdminApplicationModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AuthModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  entryComponents:[AddDesksModalComponent, AddGroupDeskComponent, AddSubGroupDeskComponent, DeleteSubGroupDeskComponent, DeleteGroupDeskComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
