import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { DuckService } from '../ducks-api.service';
import { Duck } from '../duck';

@Component({
  selector: 'app-duck-list',
  templateUrl: './duck-list.component.html',
  styleUrls: ['./duck-list.component.scss']
})
export class DuckListComponent implements OnInit {
  loginDisplay = false;

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent | undefined;

  Ducks: Duck[] = [];

  constructor(public duckApi: DuckService, private authService: MsalService, private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });

    this.setLoginDisplay();

    this.loadDucks(1, 10);
  }

  loadDucks(page: number, pageSize:number) {
    return this.duckApi.getDucks(page, pageSize ?? 10, "date_desc").subscribe((data: Duck[]) => {
      this.Ducks = data;
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  onPaginateChange(pageEvent: any){
    this.loadDucks(pageEvent.pageIndex+1, pageEvent.pageSize);
  }
}
