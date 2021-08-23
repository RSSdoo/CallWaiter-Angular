import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GroupOfArticleService } from 'src/app/api-services/group-of-article.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IGroupOfArticle } from 'src/app/shared/interface/IGroupOfArticle/IGroupOfArticle';
import { GroupOfArticleUpsertModel } from 'src/app/shared/models/groupOfArticle-upsert.model';
import { DeleteGroupDeskComponent } from '../../desks/add-group-desk/delete-group-desk/delete-group-desk.component';
import { DeleteGroupArticleComponent } from './delete-group-article/delete-group-article.component';

@Component({
  selector: 'app-add-group-article',
  templateUrl: './add-group-article.component.html',
  styleUrls: ['./add-group-article.component.css']
})
export class AddGroupArticleComponent implements OnInit {
  spinner: boolean;

 
  constructor(private groupOfArticleService: GroupOfArticleService, private authService: AuthService,
    private dialog: MatDialog) { }

  editMode=false;
  @ViewChild('groupArticleForm') groupArticleForm: NgForm
  groupOfArticleList: IGroupOfArticle[] = [];
  groupOfDeskId: number;
  objectId: number;
  ngOnInit(): void {
    this.getGroupOfDeskList();
  }
  getGroupOfDeskList() {
    this.spinner = true;
    this.groupOfArticleList = []
    var user = window.atob(localStorage.getItem('token'))
    this.groupOfArticleService.GetAll(null, null).subscribe(s => {
      s.listOfObject.forEach(f => {
        if(f.aktivan){
          this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(s => {
            if (f.objectId == s.listOfObject[0].objectId) {
              this.groupOfArticleList.push({ id: f.id, nameOfGroup: f.nameOfGroup})
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
    this.groupOfArticleService.GetById(this.groupOfDeskId).subscribe(d => {
      this.groupArticleForm.controls['nameOfGroup'].setValue(d.nameOfGroup);
    })
  }
  Delete(id: number){
    this.dialog.open(DeleteGroupArticleComponent, {width: '450px' , data:{id: id}})
  }
  onSubmit(){
    var user = window.atob(localStorage.getItem('token'))
    if (!this.groupArticleForm.valid)
      return;
    this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(s => {

      if (!this.editMode) {
        var u = new GroupOfArticleUpsertModel(this.groupArticleForm.value.nameOfGroup, s.listOfObject[0].objectId)
        this.groupOfArticleService.Insert(u).subscribe(() => {
            this.getGroupOfDeskList()
         })
      }
      else {
        var u = new GroupOfArticleUpsertModel(this.groupArticleForm.value.nameOfGroup, s.listOfObject[0].objectId, true)
        console.log(u);
        this.groupOfArticleService.Update(this.groupOfDeskId, u).subscribe(() => {
          this.groupArticleForm.resetForm()
          this.editMode = false;
          this.getGroupOfDeskList()

         })
      }
    })
  }

}
