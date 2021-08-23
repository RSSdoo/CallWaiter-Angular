import { IfStmt } from '@angular/compiler';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ClientDeskService } from 'src/app/api-services/client-desk.service';
import { DeskService } from 'src/app/api-services/desk.service';
import { StatusOfDeskService } from 'src/app/api-services/status-of-desk.service';
import { TypeOfPaymentService } from 'src/app/api-services/type-of-payment.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IDesk } from 'src/app/shared/interface/IDesk/IDesk';
import { IDeskList } from 'src/app/shared/interface/IDesk/IDesk-list';
import { DeskUpsertModel } from 'src/app/shared/models/desk-upsert.model';
// import { ClientDeskService } from 'src/app/api-services/client-desk.service';
// import { DeskService } from 'src/app/api-services/desk.service';
// import { IDesk } from 'src/shared/interface/IDesk/IDesk';
// import { IDeskList } from 'src/shared/interface/IDesk/IDesk-list';

@Component({
  selector: 'app-desks',
  templateUrl: './desks.component.html',
  styleUrls: ['./desks.component.css']
})
export class DesksComponent implements OnInit {
  subscription: Subscription;
  message: string;
  number: number;
  counter = 0;
  interval: any;
  deskList: IDesk[] = [];
  typeOfPayment: string;
  muted = true;
  @Input() receivedParentMessage: string;
  constructor(private deskService: DeskService, private typeOfService: TypeOfPaymentService, private desk: ClientDeskService, private typeOfPaymentService: TypeOfPaymentService,
    private authService: AuthService) {
    this.desk.getMessage().subscribe(s => console.log(s))
  }
  ngOnInit(): void {
    clearInterval(this.interval);
    this.getDesks();
    this.interval = setInterval(() => { this.checkChange() }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  getDesks() {
    var user = window.atob(localStorage.getItem('token'))
    this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(a => {
      this.deskService.GetAll(undefined, undefined, true, a.listOfObject[0].objectId).subscribe(s => {
        for (let i = 0; i < s.listOfObject.length; i++) {
            this.deskList.push(s.listOfObject[i]);
            if (s.listOfObject[i].typeOfPaymentId != null) {
                this.typeOfPaymentService.GetById(s.listOfObject[i].typeOfPaymentId).subscribe(f=>{
                    this.deskList[i].typeOfPaymentName = f.name
                })
            }
        }
          
      })
    })
  }
  playAudio() {
    let audio = new Audio();

    audio.src = "../../../assets/notifySound.mp3";
    audio.load();
    audio.muted = this.muted;
    audio.play();
  }
  checkChange() {
    var tenMinutes = 1000 * 60 * 10; //deset minuta
    var user = window.atob(localStorage.getItem('token'))
    this.authService.get(user.substring(0, user.indexOf(':'))).subscribe(a => {
    
    this.deskService.GetAll(undefined, undefined, true, a.listOfObject[0].objectId).subscribe(s => {
      for (let i = 0; i < s.listOfObject.length; i++) {
      
        if (s.listOfObject[i].statusOfDeskId != this.deskList[i].statusOfDeskId) {
          this.deskList[i].statusOfDeskId = s.listOfObject[i].statusOfDeskId;
          if (this.deskList[i].statusOfDeskId == 5) {
              this.typeOfPaymentService.GetById(s.listOfObject[i].typeOfPaymentId).subscribe(f=>{
                  this.deskList[i].typeOfPaymentName = f.name
              })
              this.deskList[i].typeOfPaymentId = s.listOfObject[i].typeOfPaymentId;
          }
          this.muted = false;
          this.playAudio();
        }
        if(s.listOfObject[i].typeOfPaymentId != this.deskList[i].typeOfPaymentId && s.listOfObject[i].typeOfPaymentId != null && this.deskList[i].typeOfPaymentId != null){
          this.deskList[i].typeOfPaymentId = s.listOfObject[i].typeOfPaymentId;
            this.typeOfPaymentService.GetById(s.listOfObject[i].typeOfPaymentId).subscribe(f=>{
              this.deskList[i].typeOfPaymentName = f.name
          })
          this.muted = false;
          this.playAudio();
        }
        if(s.listOfObject[i].startTime != null && s.listOfObject[i].statusOfDeskId != 1){
           var d = new Date(s.listOfObject[i].startTime);
           if (new Date().getTime() - d.getTime() > tenMinutes) { //kada prodje deset minuta, status stola se vraca na slobodan to jest 1
              var desk = new DeskUpsertModel(s.listOfObject[i].groupOfDeskId, s.listOfObject[i].subGroupOfDeskId, s.listOfObject[i].numberOfDesk, 
                1, s.listOfObject[i].objectId, true, s.listOfObject[i].numberOfSeats, null, null)
                this.deskService.Update(s.listOfObject[i].id, desk).subscribe(f=>{
                })
                this.deskList[i].statusOfDeskId = 1;
                this.muted = true;
           }
        }
        

      }
    })
  })
  }
  getPayment(id: number) {
    this.deskService.GetById(id).subscribe(f => {
      this.typeOfPaymentService.GetById(f.typeOfPaymentId).subscribe(s => {
        this.typeOfPayment = s.name
      })
    })

  }

}
