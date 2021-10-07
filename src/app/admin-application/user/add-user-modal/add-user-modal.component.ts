import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ObjectService } from 'src/app/api-services/object.service';
import { UserService } from 'src/app/api-services/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IObject } from 'src/app/shared/interface/IObject/IObject';
import { IUser } from 'src/app/shared/interface/IUser/IUser';
import { ObjectUpsertModel } from 'src/app/shared/models/object-upsert.model';
import { UserUpsertModel } from 'src/app/shared/models/user-upsert.model';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {
  public objectList:IObject[] = [];
  public UserList:IUser[] = [];
  formObjectId: number;

  @ViewChild('addUserForm') addUserForm: NgForm

  constructor(public _ObjectService:ObjectService,public _UserService:UserService,private dialog: MatDialog,private authService: AuthService) { }

  ngOnInit(): void {
    this.LoadObjects();
    
  }
  LoadObjects(){
    this._ObjectService.GetAll().subscribe(o=>{
      for(let i=0;i<o.listOfObject.length;i++)
      {
        this.objectList.push(o.listOfObject[i]);
      }
    })

    this._UserService.GetAll().subscribe(u=>{
      for(let i=0;i<u.listOfObject.length;i++)
      {
        this.UserList.push(u.listOfObject[i]);
      }
    })
    console.log(this.UserList);
  }
  onSubmit(){
    var object = new ObjectUpsertModel(this.addUserForm.value.object)
    this._ObjectService.Insert(object).subscribe(t=> {
      var user=new UserUpsertModel(this.addUserForm.value.name,this.addUserForm.value.adress,this.addUserForm.value.city,
        this.addUserForm.value.country,this.addUserForm.value.idNumber,this.addUserForm.value.mobile,this.addUserForm.value.mail,
        this.addUserForm.value.username,this.addUserForm.value.password, t['id'], this.addUserForm.value.vatnumber);
      
        this._UserService.Insert(user).subscribe(data=>{
          this.dialog.closeAll();
        })
      
    })
      
  }
}