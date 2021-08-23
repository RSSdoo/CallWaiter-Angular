import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubGroupOfDeskService } from 'src/app/api-services/sub-group-of-desk.service';
import { SubGroupOfDeskUpsertModel } from 'src/app/shared/models/subGroupOfDesk-upsert.model';
import { AddSubGroupDeskComponent } from '../add-sub-group-desk.component';

@Component({
  selector: 'app-delete-sub-group-desk',
  templateUrl: './delete-sub-group-desk.component.html',
  styleUrls: ['./delete-sub-group-desk.component.css']
})
export class DeleteSubGroupDeskComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private subGroupOfDeskService: SubGroupOfDeskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    
  }
  Delete(){
    this.subGroupOfDeskService.GetById(this.data.id).subscribe(d => {
      var u = new SubGroupOfDeskUpsertModel(d.name, d.groupOfDeskId, 1, false)
      this.subGroupOfDeskService.Update(d.id, u).subscribe(s => {
          this.dialog.closeAll();
          this.dialog.open(AddSubGroupDeskComponent, {width: '600px' , data:{id: null}})
      })
    })
  }

}
