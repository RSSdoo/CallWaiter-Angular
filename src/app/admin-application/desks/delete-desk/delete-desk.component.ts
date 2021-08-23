import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeskService } from 'src/app/api-services/desk.service';
import { DeskUpsertModel } from 'src/app/shared/models/desk-upsert.model';

@Component({
  selector: 'app-delete-desk',
  templateUrl: './delete-desk.component.html',
  styleUrls: ['./delete-desk.component.css']
})
export class DeleteDeskComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private deskService: DeskService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  Delete(){
    this.deskService.GetById(this.data.id).subscribe(s=>{
      var u = new DeskUpsertModel(s.groupOfDeskId, s.subGroupOfDeskId, s.numberOfDesk, s.statusOfDeskId, s.objectId, false)
      this.deskService.Update(s.id, u).subscribe(()=>{location.reload()})
    })

  }
}
