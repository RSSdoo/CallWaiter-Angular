import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupOfDeskService } from 'src/app/api-services/group-of-desk.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IDesk } from 'src/app/shared/interface/IDesk/IDesk';
import { IGroupOfDesks } from 'src/app/shared/interface/IGroupOfDesk/IGroup-of-desks';
import { GroupOfDeskUpsertModel } from 'src/app/shared/models/groupOfDesk-upsert.model';
import { DeleteGroupDeskComponent } from './delete-group-desk/delete-group-desk.component';

@Component({
  selector: 'app-add-group-desk',
  templateUrl: './add-group-desk.component.html',
  styleUrls: ['./add-group-desk.component.css']
})
export class AddGroupDeskComponent implements OnInit {

  constructor(private groupOfDeskService: GroupOfDeskService, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private authService: AuthService, 
    private dialog: MatDialog) { }
  editMode = false;
  groupOfDeskId: number;
  objectId: number;
  deskList: IGroupOfDesks[] = [];
  spinner = false;
  @ViewChild('addGroupDeskForm') groupDeskForm: NgForm

  ngOnInit(): void {
    this.getGroupOfDeskList();

    if (this.data.id) {
      this.groupOfDeskId = this.data.id;
      this.editMode = true;
      this.initEditMode();
    }
   
  }
  getGroupOfDeskList() {
    this.spinner = true;
    this.deskList = []
    var user = window.atob(localStorage.getItem('token'))
    this.groupOfDeskService.GetAll(null, null, true).subscribe(s => {

      s.listOfObject.forEach(f => {
        if(f.aktivan){
          this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(s => {
            if (f.objectId == s.listOfObject[0].objectId) {
              this.deskList.push({ id: f.id, name: f.name})
            }
          })
        }
       
      })
    })
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }
  initEditMode(id?) {
    if(id!=null){
      this.groupOfDeskId = id;
      this.editMode = true;
    }
    this.groupOfDeskService.GetById(this.groupOfDeskId).subscribe(d => {
      this.groupDeskForm.controls['nameOfGroup'].setValue(d.name);
    })
  }
  Delete(id: number){
    this.dialog.open(DeleteGroupDeskComponent, {width: '450px' , data:{id: id}})
  }
  onSubmit() {
    var user = window.atob(localStorage.getItem('token'))
    if (!this.groupDeskForm.valid)
      return;
    this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(s => {

      if (!this.editMode) {
        var u = new GroupOfDeskUpsertModel(this.groupDeskForm.value.nameOfGroup, s.listOfObject[0].objectId)
        this.groupOfDeskService.Insert(u).subscribe(() => {
            this.getGroupOfDeskList()

         })
      }
      else {
        var u = new GroupOfDeskUpsertModel(this.groupDeskForm.value.nameOfGroup, s.listOfObject[0].objectId, true)
        this.groupOfDeskService.Update(this.groupOfDeskId, u).subscribe(() => {
          this.groupDeskForm.resetForm()
          this.editMode = false;
          this.getGroupOfDeskList()

         })
      }
    })

  }

}
