import { group } from '@angular/animations';
import { PlatformLocation } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeskService } from 'src/app/api-services/desk.service';
import { GroupOfDeskService } from 'src/app/api-services/group-of-desk.service';
import { SubGroupOfDeskService } from 'src/app/api-services/sub-group-of-desk.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IGroupOfDesks } from 'src/app/shared/interface/IGroupOfDesk/IGroup-of-desks';
import { ISubOfGroupDesk } from 'src/app/shared/interface/ISubOfGroupDesk/ISubOfGroupDesk';
import { DeskUpsertModel } from 'src/app/shared/models/desk-upsert.model';

@Component({
  selector: 'app-add-desks-modal',
  templateUrl: './add-desks-modal.component.html',
  styleUrls: ['./add-desks-modal.component.css']
})
export class AddDesksModalComponent implements OnInit {

  constructor(private deskService: DeskService, @Inject(MAT_DIALOG_DATA) public data: any, private groupOfDeskService: GroupOfDeskService,
    private subGroupOfDeskService: SubGroupOfDeskService, private authService: AuthService, private dialog: MatDialog) { }
  editMode = false;
  formGroupOfDeskId: number;
  formPodGroupOfDeskId: number;
  objectId: number;
  deskId: number;
  groupOfDeskList: IGroupOfDesks[] = [];
  subGroupOfDeskList: ISubOfGroupDesk[] = [];
  @ViewChild('addDeskForm') addDeskForm: NgForm

  ngOnInit(): void {
    this.getGroupOfDeskList();
    if (this.data.id) {
      this.deskId = this.data.id;
      this.editMode = true;
      this.initEditMode();
    }
  }
  getGroupOfDeskList() {
    this.groupOfDeskList = []
    var user = window.atob(localStorage.getItem('token'))
    this.groupOfDeskService.GetAll(null, null, true).subscribe(s => {
      s.listOfObject.forEach(f => {
        if(f.aktivan){
          this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(s => {
            if (f.objectId == s.listOfObject[0].objectId) {
              this.groupOfDeskList.push({ id: f.id, name: f.name })
            }
          })
        }
        
      })
    })
  }
  loadSubGroups(groupId: number) {
    
    this.subGroupOfDeskList = [];
    this.subGroupOfDeskService.GetAll(true).subscribe(s => {
      s.listOfObject.forEach(pl => {
        if (groupId == pl.groupOfDeskId && pl.aktivan == true) {
          this.subGroupOfDeskList.push({ id: pl.id, name: pl.name })
        }
      })
    })
    
  }

  initEditMode() {
    this.deskService.GetById(this.deskId).subscribe(d => {

      this.loadSubGroups(d.groupOfDeskId)
      this.addDeskForm.controls["groupOfDeskId"].setValue(d.groupOfDeskId);
      this.addDeskForm.controls["subGroupOfDeskId"].setValue(d.subGroupOfDeskId);
      this.addDeskForm.controls["numberOfDesk"].setValue(d.numberOfDesk);
      this.addDeskForm.controls["numberOfSeats"].setValue(d.numberOfSeats);

    })
  }
  onSubmit() {

    var user = window.atob(localStorage.getItem('token'))
    if (!this.addDeskForm.valid)
      return;
    this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(s => {

      if (!this.editMode) {
        var u = new DeskUpsertModel(Number(this.addDeskForm.value.groupOfDeskId), Number(this.addDeskForm.value.subGroupOfDeskId), this.addDeskForm.value.numberOfDesk, 1, s.listOfObject[0].objectId, true,
        Number(this.addDeskForm.value.numberOfSeats))
        console.log(u);
        this.deskService.Insert(u).subscribe(() => {
          this.dialog.closeAll();

        })
      }
      else {
        var u = new DeskUpsertModel(Number(this.addDeskForm.value.groupOfDeskId), Number(this.addDeskForm.value.subGroupOfDeskId), this.addDeskForm.value.numberOfDesk, 1, s.listOfObject[0].objectId, true,
        Number(this.addDeskForm.value.numberOfSeats))
        this.deskService.Update(this.deskId, u).subscribe(() => {
          this.dialog.closeAll();
          location.reload();
        })
      }


    })


  }

}
