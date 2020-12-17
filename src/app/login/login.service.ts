import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { Login } from '../../core/models/login.model';
import { environment } from 'environments/environment';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;

  private hubConnection: signalR.HubConnection;
  private dataStore: { connectionQr: string } = { connectionQr: '' };
  private privateConnectionQr = new BehaviorSubject<string>('');

  readonly connectionQrBehaviorSubject = this.privateConnectionQr.asObservable();

  constructor() {

    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): Login {
    return this.currentUserSubject.value;
  }

  QrSignalR() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.url + 'WebLoginHub')
      .build();

    this.hubConnection.serverTimeoutInMilliseconds= 30000;
    this.hubConnection.onclose((error: Error) => {
      // console.error(error);
      this.QrSignalR();
    });


    this.hubConnection
      .start()
      .then(() => {
        this.hubConnection.invoke('getConnectionId')
          .then(data => {
            console.log(data);

            this.dataStore.connectionQr = data;
            this.privateConnectionQr.next(Object.assign({}, this.dataStore).connectionQr);

          })
          .catch(err => {
            this.QrSignalR();
          });
        this.ListenToAuth();
      })
      .catch(err => {
        console.error(err);
        timer(0, 60000).subscribe(val => {
          this.QrSignalR();
        });
      });
  }

  ListenToAuth() {
    this.hubConnection.on('ReciveMessage', (data: Login) => {
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
    });
  }


  ngOnDestroy(){
    
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
