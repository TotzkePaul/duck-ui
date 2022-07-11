import { Component, OnInit } from '@angular/core';
import { DuckService } from '../ducks-api.service';
import { Duck } from '../duck';

@Component({
  selector: 'app-duck-list',
  templateUrl: './duck-list.component.html',
  styleUrls: ['./duck-list.component.scss']
})
export class DuckListComponent implements OnInit {
  Ducks: Duck[] = [];

  constructor(public duckApi: DuckService) { }

  ngOnInit(): void {
    this.loadDucks();
  }

  loadDucks() {
    return this.duckApi.getDucks().subscribe((data: Duck[]) => {
      this.Ducks = data;
    });
  }
}
