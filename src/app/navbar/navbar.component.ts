import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  title!: string | undefined;

  @Input()
  email!: string;

  @Input()
  loginDisplay!: boolean;

  @Input()
  login!: () => void;

  @Input() logout!: () => void;

  constructor() { }

  ngOnInit(): void {
  }

}
