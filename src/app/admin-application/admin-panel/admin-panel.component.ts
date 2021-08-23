import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from 'node_modules/@angular/material/dialog'
import { GenerateQrcodeService } from 'src/app/api-services/generate-qrcode.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AddDesksModalComponent } from '../desks/add-desks-modal/add-desks-modal.component';
import { AddGroupDeskComponent } from '../desks/add-group-desk/add-group-desk.component';
import { AddSubGroupDeskComponent } from '../desks/add-sub-group-desk/add-sub-group-desk.component';
import { AddArticleComponent } from '../restaurant-menu/add-article/add-article.component';
import { AddGroupArticleComponent } from '../restaurant-menu/add-group-article/add-group-article.component';
import { AddTypeOfGroupComponent } from '../restaurant-menu/add-type-of-group/add-type-of-group.component';
import { SocialNetworksModalComponent } from '../social-networks/social-networks-modal.component';
import { AddUserModalComponent } from '../user/add-user-modal/add-user-modal.component';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  loggedInObject: number = Number(atob(atob(atob(localStorage.getItem('object')))))
  IsAdmin:boolean=false;
  constructor( private route: Router,  private dialog: MatDialog,private authService: AuthService, private qrcodegenerator: GenerateQrcodeService) { }

  ngOnInit(): void {
    var user = window.atob(localStorage.getItem('token'));
    this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(d=>{
      if(d.listOfObject[0].username=="admin"){
        this.IsAdmin=true;
      }
      else{
        this.IsAdmin=false;

      }

    })
  }
  OpenTables(){
     this.route.navigate(['/app/tables'])
  }
  NavigateToDesks(){
       this.route.navigate(['/app/desks'])
  }
  OpenAddDeskModal(){
    this.dialog.open(AddDesksModalComponent, {width: '600px', data:{id: null}});
  }
  OpenGroupAddDeskModal(){
     this.dialog.open(AddGroupDeskComponent, {width: '600px' , data:{id: null}})
  }
  OpenSubGroupAddDeskModal(){
    this.dialog.open(AddSubGroupDeskComponent, {width: '600px' , data:{id: null}})
  }
  OpenAddArticle(){
    this.dialog.open(AddArticleComponent, {width: '600px' , data:{id: null}})
  }
  OpenAddGroupArticleModal(){
    this.dialog.open(AddGroupArticleComponent, {width: '600px' , data:{id: null}})
  }
  OpenTypeOfGroupModal(){
    this.dialog.open(AddTypeOfGroupComponent, {width: '600px', data:{id: null}})
  }
  OpenAddUser(){
    this.dialog.open(AddUserModalComponent, {width: '600px', data:{id: null}})
  }
  OpenLinksModal(){
    this.dialog.open(SocialNetworksModalComponent, {width: '1200px', data:{id: this.loggedInObject}});
  }
  openPdf(){
    this.qrcodegenerator.Get(window.location.href.substring(0, window.location.href.indexOf("#")  /*.length - 9*/) + "#/reviews/" + this.loggedInObject).subscribe(s=> {

      var body = [];
      var qrCode = "data:image/png;base64," + s;
      var row = [
        
        {
          image:  qrCode,
          width: 450,       
        },
        {
          
          text: "Social media reviews: ", bold: true,
          margin: [100,240,100,240],
          pageBreak: 'after',
        }
      ];
      body.push(row);
      
      
      console.log(body)
      var dd = {
        pageOrientation: 'landscape',
        content: [{
          
          pageSize: 'LETTER',
          pageMargins: [180, 55],
          alignment: 'center',
          text:'QR KODOVI ZA STOLOVE',
          table: {
            body: body,
            
          },
          
        }]
      };
      
      pdfMake.createPdf(dd).open();
    });
  }
  LogOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('object');
    this.route.navigate(['/account/login'])
  }

}
