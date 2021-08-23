import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GroupOfDeskService } from 'src/app/api-services/group-of-desk.service';
import { GroupOfDeskUpsertModel } from 'src/app/shared/models/groupOfDesk-upsert.model';
import { AddGroupDeskComponent } from '../add-group-desk.component';

@Component({
  selector: 'app-delete-group-desk',
  templateUrl: './delete-group-desk.component.html',
  styleUrls: ['./delete-group-desk.component.css']
})
export class DeleteGroupDeskComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private groupOfDeskService: GroupOfDeskService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  Delete(){
    this.groupOfDeskService.GetById(this.data.id).subscribe(d => {
      var u = new GroupOfDeskUpsertModel(d.name, d.objectId, false)
      this.groupOfDeskService.Update(d.id, u).subscribe(s=>{
        this.dialog.closeAll();
        this.dialog.open(AddGroupDeskComponent, {width: '600px' , data:{id: null}})
      })
  })
  }
  

}
