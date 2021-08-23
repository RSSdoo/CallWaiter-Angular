import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { timeout } from 'rxjs/operators';
import { DeskService } from 'src/app/api-services/desk.service';
import { GroupOfDeskService } from 'src/app/api-services/group-of-desk.service';
import { SubGroupOfDeskService } from 'src/app/api-services/sub-group-of-desk.service';
import { IDesk } from 'src/app/shared/interface/IDesk/IDesk';
import { DeskUpsertModel } from 'src/app/shared/models/desk-upsert.model';
import { AddDesksModalComponent } from '../add-desks-modal/add-desks-modal.component';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { AuthService } from 'src/app/auth/auth.service';
import { DeleteDeskComponent } from '../delete-desk/delete-desk.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.css']
})
export class TableOverviewComponent implements OnInit {

  constructor(private deskService: DeskService, private subGroupOfDeskService: SubGroupOfDeskService, private groupOfDeskService: GroupOfDeskService, private dialog: MatDialog,
    private authService: AuthService) { }
  deskList: IDesk[] = [];
  search: string;
  spineer = false;
  hasPrevious : boolean;
  hasNext : boolean;
  currentPage: number;
  deskQRCode: IDesk[] = [];

  ngOnInit(): void {
    this.getDesks();
  }
  getDesks(page?: number) {
    if(this.deskList.length != 0){
      this.deskList = [];
    }
    if(!page){
      page = 1
    }
    this.spineer = true;
    var user = window.atob(localStorage.getItem('token'))
    this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(a=>{
    this.deskService.GetAll(page, this.search, false, a.listOfObject[0].objectId).subscribe(s => {
      this.hasPrevious = s.hasPrevious;
      this.hasNext = s.hasNext;
      this.currentPage = s.currentPage;
      for (let i = 0; i < s.listOfObject.length; i++) {
       if(s.listOfObject[i].aktivan){
        this.deskList.push(s.listOfObject[i]);
        this.groupOfDeskService.GetById(s.listOfObject[i].groupOfDeskId).subscribe(g => {
          this.deskList[i].nameOfGroup  = g.name
        })
        this.subGroupOfDeskService.GetById(s.listOfObject[i].subGroupOfDeskId).subscribe(sg => {
          this.deskList[i].nameOfSubGroup = sg.name
        })
       }
          
      }
    })
    this.deskService.GetAll(undefined, undefined, true, a.listOfObject[0].objectId ).subscribe(s=>{
      for (let i = 0; i < s.listOfObject.length; i++) {
        this.deskQRCode.push(s.listOfObject[i])
      }
    })
  })
    setTimeout(() => {
      this.spineer = false;
    }, 1000);
  }
  PreuzmiPDF(){
    
    var body = [];
    var user = window.atob(localStorage.getItem('token'))
    this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(a=>{
      this.deskService.GetAll(undefined, undefined, true).subscribe(s=>{
        for (let i = 0; i < s.listOfObject.length; i++) {
          if(a.listOfObject[0].objectId == s.listOfObject[i].objectId){
             this.deskQRCode.push(s.listOfObject[i])
          }
        }
      })
    })
    
    for (let i = 0; i < this.deskQRCode.length; i++) {
      if(this.deskQRCode[i].aktivan == true){
        this.deskQRCode[i].qrCode = "data:image/png;base64," + this.deskQRCode[i].qrCode
        console.log(this.deskQRCode[i])
        var row = [

          {
            image:  this.deskQRCode[i].qrCode,
            width: 450,       
          },
          
          {

            text: "Stol: " + this.deskQRCode[i].numberOfDesk,bold: true,
            margin: [100,240,100,240],
            pageBreak: 'after',
          }
        ];
        body.push(row);
      }
      
    }
    
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
  }
  deleteTable(id: number){
    this.dialog.open(DeleteDeskComponent, {width: '600px', data:{id: id}})
  }
  openAddDeskModal(id: number){
    this.dialog.open(AddDesksModalComponent, {width: '600px', data:{id: id}});
  }
}
