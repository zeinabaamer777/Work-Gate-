import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  connectioQr: Observable<string>;

  returnUrl: string;

  constructor(private authService: LoginService,
              private route: ActivatedRoute,
              private router: Router)
    {
      this.authService.currentUser.subscribe(data => {
        this.router.navigate(['/chat']);
      });
    }

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.connectioQr = this.authService.connectionQrBehaviorSubject;

    this.authService.QrSignalR();

  }

}
