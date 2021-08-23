import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ArticleService } from 'src/app/api-services/article.service';
import { ArticleUpsertModel } from 'src/app/shared/models/article-upsert.model';

@Component({
  selector: 'app-delete-article',
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.css']
})
export class DeleteArticleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private articleService: ArticleService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  Delete(){
    this.articleService.GetById(this.data.articleId).subscribe(d => {
      var u = new ArticleUpsertModel(d.name, d.price, d.objectId, d.groupOfArticleId, d.typeOfGroupArticleId, d.image, false)
      this.articleService.Update(d.id, u).subscribe(s=>{
        this.dialog.closeAll();
        location.reload();
      })
  })
  }

}
