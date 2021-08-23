import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupOfDeskService } from 'src/app/api-services/group-of-desk.service';
import { SubGroupOfDeskService } from 'src/app/api-services/sub-group-of-desk.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IGroupOfDesks } from 'src/app/shared/interface/IGroupOfDesk/IGroup-of-desks';
import { SubGroupOfDeskUpsertModel } from 'src/app/shared/models/subGroupOfDesk-upsert.model';
import { DeleteSubGroupDeskComponent } from './delete-sub-group-desk/delete-sub-group-desk.component';

@Component({
  selector: 'app-add-sub-group-desk',
  templateUrl: './add-sub-group-desk.component.html',
  styleUrls: ['./add-sub-group-desk.component.css']
})
export class AddSubGroupDeskComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private subGroupOfDeskService: SubGroupOfDeskService, private groupOfDeskService: GroupOfDeskService, private dialog: MatDialog,
    private authService: AuthService) { }
  editMode = false;
  subGroupOfDeskId: number;
  objectId: number;
  groupOfDeskList: IGroupOfDesks[] = [];
  formGroupOfDeskId: number;
  deskList: IDeskData[] = []
  spinner: boolean;
  @ViewChild('subGroupDeskForm') subGroupDeskForm: NgForm
  ngOnInit(): void {
    this.getGroupOfDesks();

    if (this.data.id) {
      this.subGroupOfDeskId = this.data.id;
      this.editMode = true;
      this.initEditMode();
    }
    else {
      this.getData();
    }
  }
  getData() {
    this.deskList = [];
    this.spinner = true;
    var user = window.atob(localStorage.getItem('token'))
    this.subGroupOfDeskService.GetAll(true).subscribe(s => {

      for (let i = 0; i < s.listOfObject.length; i++) {
        if(s.listOfObject[i].aktivan == true){
          this.groupOfDeskService.GetById(s.listOfObject[i].groupOfDeskId).subscribe(g => {
            this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(a => {
              if (g.objectId == a.listOfObject[0].objectId) {
                
                this.deskList.push({
                  subId: s.listOfObject[i].id,
                  subName: s.listOfObject[i].name, groupName: g.name
                })
              }
            })
          })
        }
        
      }
    })
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }
  getGroupOfDesks() {
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
  Delete(id: number) {
    this.dialog.open(DeleteSubGroupDeskComponent, {width: '450px', data:{id: id}})
    
  }
  initEditMode(id? :number) {
    if(id != null){
      this.subGroupOfDeskId = id;
      this.editMode = true;
    }
    this.subGroupOfDeskService.GetById(this.subGroupOfDeskId).subscribe(d => {
      this.subGroupDeskForm.controls['nameOfSubGroup'].setValue(d.name);
      this.subGroupDeskForm.controls['groupOfDeskId'].setValue(d.groupOfDeskId);

    })
  }
  onSubmit() {
    var user = window.atob(localStorage.getItem('token'))
    if (!this.subGroupDeskForm.valid)
      return;
    this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(s => {

      if (!this.editMode) {
        var u = new SubGroupOfDeskUpsertModel(this.subGroupDeskForm.value.nameOfSubGroup, Number(this.subGroupDeskForm.value.groupOfDeskId), s.listOfObject[0].objectId)
        this.subGroupOfDeskService.Insert(u).subscribe(() => { this.getData(), this.subGroupDeskForm.resetForm(), this.formGroupOfDeskId = undefined})
      }
      else {
        var u = new SubGroupOfDeskUpsertModel(this.subGroupDeskForm.value.nameOfSubGroup, Number(this.subGroupDeskForm.value.groupOfDeskId), s.listOfObject[0].objectId, true)
        this.subGroupOfDeskService.Update(this.subGroupOfDeskId, u).subscribe(() =>
        { 
          this.getData(), this.subGroupDeskForm.resetForm(), this.formGroupOfDeskId = undefined, this.editMode = false; 
        })
      }
    })
  }

}
interface IDeskData {
  subId: number;
  groupName: string;
  subName: string;
}