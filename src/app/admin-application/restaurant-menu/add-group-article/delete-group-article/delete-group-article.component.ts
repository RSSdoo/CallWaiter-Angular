import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GroupOfArticleService } from 'src/app/api-services/group-of-article.service';
import { GroupOfArticleUpsertModel } from 'src/app/shared/models/groupOfArticle-upsert.model';
import { GroupOfDeskUpsertModel } from 'src/app/shared/models/groupOfDesk-upsert.model';
import { AddGroupArticleComponent } from '../add-group-article.component';

@Component({
  selector: 'app-delete-group-article',
  templateUrl: './delete-group-article.component.html',
  styleUrls: ['./delete-group-article.component.css']
})
export class DeleteGroupArticleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private groupOfArticleService: GroupOfArticleService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  Delete(){
    this.groupOfArticleService.GetById(this.data.id).subscribe(d => {
      var u = new GroupOfArticleUpsertModel(d.nameOfGroup, d.objectId, false)
      this.groupOfArticleService.Update(d.id, u).subscribe(s=>{
        this.dialog.closeAll();
        this.dialog.open(AddGroupArticleComponent, {width: '600px' , data:{id: null}})
      })
  })
  }
}
