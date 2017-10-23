import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  moduleId: module.id,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  titel: string = 'Hallo welt';

  constructor() { }

  ngOnInit() {
  }

}
