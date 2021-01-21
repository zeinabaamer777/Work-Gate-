import { TranslateService } from '@ngx-translate/core';
import { Component, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: Document,public translateService: TranslateService){
    if (localStorage.getItem('lang')) {
      translateService.setDefaultLang(localStorage.getItem('lang'));
  } else {
      localStorage.setItem('lang', 'ar');
      this.document.body.setAttribute('dir', 'rtl');
      this.document.getElementById('rtlStyle').setAttribute('href',
      'src/assets/css/rtl.css');
  }
  }
}
