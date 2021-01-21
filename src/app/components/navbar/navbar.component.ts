import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { ROUTES, ENTITES,SEPARATEDROUTES } from '../sidebar/sidebar.component';
import {  } from '../sidebar/sidebar.component';
import { DOCUMENT, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'app/login/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
   
    constructor(@Inject(DOCUMENT) private document: Document,location: Location, private element: ElementRef, private authService: LoginService,
         private router: Router,public translate: TranslateService) {
        this.location = location;
        this.sidebarVisible = false;
    }
    loadStyle(){
        var newlink = this.document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", './assets/css/rtl.css');
        this.document.body.appendChild(newlink);
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle)
        .concat(ENTITES.filter(eleTitle => eleTitle)
        .concat(SEPARATEDROUTES.filter(speratedTitle => speratedTitle)));
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });

        //#region // language
        var lang = 'en';
        this.translate.addLangs(['en', 'ar']);
        this.translate.setDefaultLang(lang);  
        // $("#arabic").hide();
        // $("#english").show();
     
        if(localStorage.getItem('lang') == 'ar'){
            localStorage.setItem('lang','ar')
            this.translate.use('ar');
            // $("#arabic").hide();
            // $("#english").show();
        }
        else if(localStorage.getItem('lang') == 'en'){
            localStorage.setItem('lang','en');
            this.translate.use('en');
            // $("#arabic").show();
            // $("#english").hide();

        }
        else{
            localStorage.setItem('lang','en');
        }
       
        this.document.getElementById('rtlStyle').setAttribute('href',localStorage.getItem('lang') =='ar' ? './assets/css/rtl.css' : '');
        this.document.body.setAttribute('dir', localStorage.getItem('lang') =='ar' ? 'rtl' : 'ltr');
    }

    changeLang(){
        if(localStorage.getItem('lang') == 'ar'){
            // $("#english").hide();
            // $("#arabic").show();
            localStorage.setItem('lang','en');
            this.translate.use('en');
            this.document.body.setAttribute('dir','ltr');
            this.document.getElementById('rtlStyle').removeAttribute('href');
          
            
           
        }
        else if(localStorage.getItem('lang') == 'en'){
            // $("#arabic").hide();
            // $("#english").show();
            localStorage.setItem('lang', 'ar');
            this.translate.use('ar');
            this.document.body.setAttribute('dir','rtl');
            this.document.getElementById('rtlStyle').setAttribute('href','./assets/css/rtl.css');
           
        }

    }



    // not workink ??

    //#endregion

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Not Found';
    }
  
  
}
