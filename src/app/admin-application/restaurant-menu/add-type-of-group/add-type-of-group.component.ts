import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GroupOfArticleService } from 'src/app/api-services/group-of-article.service';
import { TypeOfGroupArticleService } from 'src/app/api-services/type-of-group.service';
import { IGroupOfArticle } from 'src/app/shared/interface/IGroupOfArticle/IGroupOfArticle';
import { IGroupOfArticleList } from 'src/app/shared/interface/IGroupOfArticle/IGroupOfArticle-list';
import { ITypeOfGroupArticle } from 'src/app/shared/interface/ITypeOfGroupArticle/ITypeOfGroupArticle';
import { TypeOfGroupArticleUpsertModel } from 'src/app/shared/models/type-of-group-article-upsert.model';
import { DeleteTypeOfGroupArticleComponent } from './delete-type-of-group-article/delete-type-of-group-article.component';
@Component({
  selector: 'app-type-of-group',
  templateUrl: './add-type-of-group.component.html',
  styleUrls: ['./add-type-of-group.component.css']
})
export class AddTypeOfGroupComponent implements OnInit {
  typeOfGroupArticleId: number;

  constructor(private groupOfArticleService: GroupOfArticleService, private typeOfGroupArticleService: TypeOfGroupArticleService, private dialog: MatDialog) { }
  editMode = false;
  formGroupOfArticleId: number;
  groupOfGroupArticleList: IGroupOfArticle[] = []
  spinner = true;
  loggedInObject : number = Number(atob(atob(atob(localStorage.getItem('object')))))
  typeOfArticleList: ITypeOfGroupArticle []=[]
  @ViewChild('typeOfGroupArticleForm') typeOfGroupArticleForm: NgForm;
  ngOnInit(): void {
    this.getGroupOfArticle();
    this.getTypeOfGroupOfArticle();

  }
  getGroupOfArticle(){
    this.groupOfArticleService.GetAll(undefined, undefined, this.loggedInObject).subscribe(f=>{
        this.groupOfGroupArticleList = f.listOfObject
    })
 }
  getTypeOfGroupOfArticle(){
    if(this.typeOfArticleList.length>0){
       this.typeOfArticleList = []
    }
    setTimeout(() => {
      this.typeOfGroupArticleService.GetAll(undefined, this.loggedInObject).subscribe(f=>{
        f.listOfObject.forEach(f=>{
          this.typeOfArticleList.push({name: f.name, id: f.id, 
            groupOfArticleName: this.groupOfGroupArticleList.find(a=>a.id == f.groupOfArticleId).nameOfGroup
            , groupOfArticleId: f.groupOfArticleId})
        })
        this.spinner = false;
    })
    }, 1500);
 
  }
  onSubmit(){
    var type = new TypeOfGroupArticleUpsertModel(this.typeOfGroupArticleForm.value.nameOfType, Number(this.typeOfGroupArticleForm.value.groupOfArticleId), this.loggedInObject)
    if(!this.editMode){
      this.typeOfGroupArticleService.Insert(type).subscribe(f=>{
        this.getTypeOfGroupOfArticle();
      })
    }
    else{
      this.typeOfGroupArticleService.Update(this.typeOfGroupArticleId, type).subscribe(f=>{
        this.editMode = false;
        this.typeOfGroupArticleForm.reset()
        this.formGroupOfArticleId = undefined;
        this.getTypeOfGroupOfArticle();
      })
    }
     

  } 

  initEditMode(item: number){
      this.editMode = true;
      this.typeOfGroupArticleId= item;
      this.typeOfGroupArticleService.GetById(item).subscribe(f=>{
        this.typeOfGroupArticleForm.controls['nameOfType'].setValue(f.name)
        this.typeOfGroupArticleForm.controls['groupOfArticleId'].setValue(f.groupOfArticleId)
      })

  }
  Delete(item: number){
    this.dialog.open(DeleteTypeOfGroupArticleComponent, {width: '600px', data:{id: item}})
  }

}
