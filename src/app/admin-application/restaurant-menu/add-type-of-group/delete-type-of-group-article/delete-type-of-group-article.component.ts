import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TypeOfGroupArticleService } from 'src/app/api-services/type-of-group.service';
import { TypeOfGroupArticleUpsertModel } from 'src/app/shared/models/type-of-group-article-upsert.model';
import { AddTypeOfGroupComponent } from '../add-type-of-group.component';

@Component({
  selector: 'app-delete-type-of-group-article',
  templateUrl: './delete-type-of-group-article.component.html',
  styleUrls: ['./delete-type-of-group-article.component.css']
})
export class DeleteTypeOfGroupArticleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private typeOfGroupArticleService: TypeOfGroupArticleService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  Delete(){
    this.typeOfGroupArticleService.GetById(this.data.id).subscribe(d => {
      var u = new TypeOfGroupArticleUpsertModel(d.name, d.groupOfArticleId, d.objectId, false)
      this.typeOfGroupArticleService.Update(d.id, u).subscribe(s=>{
        this.dialog.closeAll();
        this.dialog.open(AddTypeOfGroupComponent, {width: '600px' , data:{id: null}})
      })
  })
  }
}
