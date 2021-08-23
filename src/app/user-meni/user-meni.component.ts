import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AddArticleComponent } from '../admin-application/restaurant-menu/add-article/add-article.component';
import { DeleteArticleComponent } from '../admin-application/restaurant-menu/add-article/delete-article/delete-article.component';
import { ArticleService } from '../api-services/article.service';
import { DeskService } from '../api-services/desk.service';
import { GroupOfArticleService } from '../api-services/group-of-article.service';
import { TypeOfGroupArticleService } from '../api-services/type-of-group.service';
import { AuthService } from '../auth/auth.service';
import { IArticle } from '../shared/interface/IArticle/IArticle';
import { IGroupOfArticle } from '../shared/interface/IGroupOfArticle/IGroupOfArticle';
import { IGroupOfArticleList } from '../shared/interface/IGroupOfArticle/IGroupOfArticle-list';
import { ITypeOfGroupArticle } from '../shared/interface/ITypeOfGroupArticle/ITypeOfGroupArticle';
import { ITypeOfGroupArticleList } from '../shared/interface/ITypeOfGroupArticle/ITypeOfGroupArticle-list';
import { ArticleUpsertModel } from '../shared/models/article-upsert.model';

@Component({
  selector: 'app-user-meni',
  templateUrl: './user-meni.component.html',
  styleUrls: ['./user-meni.component.css']
})
export class UserMeniComponent implements OnInit {

  articleId: number;
  slika: string;
  note: string;
  typeOfGroupId: number;
  objectid: number;

  constructor(private articleService: ArticleService, private deskService : DeskService, private groupOfArticleService: GroupOfArticleService, private dialog: MatDialog,
    private params :ActivatedRoute, private typeOfGroupArticleService: TypeOfGroupArticleService) { }
  articleList: IArticle[]=[];
  pageNumber : number
  spineer = false;
  hasPrevious : boolean;
  hasNext : boolean;
  currentPage: number;
  groupId = 9;
  deskId: number;
  groupOfArticleList: IGroupOfArticleList;
  typeOfGroupArticleList : ITypeOfGroupArticleList;
  groupOfArticle: IGroupOfArticle[] = []
  typeOfGroups: ITypeOfGroupArticle [] = [];
  objectId: number;
   public innerWidth: any;
  ngOnInit(): void {
    // if(this.params.snapshot.params['id']){
    //   this.deskId = this.params.snapshot.params['id'];
    // }
    if(this.params.snapshot.params['id']){
      this.objectId = this.params.snapshot.params['id'];
    }
    this.getTypeOfGroupArticleList();
    this.getGroupOfArticleList();
    this.getArticle();

  }
  openTypesOfGroups(item: number){
    this.groupOfArticle.find(f=>f.id== item).types = this.typeOfGroupArticleList.listOfObject.filter(f=>f.groupOfArticleId == item) 
    this.getArticle(1, item);
  }

  w3_open(){
    document.getElementById("mySidebar").style.display = "block";
  }
  w3_close(){
    document.getElementById("mySidebar").style.display = "none" ;
  }
  async getGroupOfArticleList(){
    // const desk = await this.deskService.GetById(this.deskId).toPromise()
    this.groupOfArticleList =  await this.groupOfArticleService.GetAll(undefined, undefined, this.objectId).toPromise();
    this.groupOfArticle = await this.groupOfArticleList.listOfObject;
    // const desk = await this.deskService.GetById(this.deskId).toPromise()
    // this.groupOfArticleList =  await this.groupOfArticleService.GetAll(undefined, undefined, desk.objectId).toPromise();
    // this.groupOfArticle = await this.groupOfArticleList.listOfObject;
  }
  async getTypeOfGroupArticleList(){
    // const desk = await this.deskService.GetById(this.deskId).toPromise()
    this.typeOfGroupArticleList = await this.typeOfGroupArticleService.GetAll(undefined,this.objectId).toPromise();
    // const desk = await this.deskService.GetById(this.deskId).toPromise()
    // this.typeOfGroupArticleList = await this.typeOfGroupArticleService.GetAll(undefined,desk.objectId).toPromise();
  }

  async getArticle(page?: number, groupId?: number, typeOfGroupId?: number) {
    // const desk = await this.deskService.GetById(this.deskId).toPromise()
    this.groupId = groupId;
    this.typeOfGroupId = typeOfGroupId;
    this.articleList = []
    this.spineer = true;

    this.articleService.GetAll(undefined, undefined, this.groupId, this.objectId , true,this.typeOfGroupId).subscribe(f => {
      this.currentPage = f.currentPage;
      this.hasPrevious = f.hasPrevious;
      this.hasNext = f.hasNext;
      for (let i = 0; i < f.listOfObject.length; i++) {
        this.articleList.push
        ({
          id: f.listOfObject[i].id,
          name: f.listOfObject[i].name, price: f.listOfObject[i].price, objectId: f.listOfObject[i].objectId, 
          groupOfArticleName: this.groupOfArticleList.listOfObject.find(a=>a.id == f.listOfObject[i].groupOfArticleId).nameOfGroup,
          image: atob(f.listOfObject[i].image), groupOfArticleId: f.listOfObject[i].groupOfArticleId, typeOfGroupArticleId: f.listOfObject[i].typeOfGroupArticleId,
          typeOfGroupArticleName: this.typeOfGroupArticleList.listOfObject.find(t=> t.id == f.listOfObject[i].typeOfGroupArticleId).name
        });
        this.articleList.sort((a, b) => a.price - b.price)
      }
    })
    setTimeout(() => {
      this.spineer = false;
    }, 500);
  }




  





}
