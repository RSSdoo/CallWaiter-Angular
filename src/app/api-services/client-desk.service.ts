
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientDeskService {
    
  private subject = new Subject<any>();

  sendMessage(message: number) {
      this.subject.next({ text: message });
  }

  clearMessages() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}