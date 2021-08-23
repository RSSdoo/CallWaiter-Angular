import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RouterModule } from '@angular/router';
import { DesksComponent } from './desks/desks.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Browser } from 'protractor';
import { BrowserModule } from '@angular/platform-browser';
import { AdminApplicationComponent } from './admin-application.component';
import { AddDesksModalComponent } from './desks/add-desks-modal/add-desks-modal.component';
import { AddGroupDeskComponent } from './desks/add-group-desk/add-group-desk.component';
import { AddSubGroupDeskComponent } from './desks/add-sub-group-desk/add-sub-group-desk.component';
import { TableOverviewComponent } from './desks/table-overview/table-overview.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { AddArticleComponent } from './restaurant-menu/add-article/add-article.component';
import { AddGroupArticleComponent } from './restaurant-menu/add-group-article/add-group-article.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { DeleteGroupDeskComponent } from './desks/add-group-desk/delete-group-desk/delete-group-desk.component';
import { DeleteGroupArticleComponent } from './restaurant-menu/add-group-article/delete-group-article/delete-group-article.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DeleteArticleComponent } from './restaurant-menu/add-article/delete-article/delete-article.component';
import { DeleteDeskComponent } from './desks/delete-desk/delete-desk.component';
import { AddTypeOfGroupComponent } from './restaurant-menu/add-type-of-group/add-type-of-group.component';
import { DeleteTypeOfGroupArticleComponent } from './restaurant-menu/add-type-of-group/delete-type-of-group-article/delete-type-of-group-article.component';
import { DeleteSubGroupDeskComponent } from './desks/add-sub-group-desk/delete-sub-group-desk/delete-sub-group-desk.component';
import { UserComponent } from './user/user.component';
import { AddUserModalComponent } from './user/add-user-modal/add-user-modal.component';
import { QRCodeModule } from 'angular2-qrcode';
import { SocialNetworksModalComponent } from './social-networks/social-networks-modal.component';




@NgModule({
  declarations: [
    AdminApplicationComponent,
    AdminPanelComponent, 
    DesksComponent,
    AddDesksModalComponent,
    AddGroupDeskComponent,
    AddSubGroupDeskComponent ,
    TableOverviewComponent,
    RestaurantMenuComponent,
    AddArticleComponent,
    AddGroupArticleComponent,
    DeleteSubGroupDeskComponent,
    DeleteGroupDeskComponent,
    DeleteGroupArticleComponent,
    DeleteArticleComponent,
    DeleteDeskComponent,
    AddTypeOfGroupComponent,
    DeleteTypeOfGroupArticleComponent,
    UserComponent,
    AddUserModalComponent,
    SocialNetworksModalComponent,
  
    
  ],
  imports: [
    ImageCropperModule,
    BrowserModule,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    NgxAudioPlayerModule,
    QRCodeModule
  ], 



})
export class AdminApplicationModule { }
