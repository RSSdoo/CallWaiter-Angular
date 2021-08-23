import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ArticleService } from 'src/app/api-services/article.service';
import { GroupOfArticleService } from 'src/app/api-services/group-of-article.service';
import { TypeOfGroupArticleService } from 'src/app/api-services/type-of-group.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IGroupOfArticle } from 'src/app/shared/interface/IGroupOfArticle/IGroupOfArticle';
import { ITypeOfGroupArticle } from 'src/app/shared/interface/ITypeOfGroupArticle/ITypeOfGroupArticle';
import { ArticleUpsertModel } from 'src/app/shared/models/article-upsert.model';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {


  constructor(private authService : AuthService, private articleService: ArticleService, 
   private groupOfArticleService: GroupOfArticleService,  @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,
   private typeOfGroupArticleService: TypeOfGroupArticleService) { }
  @ViewChild('articleForm') articleForm: NgForm;
  formGroupOfArticle : number;
  editMode= false;
  imageChangedEvent: any = '';
  base64Slika: string;
  groupOfArticleList: IGroupOfArticle[] = []
  articleId: number;
  note: string;
  editFood = false;
  typeOfArticleList: ITypeOfGroupArticle[] = []
  typeOfArticleId: number;
  ngOnInit(): void {
    if(this.data.articleId){
      this.editMode = true;
      this.articleId = this.data.articleId;
      this.initEditMode();

    }
    this.getGroupOfArticles();
  }
  initEditMode(){
      this.articleService.GetById(this.articleId).subscribe(f=>{
          this.articleForm.controls['nameOfArticle'].setValue(f.name)
          this.articleForm.controls['price'].setValue(f.price)
          this.articleForm.controls['groupOfArticleId'].setValue(f.groupOfArticleId)
          this.getTypeOfGroupArticles();
          this.articleForm.controls['typeOfGroupArticleId'].setValue(f.typeOfGroupArticleId)
          if(f.note != null){
            this.editFood = true;
            this.articleForm.controls['note'].setValue(f.note);
          }
          
      })  
  }
  onSubmit(){
    var user = window.atob(localStorage.getItem('token'))
    this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(f=>{
      if(!this.editMode){
        var v = new ArticleUpsertModel(this.articleForm.value.nameOfArticle, this.articleForm.value.price,
          f.listOfObject[0].objectId, this.articleForm.value.groupOfArticleId, this.articleForm.value.typeOfGroupArticleId, "null", true, this.articleForm.value.note)
          this.articleService.Insert(v).subscribe(f=>{this.dialog.closeAll();})      
      }
      else{
        this.articleService.GetById(this.articleId).subscribe(a=>{
          var v = new ArticleUpsertModel(this.articleForm.value.nameOfArticle, this.articleForm.value.price,
            a.objectId, this.articleForm.value.groupOfArticleId, this.articleForm.value.typeOfGroupArticleId, a.image, true, this.articleForm.value.note)
            this.articleService.Update(this.articleId, v).subscribe(f=>{ 
              location.reload() 
            })   
        })
     
      }
    
    })
  }
  getGroupOfArticles(){
    this.groupOfArticleList = []
    this.groupOfArticleService.GetAll(null, null, Number(atob(atob(atob(localStorage.getItem('object')))))).subscribe(s => {
      s.listOfObject.forEach(f => {
        if(f.aktivan){
              this.groupOfArticleList.push({ id: f.id, nameOfGroup: f.nameOfGroup})
        } 
      })
    })
  }
  getTypeOfGroupArticles(){
    this.typeOfGroupArticleService.GetAll(this.articleForm.value.groupOfArticleId).subscribe(f=>{
      this.typeOfArticleList = f.listOfObject
    })
  }
  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64Slika = btoa(binaryString);
  }
  fileChangeEvent($event) {
    this.imageChangedEvent = event;
    var file: File = $event.target.files[0];
    var reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }

}
