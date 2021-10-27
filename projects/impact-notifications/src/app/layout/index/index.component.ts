import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagerService } from '@impactech/common';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  year: number;
  langs = ['en', 'fr'];
  constructor(private sessionService: SessionManagerService, private router: Router, private translate: TranslateService) {

  }
  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }
  onLangChange(e): void {
    this.translate.setDefaultLang(e);
  }
  logout(): void {
    this.sessionService.loggedOut();
    this.router.navigate(['../login']);
  }
}
