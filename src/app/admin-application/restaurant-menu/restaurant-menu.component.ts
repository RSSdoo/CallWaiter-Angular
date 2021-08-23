import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { count } from 'rxjs/operators';
import { ArticleService } from 'src/app/api-services/article.service';
import { GroupOfArticleService } from 'src/app/api-services/group-of-article.service';
import { TypeOfGroupArticleService } from 'src/app/api-services/type-of-group.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IArticle } from 'src/app/shared/interface/IArticle/IArticle';
import { IGroupOfArticle } from 'src/app/shared/interface/IGroupOfArticle/IGroupOfArticle';
import { IGroupOfArticleList } from 'src/app/shared/interface/IGroupOfArticle/IGroupOfArticle-list';
import { ITypeOfGroupArticle } from 'src/app/shared/interface/ITypeOfGroupArticle/ITypeOfGroupArticle';
import { ITypeOfGroupArticleList } from 'src/app/shared/interface/ITypeOfGroupArticle/ITypeOfGroupArticle-list';
import { ArticleUpsertModel } from 'src/app/shared/models/article-upsert.model';
import { AddArticleComponent } from './add-article/add-article.component';
import { DeleteArticleComponent } from './add-article/delete-article/delete-article.component';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { GenerateQrcodeService } from 'src/app/api-services/generate-qrcode.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute  } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {
  articleId: number;
  slika: string;

  constructor(private articleService: ArticleService, private authService: AuthService, private groupOfArticleService: GroupOfArticleService, private dialog: MatDialog,
    private typeOfGroupArticleService : TypeOfGroupArticleService, private qrcodegenerator: GenerateQrcodeService, private router: Router, private activatedRoute: ActivatedRoute) { }
  articleList: IArticle[] = [];
  pageNumber: number
  spineer = false;
  hasPrevious: boolean;
  hasNext: boolean;
  currentPage: number;
  groupId = 9;
  loggedInObject: number = Number(atob(atob(atob(localStorage.getItem('object')))))
  groupOfArticleList: IGroupOfArticleList;
  typeOfGroupArticleList : ITypeOfGroupArticleList;
  groupOfArticle: IGroupOfArticle[] = []
  typeOfGroups: ITypeOfGroupArticle [] = [];
  typeOfGroupId: number;
  qrInfo: string = "https://callwaiter.tk/#/meni/" + this.loggedInObject;
  ngOnInit(): void {
    this.getGroupOfArticleList()
    this.getTypeOfGroupArticleList();
    this.getArticle();
    console.log(this.loggedInObject)
  }
  async getGroupOfArticleList(){
    this.groupOfArticleList =  await this.groupOfArticleService.GetAll(undefined, undefined, this.loggedInObject).toPromise();
    this.groupOfArticle = this.groupOfArticleList.listOfObject;
  }
  async getTypeOfGroupArticleList(){
    this.typeOfGroupArticleList = await this.typeOfGroupArticleService.GetAll(undefined, this.loggedInObject).toPromise();
  }
  w3_open(){
    document.getElementById("mySidebar").style.display = "block";
  }
  w3_close(){
    document.getElementById("mySidebar").style.display = "none";
  }
  openTypesOfGroups(item: number){
    this.groupOfArticle.find(f=>f.id== item).types = this.typeOfGroupArticleList.listOfObject.filter(f=>f.groupOfArticleId == item) 
    this.getArticle(1, item);
  }
  getArticle(page?: number, groupId?: number, typeOfGroupId?: number) {
    if (page != null) {
      this.pageNumber = page;
    }
    this.groupId = groupId;
    this.typeOfGroupId = typeOfGroupId;
    this.articleList = []
    this.spineer = true;
    console.log(this.loggedInObject);
    this.articleService.GetAll(this.pageNumber, null, this.groupId, this.loggedInObject, false,this.typeOfGroupId).subscribe(f => {
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
  deleteArticle(id: number) {
    this.dialog.open(DeleteArticleComponent, { width: '600px', data: { articleId: id } })
  }
  imageChangedEvent: any = '';
  public base64Slika: string;
  croppedImage: any = '';

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64Slika = btoa(binaryString);
  }
  fileChangeEvent($event) {

    this.imageChangedEvent = event;
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    var myReader: FileReader = new FileReader();
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
    };
    myReader.readAsDataURL(file);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  SaveArticleId(id: number) {
    this.articleId = id
  }
  UpdateForImage() {
    this.articleService.GetById(this.articleId).subscribe(f => {
      var n = new ArticleUpsertModel(f.name, f.price, f.objectId, f.groupOfArticleId, f.typeOfGroupArticleId, btoa(this.croppedImage), true, f.note);
      this.articleService.Update(f.id, n).subscribe(f => {
        location.reload()
      })
    })
  }
  openAddDeskModal(id: number) {
    this.dialog.open(AddArticleComponent, { width: '500px', data: { articleId: id } })
  }
  pdfMeni(){
    this.qrcodegenerator.Get(window.location.href.substring(0, window.location.href.indexOf("#")   /*.length - 8*/) + "#/meni/" + this.loggedInObject).subscribe(s=> {

      var body = [];
      var qrCode = "data:image/png;base64," + s;
      var row = [
        
        {
          image:  qrCode,
          width: 450,       
        },
        {
          
          text: "Meni: ", bold: true,
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
}
