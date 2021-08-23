import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocialNetworkLinkService } from 'src/app/api-services/social-network-link.service';
import { SocialNetworkLinkUpsertModel } from 'src/app/shared/models/socialNetworkLink-upsert.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-social-networks-modal',
  templateUrl: './social-networks-modal.component.html',
  styleUrls: ['./social-networks-modal.component.css']
})
export class SocialNetworksModalComponent implements OnInit {
  editMode = false;
  objectId: number;
  link1: number;
  link2: number;
  link3: number;
  link4: number;
  @ViewChild('addsnlinks') addsnlinks: NgForm
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private socialNetworkLinkService: SocialNetworkLinkService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.data.id) {
      this.objectId = this.data.id;
      this.editMode = true;
      this.initEditMode();
    }
  }
  async initEditMode(){
    await this.socialNetworkLinkService.GetAll(undefined,undefined,this.objectId,1,true).subscribe(s=>{
      if(s.listOfObject.length){
        this.addsnlinks.controls["tripadvisor"].setValue(s.listOfObject[0].link);
        this.link1 = s.listOfObject[0].id;
      }else{
        var snUpsert = new SocialNetworkLinkUpsertModel("",this.objectId,1);
        this.socialNetworkLinkService.Insert(snUpsert).subscribe(i=> { var temp = i as InsertSocialNetwork; this.link1 = temp.id; });
      }
    });
    await this.socialNetworkLinkService.GetAll(undefined,undefined,this.objectId,2,true).subscribe(s=>{
      if(s.listOfObject.length){
        this.addsnlinks.controls["google"].setValue(s.listOfObject[0].link);
        this.link2 = s.listOfObject[0].id;
      }else{
        var snUpsert = new SocialNetworkLinkUpsertModel("",this.objectId,2);
        this.socialNetworkLinkService.Insert(snUpsert).subscribe(i=> { var temp = i as InsertSocialNetwork; this.link2 = temp.id; });
      }
    });
    await this.socialNetworkLinkService.GetAll(undefined,undefined,this.objectId,3,true).subscribe(s=>{
      if(s.listOfObject.length){
        this.addsnlinks.controls["facebook"].setValue(s.listOfObject[0].link);
        this.link3 = s.listOfObject[0].id;
      }else{
        var snUpsert = new SocialNetworkLinkUpsertModel("",this.objectId,3);
        this.socialNetworkLinkService.Insert(snUpsert).subscribe(i=> { var temp = i as InsertSocialNetwork; this.link3 = temp.id; });
      }
    });
    await this.socialNetworkLinkService.GetAll(undefined,undefined,this.objectId,4,true).subscribe(s=>{
      if(s.listOfObject.length){
        this.addsnlinks.controls["instagram"].setValue(s.listOfObject[0].link);
        this.link4 = s.listOfObject[0].id;
      }else{
        var snUpsert = new SocialNetworkLinkUpsertModel("",this.objectId,4);
        this.socialNetworkLinkService.Insert(snUpsert).subscribe(i=> { var temp = i as InsertSocialNetwork; this.link4 = temp.id; });
      }
    });
  }
  onSubmit(){
    var u = new SocialNetworkLinkUpsertModel(this.addsnlinks.value.tripadvisor,this.objectId, 1);
    this.socialNetworkLinkService.Update(this.link1, u).subscribe();
    var u = new SocialNetworkLinkUpsertModel(this.addsnlinks.value.google,this.objectId, 1);
    this.socialNetworkLinkService.Update(this.link2, u).subscribe();
    var u = new SocialNetworkLinkUpsertModel(this.addsnlinks.value.facebook,this.objectId, 1);
    this.socialNetworkLinkService.Update(this.link3, u).subscribe();
    var u = new SocialNetworkLinkUpsertModel(this.addsnlinks.value.instagram,this.objectId, 1);
    this.socialNetworkLinkService.Update(this.link4, u).subscribe();
    this.dialog.closeAll();
  }
}
export class InsertSocialNetwork { constructor(public id: number, public link: string, public objectId: number, public socialNetworkId: number){}}