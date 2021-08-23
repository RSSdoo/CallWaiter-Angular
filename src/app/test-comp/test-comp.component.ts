import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientDeskService } from '../api-services/client-desk.service';
import { DeskService } from '../api-services/desk.service';
import { HistoryDeskService } from '../api-services/history-desk.service';
import { TypeOfPaymentService } from '../api-services/type-of-payment.service';
import { ITypeOfPayment } from '../shared/interface/ITypeOfPayment/ITypeOfPayment';
import { DeskUpsertModel } from '../shared/models/desk-upsert.model';
import { HistoryDeskUpsertModel } from '../shared/models/history-desk-upsert.model';

@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent implements OnInit {

  message: string;
  token: string;
  deskId :number;
  typeOfPayment: ITypeOfPayment[] = [];
  constructor(private router: Router, private deskService: DeskService, private desk: ClientDeskService, private typeOfPaymentService: TypeOfPaymentService,
    private historyOfDeskService: HistoryDeskService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    if(this.route.snapshot.params['id']){
      this.deskId = Number(this.route.snapshot.params['id'])
    }
    this.getPaymentList();
  }

  getPaymentList() {
    //ovdje ce trebat getat na sljedeci nacin: Kada se odradi skeniranje qr koda dobices id od deska. Desk u sebi sadrzi objekatId, taj objekatId ce biti filter za ovaj typeOfPayment
    this.typeOfPaymentService.GetAll().subscribe(t => {
      t.listOfObject.forEach(f => {
        this.typeOfPayment.push({ id: f.id, name: f.name, objectId: 1 })
      })
    })
  }
  callWaiterStatus() {
    this.deskService.GetById(this.deskId).subscribe(s => {
      var desk = new DeskUpsertModel(s.groupOfDeskId, s.subGroupOfDeskId, s.numberOfDesk, 2, s.objectId, true, s.numberOfSeats, new Date(), null);
      this.deskService.Update(this.deskId, desk).subscribe(p => {
        var d = new HistoryDeskUpsertModel(new Date(), 2, this.deskId, s.objectId, null )
          this.historyOfDeskService.Insert(d).subscribe(f=>{})
      })
    })

  }
  callMenuStatus() {
    this.deskService.GetById(this.deskId).subscribe(s => {
      var desk = new DeskUpsertModel(s.groupOfDeskId, s.subGroupOfDeskId, s.numberOfDesk, 3, s.objectId, true, s.numberOfSeats, new Date(), null);
      this.deskService.Update(this.deskId, desk).subscribe(f => {
        var d = new HistoryDeskUpsertModel(new Date(), 2, this.deskId, s.objectId, null )
        this.historyOfDeskService.Insert(d).subscribe(f=>{})
      })
    })
  }
  callDontInteruptStatus() {
    this.deskService.GetById(this.deskId).subscribe(s => {
      var desk = new DeskUpsertModel(s.groupOfDeskId, s.subGroupOfDeskId, s.numberOfDesk, 4, s.objectId, true, s.numberOfSeats, new Date(), null);
      this.deskService.Update(this.deskId, desk).subscribe(f => {
        var d = new HistoryDeskUpsertModel(new Date(), 2, this.deskId, s.objectId, null )
        this.historyOfDeskService.Insert(d).subscribe(f=>{})
      })
    })
  }
  callTypeOfPaymentStatus(typeOfPayment: number) {
    this.deskService.GetById(this.deskId).subscribe(s => {
      var desk = new DeskUpsertModel(s.groupOfDeskId, s.subGroupOfDeskId, s.numberOfDesk, 5, s.objectId, true, s.numberOfSeats, new Date(), typeOfPayment);
      this.deskService.Update(this.deskId, desk).subscribe(f => {
        var d = new HistoryDeskUpsertModel(new Date(), 2, this.deskId, s.objectId, null )
        this.historyOfDeskService.Insert(d).subscribe(f=>{})
      })
    })
  }
  openUserMeni(){
    this.router.navigate(['/meni/' + this.deskId])
  }

}
